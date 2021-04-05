import React from 'react';

import gql from 'graphql-tag';
import { Client } from 'urql';
import { DocumentNode } from 'graphql';

import { WPOKT_SUBGRAPH_URL } from 'constants/index';
import { BigNumber } from 'bignumber.js';

import dayjs from 'dayjs';

const RETRY_EVERY = 3000;
const ZERO = new BigNumber(0);
const MAX_MULTIPLIER = 3;

const graphqlClient = new Client({ url: WPOKT_SUBGRAPH_URL ?? '' });

const USER_STATS_QUERY: DocumentNode = gql`
  query USER_STATS($userAddress: ID!, $farmAddress: ID!) {
    tokenGeysers(where: { id: $farmAddress }) {
      bonusPeriodSec
      globalSharesSec
      createdTimestamp
    }
    users(where: { id: $userAddress }) {
      id
      earned
      stakes {
        amount
        timestamp
      }
    }
  }
`;

type BigNumberish = BigNumber.Value;

type Stake = {
  amount: BigNumber;
  shares: BigNumber;
  timestamp: number;
};

type UserStatsResponse = {
  earned: BigNumberish;
  stakes: [Stake];
};

type UserStatsReturnType = {
  earned: BigNumber;
  stakes: [Stake];
  totalStaked: BigNumber;
  ownershipShare: number;
  weightedMultiplier: number;
};

export function useUserStats(userAddress: string, farmAddress: string): UserStatsReturnType {
  const [earned, setEarned] = React.useState(ZERO);
  const [stakes, setStakes] = React.useState<[Stake]>([{ amount: ZERO, shares: ZERO, timestamp: 0 }]);
  const [totalStaked, setTotalStaked] = React.useState(ZERO);
  const [ownershipShare, setOwnershipShare] = React.useState(0);
  const [weightedMultiplier, setWeightedMultiplier] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout>;

    async function fetchUserStats() {
      try {
        const result = await graphqlClient.query(USER_STATS_QUERY, { userAddress, farmAddress }).toPromise();
        if (!result?.data) {
          return;
        }

        const [{ earned: rawEarned, stakes: rawStakes }]: [UserStatsResponse] = result.data.users;

        const [{ globalSharesSec, bonusPeriodSec, createdTimestamp }]: [
          { globalSharesSec: BigNumber; bonusPeriodSec: number; createdTimestamp: number },
        ] = result.data.tokenGeysers;

        const today = dayjs();
        const parsedEarned = new BigNumber(rawEarned);

        let totalStakeShareSecs = ZERO;
        let parsedTotalStaked = ZERO;
        for (let index = 0; index < rawStakes.length; index++) {
          const stake: Stake = rawStakes[index];
          stake.amount = new BigNumber(stake.amount);
          parsedTotalStaked = parsedTotalStaked.plus(stake.amount);
          totalStakeShareSecs = totalStakeShareSecs.plus(stake.amount.times(today.unix() - stake.timestamp));
        }

        const calculatedOwnershipShare = totalStakeShareSecs.div(globalSharesSec).times(new BigNumber(100)).toNumber();

        const maxBonusDateSeconds = +createdTimestamp + +bonusPeriodSec;
        const maxBonusDate = dayjs.unix(maxBonusDateSeconds);

        let averageMultiplier = 0;
        for (let index = 0; index < rawStakes.length; index++) {
          const stake: Stake = rawStakes[index];
          const stakeWeight = stake.amount.div(parsedTotalStaked).toNumber();

          const stakeDate = dayjs.unix(stake.timestamp);
          const secondsUntilMaxBonus = maxBonusDate.diff(stakeDate, 'seconds');
          const weightedBonusMultiplier = ((secondsUntilMaxBonus * MAX_MULTIPLIER) / bonusPeriodSec) * stakeWeight;
          averageMultiplier += weightedBonusMultiplier;
        }

        const parsedStakes = rawStakes;

        if (!cancelled) {
          setEarned(parsedEarned);
          setStakes(parsedStakes);
          setTotalStaked(parsedTotalStaked);
          setWeightedMultiplier(averageMultiplier);
          setOwnershipShare(calculatedOwnershipShare);
        }
      } catch (err) {
        retryTimer = setTimeout(fetchUserStats, RETRY_EVERY);
      }
    }

    fetchUserStats();

    return () => {
      cancelled = true;
      clearTimeout(retryTimer);
    };
  }, [userAddress, farmAddress]);

  return { earned, stakes, totalStaked, ownershipShare, weightedMultiplier };
}
