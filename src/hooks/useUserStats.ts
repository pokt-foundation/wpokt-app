import React from 'react';

import gql from 'graphql-tag';
import { Client } from 'urql';
import { DocumentNode } from 'graphql';

import { WPOKT_SUBGRAPH_URL } from 'constants/index';
import { BigNumber } from 'bignumber.js';

import dayjs from 'dayjs';

const RETRY_EVERY = 3000;
const ZERO = new BigNumber(0);
// MAX_MULTIPLIER is actually 3, but the math takes from 0 to 2 which is 3.
const MAX_MULTIPLIER = 2;

const graphqlClient = new Client({ url: WPOKT_SUBGRAPH_URL ?? '' });

const USER_STATS_QUERY: DocumentNode = gql`
  query USER_STATS($userAddress: ID!, $farmAddress: ID!) {
    tokenGeysers(where: { id: $farmAddress }) {
      bonusPeriodSec
      globalSharesSec
      updated
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

        const [{ globalSharesSec, bonusPeriodSec, updated: updatedTimestamp }]: [
          { globalSharesSec: BigNumber; bonusPeriodSec: number; updated: number },
        ] = result.data.tokenGeysers;

        const parsedEarned = new BigNumber(rawEarned);

        let totalStakeShareSecs = ZERO;
        let parsedTotalStaked = ZERO;
        for (let index = 0; index < rawStakes.length; index++) {
          const stake: Stake = rawStakes[index];
          stake.amount = new BigNumber(stake.amount);
          parsedTotalStaked = parsedTotalStaked.plus(stake.amount);
          totalStakeShareSecs = totalStakeShareSecs.plus(stake.amount.times(updatedTimestamp - stake.timestamp));
        }

        const calculatedOwnershipShare = totalStakeShareSecs.div(globalSharesSec).times(new BigNumber(100)).toNumber();

        const now = dayjs.unix(updatedTimestamp);

        const reducer = (accumulator: number, currentValue: Stake) => {
          const stakeWeight = currentValue.amount.div(parsedTotalStaked).toNumber();

          const stakeDate = dayjs.unix(currentValue.timestamp);
          const secondsAfterStake = now.diff(stakeDate, 'seconds');
          const bonusMultiplier = (secondsAfterStake * MAX_MULTIPLIER) / bonusPeriodSec + 1;
          const weightedBonusMultiplier = bonusMultiplier * stakeWeight;
          return accumulator + weightedBonusMultiplier;
        };

        const averageMultiplier = rawStakes.reduce(reducer, 0);

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
