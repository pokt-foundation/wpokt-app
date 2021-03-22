import { useEffect, useState } from 'react';

import { BigIntish, TimeRemaining } from 'utils/types';

import dayjs from 'dayjs';
import gql from 'graphql-tag';
import { Client } from 'urql';
import { DocumentNode } from 'graphql';

import { getTimeRemaining } from 'utils/helpers';
import { WPOKT_SUBGRAPH_URL } from 'constants/index';

const RETRY_EVERY = 3000;
const DAYS_IN_MONTH = dayjs().daysInMonth();
const ZERO = 0n;

const graphqlClient = new Client({ url: WPOKT_SUBGRAPH_URL ?? '' });

const FARM_STATS_QUERY: DocumentNode = gql`
  query FARM_STATS($farmAddress: string) {
    tokenGeysers(id: $farmAddress) {
      apy
      tvl
      staked
      bonusPeriodSec
      createdTimestamp
      totalUnlockedRewards
    }
  }
`;

type FarmStatsResponse = {
  apy: BigIntish;
  tvl: BigIntish;
  staked: BigIntish;
  bonusPeriodSec: number;
  createdTimestamp: number;
  totalUnlockedRewards: BigIntish;
};

export function useFarmStats(farmAddress: string) {
  const [apy, setAPY] = useState(ZERO);
  const [tvl, setTVL] = useState(ZERO);
  const [totalStaked, setTotalStaked] = useState(ZERO);
  const [rewardUnlockRate, setRewardUnlockRate] = useState(ZERO);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>();

  useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout>;

    async function fetchFarmStats() {
      try {
        const result = await graphqlClient.query(FARM_STATS_QUERY, { farmAddress }).toPromise();

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

        const unlockRate = parsedTotalUnlockedRewards / BigInt(DAYS_IN_MONTH);

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
  }, [farmAddress]);

  return { apy, tvl, totalStaked, rewardUnlockRate, timeRemaining };
}
