import React from 'react';

import gql from 'graphql-tag';
import { Client } from 'urql';
import { DocumentNode } from 'graphql';

import { WPOKT_SUBGRAPH_URL } from 'constants/index';
import { BigNumber } from 'bignumber.js';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const RETRY_EVERY = 3000;
const ZERO = new BigNumber(0);
const ONE_MONTH_IN_DAYS = 30;

const graphqlClient = new Client({ url: WPOKT_SUBGRAPH_URL ?? '' });

const GEYSER_STATS_QUERY: DocumentNode = gql`
  query USER_STATS($farmAddress: ID!) {
    tokenGeysers(where: { id: $farmAddress }) {
      durationSec
      globalSharesSec
      totalLockedRewards
    }
  }
`;

type BigNumberish = BigNumber.Value;

type EstimateRewardReturnType = {
  estimatedReward: BigNumber;
};

export function useEstimatedReward(estimateAmount: BigNumberish, farmAddress: string): EstimateRewardReturnType {
  const [estimatedReward, setEstimatedReward] = React.useState(ZERO);

  React.useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout>;

    async function fetchEstimatedReward() {
      try {
        const result = await graphqlClient.query(GEYSER_STATS_QUERY, { farmAddress }).toPromise();
        if (!result?.data) {
          return;
        }

        const [{ durationSec, globalSharesSec, totalLockedRewards }]: [
          { durationSec: number; globalSharesSec: BigNumber; totalLockedRewards: BigNumber },
        ] = result.data.tokenGeysers;

        const parsedGlobalSharesSec = new BigNumber(globalSharesSec);
        const parsedTotalLockedRewards = new BigNumber(totalLockedRewards);

        const estimationAmount = new BigNumber(estimateAmount === '' ? 0 : estimateAmount);
        const estimationSeconds = dayjs.duration(ONE_MONTH_IN_DAYS, 'days').asSeconds();
        const estimationShareSecs = estimationAmount.times(estimationSeconds);

        const stakeMarginalShareSec = parsedTotalLockedRewards.times(estimationSeconds);
        const estimatedGlobalSharesSec = parsedGlobalSharesSec.plus(estimationShareSecs).plus(stakeMarginalShareSec);
        const estimatedOwnership = estimationShareSecs.div(estimatedGlobalSharesSec);

        const durationInDays = dayjs.duration(durationSec, 'seconds').asDays();
        const rewardsPerDay = parsedTotalLockedRewards.div(durationInDays);
        const rewardEstimate = estimatedOwnership.times(rewardsPerDay.times(ONE_MONTH_IN_DAYS));

        if (!cancelled) {
          setEstimatedReward(rewardEstimate);
        }
      } catch (err) {
        retryTimer = setTimeout(fetchEstimatedReward, RETRY_EVERY);
      }
    }

    fetchEstimatedReward();

    return () => {
      cancelled = true;
      clearTimeout(retryTimer);
    };
  }, [estimateAmount, farmAddress]);

  return { estimatedReward };
}
