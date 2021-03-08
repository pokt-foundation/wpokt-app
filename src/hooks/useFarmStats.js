import { useEffect, useState } from 'react'

import gql from 'graphql-tag'
import { Client } from 'urql'

import { WPOKT_SUBGRAPH_URL } from 'util/constants'

const RETRY_EVERY = 3000

const graphqlClient = new Client({ url: WPOKT_SUBGRAPH_URL })

export function useFarmStats(farmAddress) {
  const [totalStaked, setTotalStaked] = useState(0)
  const [apy, setAPY] = useState(0)
  const [tvl, setTVL] = useState(0)

  const FARM_STATS_QUERY = gql`
    query {
      tokenGeysers(id: "${farmAddress}") {
        staked
        apy
        tvl
      }
    }
  `

  useEffect(() => {
    let cancelled = false
    let retryTimer
    async function fetchFarmStats() {
      try {
        const result = await graphqlClient.query(FARM_STATS_QUERY).toPromise()

        if (!result?.data) {
          return
        }

        const { staked, apy, tvl } = result.data

        if (!cancelled) {
          setTotalStaked(staked)
          setAPY(apy)
          setTVL(tvl)
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

  return { totalStaked, apy, tvl }
}
