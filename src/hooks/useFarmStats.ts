import { useEffect, useState } from 'react'

import { BigIntish } from './types'

import gql from 'graphql-tag'
import { Client } from 'urql'

import { WPOKT_SUBGRAPH_URL } from 'util/constants'

const RETRY_EVERY = 3000
const DAYS_IN_ONE_MONTH = 30
const ONE_DAY = 86400000
const ZERO_BIG_INT = BigInt(0)

const graphqlClient = new Client({ url: WPOKT_SUBGRAPH_URL || 
  'Your farm subgraph URL' })

function buildFarmStatsQuery(farmAddress: string) {
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

type FarmStatsResponse = {
  apy: BigIntish,
  tvl: BigIntish,
  staked: BigIntish,
  bonusPeriodSec: number,
  createdTimestamp: number,
  totalUnlockedRewards: BigIntish
}

export function useFarmStats(farmAddress: string) {
  const [apy, setAPY] = useState(ZERO_BIG_INT)
  const [tvl, setTVL] = useState(ZERO_BIG_INT)
  const [totalStaked, setTotalStaked] = useState(ZERO_BIG_INT)
  const [rewardUnlockRate, setRewardUnlockRate] = useState(ZERO_BIG_INT)
  const [daysLeft, setDaysLeft] = useState(0)

  const FARM_STATS_QUERY = buildFarmStatsQuery(farmAddress);

  useEffect(() => {
    let cancelled = false
    let retryTimer: NodeJS.Timeout
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
        }]: [FarmStatsResponse] = result.data.tokenGeysers
        
        const parsedAPY = BigInt(apy);
        const parsedTVL = BigInt(tvl);
        const parsedStaked = BigInt(staked);

        const parsedTotalUnlockedRewards = BigInt(totalUnlockedRewards);

        const unlockRate = parsedTotalUnlockedRewards / BigInt(DAYS_IN_ONE_MONTH);
        
        const today = new Date();
        
        // Calculate farm end date based on the bonus period (at this time, all rewards are unlocked)
        const farmEndDate = new Date((createdTimestamp + bonusPeriodSec) * 1000)
        const farmTimeLeft = farmEndDate.getTime() - today.getTime();

        // Return days left, if any (otherwise, remains at 0)
        if (farmTimeLeft > 0) {
          farmDaysLeft = Math.ceil(farmTimeLeft / ONE_DAY); 
        }

        if (!cancelled) {
          setAPY(parsedAPY)
          setTVL(parsedTVL)
          setTotalStaked(parsedStaked)
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
