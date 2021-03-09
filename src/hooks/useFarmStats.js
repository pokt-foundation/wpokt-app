import { useEffect, useState } from 'react'

import JSBI from 'jsbi'
import gql from 'graphql-tag'
import { Client } from 'urql'

import { WPOKT_SUBGRAPH_URL } from 'util/constants'

const RETRY_EVERY = 3000
const DAYS_IN_MONTH = 30

const graphqlClient = new Client({ url: WPOKT_SUBGRAPH_URL })

function buildFarmStatsQuery(farmAddress) {
  return gql`
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
}

export function useFarmStats(farmAddress) {
  const [apy, setAPY] = useState(0)
  const [tvl, setTVL] = useState(0)
  const [totalStaked, setTotalStaked] = useState(0)
  const [rewardUnlockRate, setRewardUnlockRate] = useState(0)
  const [daysLeft, setDaysLeft] = useState(0)

  const FARM_STATS_QUERY = buildFarmStatsQuery(farmAddress);

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

        // Read all necessary data from the subgraph call.
        const [{ 
          apy, 
          tvl,
          staked, 
          bonusPeriodSec,
          createdTimestamp,
          totalUnlockedRewards, 
        }] = result.data.tokenGeysers

        // Calculate unlocked rewards per month.
        const unlockRate = totalUnlockedRewards / DAYS_IN_MONTH;
        
        // Get today's date
        const today = new Date();
        
        // Calculate farm end date based on the bonus period (at this time, all rewards are unlocked)
        const farmEndDate = new Date((createdTimestamp + bonusPeriodSec) * 1000)
        const farmTimeLeft = farmEndDate - today;

        // Return days left, if any (otherwise, remains at 0)
        if (farmTimeLeft > 0) {
          farmDaysLeft = Math.ceil(farmTimeLeft / (1000 * 60 * 60 * 24)); 
        }
        
        const _totalStaked = JSBI.BigInt(staked);

        if (!cancelled) {
          setAPY(apy)
          setTVL(tvl)
          setTotalStaked(_totalStaked)
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
  }, [FARM_STATS_QUERY])

  return { apy, tvl, totalStaked, rewardUnlockRate, daysLeft }
}
