import { useEffect, useState } from 'react';

import { BigIntish, TimeRemaining } from 'util/types';

import dayjs from 'dayjs';
import gql from 'graphql-tag';
import { Client } from 'urql';

import { getTimeRemaining } from 'util/helpers';
import { WPOKT_SUBGRAPH_URL } from 'util/constants';

const RETRY_EVERY = 3000;
const DAYS_IN_ONE_MONTH = 30;
const ZERO_BIG_INT = BigInt(0);

const graphqlClient = new Client({ url: WPOKT_SUBGRAPH_URL || 'Your farm subgraph URL' });

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
`;
}

type FarmStatsResponse = {
  apy: BigIntish;
  tvl: BigIntish;
  staked: BigIntish;
  bonusPeriodSec: number;
  createdTimestamp: number;
  totalUnlockedRewards: BigIntish;
};

export function useFarmStats(farmAddress: string) {
  const [apy, setAPY] = useState(ZERO_BIG_INT);
  const [tvl, setTVL] = useState(ZERO_BIG_INT);
  const [totalStaked, setTotalStaked] = useState(ZERO_BIG_INT);
  const [rewardUnlockRate, setRewardUnlockRate] = useState(ZERO_BIG_INT);
  const [timeRemaining, setTimeRemaining] = useState({});

  const FARM_STATS_QUERY = buildFarmStatsQuery(farmAddress);

  useEffect(() => {
    let cancelled = false;
    let retryTimer: NodeJS.Timeout;

    async function fetchFarmStats() {
      try {
        const result = await graphqlClient.query(FARM_STATS_QUERY).toPromise();

        if (!result?.data) {
          return;
        }

        const [{ apy, tvl, staked, bonusPeriodSec, createdTimestamp, totalUnlockedRewards }]: [
          FarmStatsResponse,
        ] = result.data.tokenGeysers;

        const parsedAPY = BigInt(apy);
        const parsedTVL = BigInt(tvl);
        const parsedStaked = BigInt(staked);

        const parsedTotalUnlockedRewards = BigInt(totalUnlockedRewards);

        const unlockRate = parsedTotalUnlockedRewards / BigInt(DAYS_IN_ONE_MONTH);

        const today = dayjs();

        // Calculate farm end date based on the bonus period (at this time, all rewards are unlocked)
        const farmEndDate = dayjs.unix(createdTimestamp + bonusPeriodSec);
        const farmTimeLeft = farmEndDate.diff(today, 'seconds');

        const timeRemaining: TimeRemaining = getTimeRemaining(farmTimeLeft);

        if (!cancelled) {
          setAPY(parsedAPY);
          setTVL(parsedTVL);
          setTotalStaked(parsedStaked);
          setTimeRemaining(timeRemaining);
          setRewardUnlockRate(unlockRate);
        }
      } catch (err) {
        retryTimer = setTimeout(fetchFarmStats, RETRY_EVERY);
      }
    }

    fetchFarmStats();

    return () => {
      cancelled = true;
      clearTimeout(retryTimer);
    };
  }, [FARM_STATS_QUERY]);

  return { apy, tvl, totalStaked, rewardUnlockRate, timeRemaining };
}
