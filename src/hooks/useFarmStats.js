import { useEffect, useState } from 'react'

import gql from 'graphql-tag'
import { Client } from 'urql'

import { WPOKT_SUBGRAPH_URL } from 'util/constants'

const RETRY_EVERY = 3000

const graphqlClient = new Client({ url: WPOKT_SUBGRAPH_URL })

export function useFarmStats(farmAddress) {
  const [apy, setAPY] = useState(0)
  const [tvl, setTVL] = useState(0)
  const [totalStaked, setTotalStaked] = useState(0)
  const [rewardUnlockRate, setRewardUnlockRate] = useState(0)
  const [daysLeft, setDaysLeft] = useState(0)

  const FARM_STATS_QUERY = gql`
    query {
      tokenGeysers(id: "${farmAddress}") {
        apy
        tvl
        staked
        bonusPeriodSec
        createdTimestamp
        totalUnlockedRewards
      }
    }
  `

  useEffect(() => {
    let cancelled = false
    let retryTimer
    let farmDaysLeft = 0

    async function fetchFarmStats() {
      try {
        const result = await graphqlClient.query(FARM_STATS_QUERY).toPromise()

        if (!result?.data) {
          return
        }

        const [{ 
          apy, 
          tvl,
          staked, 
          bonusPeriodSec,
          createdTimestamp,
          totalUnlockedRewards, 
        }] = result.data.tokenGeysers

        const unlockRate = totalUnlockedRewards / 30;
        
        const today = new Date();
        const farmEndDate = new Date((createdTimestamp + bonusPeriodSec) * 1000)
        const farmTimeLeft = farmEndDate - today;

        if (farmTimeLeft > 0) {
          farmDaysLeft = Math.ceil(farmTimeLeft / (1000 * 60 * 60 * 24)); 
        }

        if (!cancelled) {
          setAPY(apy)
          setTVL(tvl)
          setTotalStaked(staked)
          setDaysLeft(farmDaysLeft)
          setRewardUnlockRate(unlockRate)
        }
      } catch (err) {
        retryTimer = setTimeout(fetchFarmStats, RETRY_EVERY)
      }
    }

    fetchFarmStats()

    return () => {
      cancelled = true
      clearTimeout(retryTimer)
    }
  })

  return { apy, tvl, totalStaked, rewardUnlockRate, daysLeft }
}
