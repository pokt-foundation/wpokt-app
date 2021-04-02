import React from 'react';

import { TimeRemaining } from 'utils/types';

import dayjs from 'dayjs';
import gql from 'graphql-tag';
import { Client } from 'urql';
import { DocumentNode } from 'graphql';

import { getTimeRemaining } from 'utils/helpers';
import { WPOKT_SUBGRAPH_URL } from 'constants/index';
import { BigNumber } from 'bignumber.js';

const RETRY_EVERY = 3000;
const DAYS_IN_MONTH = new BigNumber(dayjs().daysInMonth());
const ZERO = new BigNumber(0);

const graphqlClient = new Client({ url: WPOKT_SUBGRAPH_URL ?? '' });

const FARM_STATS_QUERY: DocumentNode = gql`
  query FARM_STATS($farmAddress: ID!) {
    tokenGeyser(where: { id: $farmAddress }) {
      apy
      tvl
      staked
      durationSec
      bonusPeriodSec
      createdTimestamp
      unlockedRewards
      lockedRewards
      totalUnlockedRewards
    }
  }
`;

type BigNumberish = BigNumber.Value;

type FarmStatsResponse = {
  apy: BigNumberish;
  tvl: BigNumberish;
  staked: BigNumberish;
  durationSec: number;
  bonusPeriodSec: number;
  createdTimestamp: number;
  unlockedRewards: BigNumberish;
  lockedRewards: BigNumberish;
  totalUnlockedRewards: BigNumberish;
};

type FarmStatsReturnType = {
  apy: BigNumber;
  tvl: BigNumber;
  maxRelays: BigNumber;
  farmUsage: BigNumber;
  lockedRewards: BigNumber;
  unlockedRewards: BigNumber;
  totalStaked: BigNumber;
  totalRewards: BigNumber;
  rewardUnlockRate: BigNumber;
  timeRemaining?: TimeRemaining;
};

export function useFarmStats(farmAddress: string): FarmStatsReturnType {
  const [apy, setAPY] = React.useState(ZERO);
  const [tvl, setTVL] = React.useState(ZERO);
  const [totalStaked, setTotalStaked] = React.useState(ZERO);
  const [unlockedRewards, setUnlockedRewards] = React.useState(ZERO);
  const [lockedRewards, setLockedRewards] = React.useState(ZERO);
  const [totalRewards, setTotalRewards] = React.useState(ZERO);
  const [rewardUnlockRate, setRewardUnlockRate] = React.useState(ZERO);
  const [timeRemaining, setTimeRemaining] = React.useState<TimeRemaining>();

  const [farmUsage, setFarmUsage] = React.useState(ZERO);
  const [maxRelays, setMaxRelays] = React.useState(ZERO);

  React.useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout>;

    async function fetchFarmStats() {
      try {
        const result = await graphqlClient.query(FARM_STATS_QUERY, { farmAddress }).toPromise();
        const farmGoalRelays = new BigNumber(15000000);

        if (!result?.data) {
          return;
        }

        const [
          { apy, tvl, staked, durationSec, createdTimestamp, unlockedRewards, lockedRewards, totalUnlockedRewards },
        ]: [
          // eslint-disable-next-line prettier/prettier
          FarmStatsResponse
        ] = result.data.tokenGeysers;

        const parsedAPY = new BigNumber(apy);
        const parsedTVL = new BigNumber(tvl);
        const parsedStaked = new BigNumber(staked);
        const parsedLockedRewards = new BigNumber(lockedRewards);
        const parsedUnlockedRewards = new BigNumber(unlockedRewards);

        const parsedTotalUnlockedRewards = new BigNumber(totalUnlockedRewards);
        const parsedTotalRewards = parsedUnlockedRewards.plus(parsedLockedRewards);

        const unlockRate = parsedTotalUnlockedRewards.div(DAYS_IN_MONTH);

        const today = dayjs();

        // Calculate farm end date based on the bonus period (at this time, all rewards are unlocked)
        const farmEndDateSeconds = +createdTimestamp + +durationSec;
        const farmEndDate = dayjs.unix(farmEndDateSeconds);
        const farmTimeLeft = farmEndDate.diff(today, 'seconds');

        const timeRemaining: TimeRemaining = getTimeRemaining(farmTimeLeft);

        const parsedMaxRelays = parsedStaked.times(new BigNumber(40));
        const parsedFarmUsage = parsedMaxRelays.div(farmGoalRelays).times(new BigNumber(100));

        if (!cancelled) {
          setAPY(parsedAPY);
          setTVL(parsedTVL);
          setMaxRelays(parsedMaxRelays);
          setFarmUsage(parsedFarmUsage);
          setUnlockedRewards(parsedUnlockedRewards);
          setLockedRewards(parsedLockedRewards);
          setTotalRewards(parsedTotalRewards);
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

  return {
    apy,
    tvl,
    farmUsage,
    maxRelays,
    lockedRewards,
    unlockedRewards,
    totalStaked,
    totalRewards,
    rewardUnlockRate,
    timeRemaining,
  };
}
