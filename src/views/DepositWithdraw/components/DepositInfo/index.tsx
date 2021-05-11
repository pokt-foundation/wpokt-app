import React from 'react';
import 'styled-components/macro';
import { colors } from 'components/theme';

import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';
import { ReactComponent as FarmSvg } from 'assets/icons/farm.svg';

import {
  StyledFarmContainer,
  StyledHeader,
  StyledHeaderLeft,
  StyledHeaderRight,
  StyledLine,
  StyledMoreInfoContainer,
  StyledRewardText,
  StyledSelectorContainer,
  StyledSmallInfoCardsContainer,
} from 'views/DepositWithdraw/components/DepositInfo/components';
import { SmallInfoCard, SmallInfoCardExtraLinks } from 'components/Cards';
import { Flex } from 'components/Containers';
import { H1, P2 } from 'components/Typography';

import { DepositWithdrawalContext } from 'contexts/DepositWithdrawal';
import { Web3Context } from 'contexts/Web3';
import { TOKEN_GEYSER_ADDRESS, WPOKT_DECIMALS } from 'constants/index';

import { useFarmStats } from 'hooks/useFarmStats';
import { useUserStats } from 'hooks/useUserStats';
import { useEstimatedReward } from 'hooks/useEstimatedReward';

import {
  commifyString,
  formatDaysFromTimestamp,
  formatFillPercentage,
  formatRelays,
  formatOwnershipShare,
} from 'utils';

interface IDepositInfo {
  farmSelected: boolean;
}

export const DepositInfo: React.FC<IDepositInfo> = ({ farmSelected }) => {
  const { inputValue } = React.useContext(DepositWithdrawalContext);
  const { address } = React.useContext(Web3Context);
  const { apr, farmUsage, maxRelays, rewardUnlockRate, timeLeft, totalTime, totalStaked } = useFarmStats(
    TOKEN_GEYSER_ADDRESS,
  );
  const { ownershipShare, weightedMultiplier } = useUserStats(address ? address : '', TOKEN_GEYSER_ADDRESS);
  const { estimatedReward } = useEstimatedReward(inputValue, TOKEN_GEYSER_ADDRESS);

  const [showMore, setShowMore] = React.useState<boolean>(true);

  return (
    <div>
      <StyledHeader farmSelected={farmSelected}>
        <StyledHeaderLeft>
          <div id={'farm-title'}>
            <StyledFarmContainer>
              <FarmSvg />
            </StyledFarmContainer>
            <H1 color={colors.white}>Genesis Farm</H1>
          </div>
        </StyledHeaderLeft>
        <StyledHeaderRight>
          <StyledLine />
          <div id={'estimated-reward'}>
            <P2 color={colors.white}>Estimated Reward</P2>
            <StyledRewardText color={colors.white}>
              {estimatedReward.toNumber() !== 0 ? estimatedReward.toFixed(WPOKT_DECIMALS) : 0} wPOKT*
            </StyledRewardText>
          </div>
        </StyledHeaderRight>
      </StyledHeader>
      <StyledSmallInfoCardsContainer>
        <SmallInfoCard
          statTitle={'APR'}
          statContent={`${commifyString(apr.toFixed(6))}%`}
          tooltip={`The APR (Annual Percentage Rate) is an annual rate of rewards on wPOKT staked. While most projects used APY, APR is a more accurate way to measure wPOKT returns as wPOKT is non-compounding.`}
        />
        <SmallInfoCard
          statTitle={'Multiplier'}
          statContent={`${weightedMultiplier.toFixed(2)} X`}
          tooltip={`The Multiplier increases the longer you stake, up to 3x. This gives you more pool ownership and incentivizes long-term staking which provides usage stability for DApps. `}
        />
        <SmallInfoCard
          statTitle={'TOTAL STAKED'}
          statContent={`${commifyString(totalStaked.toFixed(2))} wPOKT`}
          tooltip={`The total number of wPOKT staked in the Farm.`}
        />
        <SmallInfoCard
          statTitle={'MAX RELAYS/DAY'}
          statContent={`${formatRelays(maxRelays)} M`}
          tooltip={`The amount of relays allowed by this Farm per the protocol rules on Pocket Network. The more relays, the more DApps can use Pocket Network.`}
        />
        <SmallInfoCard
          statTitle={'time left'}
          statContent={`${formatDaysFromTimestamp(timeLeft)} days left`}
          statFill={formatFillPercentage(timeLeft, totalTime)}
          tooltip={`The remaining number of days for which pool rewards will unlocked at the current rate.`}
        />
        <SmallInfoCardExtraLinks />
      </StyledSmallInfoCardsContainer>
      <StyledMoreInfoContainer showMore={showMore}>
        <button
          onClick={() => setShowMore(!showMore)}
          css={`
            background: transparent;
            border: none;

            &:hover {
              cursor: pointer;
            }
          `}
        >
          <Flex align={'center'} justify={'center'}>
            <P2 color={colors.white}>More Info</P2>
            <StyledSelectorContainer id={'selector-container'}>
              <SelectorSvg />
            </StyledSelectorContainer>
          </Flex>
        </button>
      </StyledMoreInfoContainer>
      {showMore && (
        <>
          <StyledSmallInfoCardsContainer>
            <SmallInfoCard
              statTitle={'Farm Ownership'}
              statContent={`${formatOwnershipShare(ownershipShare)}%`}
              tooltip={`Farm ownership is your rights to the Unlocked Rewards measured as a percentage.`}
            />
            <SmallInfoCard
              statTitle={'Apps'}
              statContent={'0'}
              tooltip={`The number of applications using the Farm's relays.`}
            />
            <SmallInfoCard
              statTitle={'Usage'}
              statContent={`${farmUsage.toFixed(2)}%`}
              tooltip={`Usage is a measurement of how over/understaked a farm is in comparison to the max Max Relays it was intended to provide. Overstaking (>100%) means that there is likely more demand to new create pools.`}
            />
            <SmallInfoCard
              statTitle={'Unlock Rate'}
              statContent={`${commifyString(rewardUnlockRate.toFixed(2))} / Month`}
              tooltip={`The unlock rate is the rate at which rewards are unlocked in a given period. Your Farm Ownership determines how many of these rewards you have a right to.`}
            />
            <SmallInfoCardExtraLinks showOnDesktop={true} showOnMobile={false} />
          </StyledSmallInfoCardsContainer>
        </>
      )}
    </div>
  );
};
