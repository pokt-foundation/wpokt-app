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

import { Web3Context } from 'contexts/Web3';
import { TOKEN_GEYSER_ADDRESS } from 'constants/index';

import { useFarmStats } from 'hooks/useFarmStats';
import { useUserStats } from 'hooks/useUserStats';

import { commifyString, formatFillPercentage, formatRelays } from 'utils';

interface IDepositInfo {
  farmSelected: boolean;
}

export const DepositInfo: React.FC<IDepositInfo> = ({ farmSelected }) => {
  const { address } = React.useContext(Web3Context);
  const { apr, farmUsage, maxRelays, rewardUnlockRate, timeRemaining, totalTime, totalStaked } = useFarmStats(
    TOKEN_GEYSER_ADDRESS,
  );
  const { ownershipShare, weightedMultiplier } = useUserStats(address ? address : '', TOKEN_GEYSER_ADDRESS);
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
            <StyledRewardText color={colors.white}>{totalStaked.multipliedBy(apr).toFixed(6)} wPOKT*</StyledRewardText>
          </div>
        </StyledHeaderRight>
      </StyledHeader>
      <StyledSmallInfoCardsContainer>
        <SmallInfoCard iconType={'question'} statTitle={'APR'} statContent={`${commifyString(apr.toFixed(6))}%`} />
        <SmallInfoCard iconType={'caret'} statTitle={'Multiplier'} statContent={`${weightedMultiplier.toFixed(2)} X`} />
        <SmallInfoCard
          iconType={'question'}
          statTitle={'TOTAL STAKED'}
          statContent={`${commifyString(totalStaked.toFixed(2))} wPOKT`}
        />
        <SmallInfoCard
          iconType={'question'}
          statTitle={'MAX RELAYS/DAY'}
          statContent={`${formatRelays(maxRelays.toFixed(0))} M`}
        />
        <SmallInfoCard
          iconType={'question'}
          statTitle={'time left'}
          statContent={`${timeRemaining?.days} days left`}
          statFill={formatFillPercentage(timeRemaining, totalTime)}
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
              iconType={'question'}
              statTitle={'Farm Ownership'}
              statContent={`${ownershipShare.toFixed(2)}%`}
            />
            <SmallInfoCard iconType={'caret'} statTitle={'Apps'} statContent={'0'} />
            <SmallInfoCard iconType={'question'} statTitle={'Usage'} statContent={`${farmUsage.toFixed(2)}%`} />
            <SmallInfoCard
              iconType={'question'}
              statTitle={'Unlock Rate'}
              statContent={commifyString(rewardUnlockRate.toFixed(2))}
            />
            <SmallInfoCardExtraLinks showOnDesktop={true} showOnMobile={false} />
          </StyledSmallInfoCardsContainer>
        </>
      )}
    </div>
  );
};
