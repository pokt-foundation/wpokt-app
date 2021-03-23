import React from 'react';
import TokenAmount from 'token-amount';
import 'styled-components/macro';
import { colors } from 'components/theme';

import {
  SmallInfoCard,
  SmallInfoCardExtraLinks,
  StyledFarmContainer,
  StyledHeader,
  StyledHeaderLeft,
  StyledHeaderRight,
  StyledLine,
  StyledMoreInfoContainer,
  StyledRewardText,
  StyledSelectorContainer,
  StyledSmallInfoCardsContainer,
} from './components';
import { Flex } from 'components/Containers';
import { H1, P2 } from 'components/Typography';

import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';
import { ReactComponent as FarmSvg } from 'assets/icons/farm.svg';

import { TOKEN_GEYSER_ADDRESS } from 'constants/index';

import { useFarmStats } from 'hooks/useFarmStats';

interface IInfoCard {
  farmSelected: boolean;
}

export const InfoCard: React.FC<IInfoCard> = ({ farmSelected }) => {
  const { apy, totalStaked } = useFarmStats(TOKEN_GEYSER_ADDRESS);

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
            <StyledRewardText color={colors.white}>00.0000000Wpokt*</StyledRewardText>
          </div>
        </StyledHeaderRight>
      </StyledHeader>
      <StyledSmallInfoCardsContainer>
        <SmallInfoCard statType={'question'} statTitle={'APY'} statContent={`${apy.toString()}%`} />
        <SmallInfoCard statType={'multiplier'} statTitle={'Multiplier'} statContent={'1.0 X'} />
        <SmallInfoCard
          statType={'question'}
          statTitle={'TOTAL STAKED'}
          statContent={TokenAmount.format(totalStaked, 18, { symbol: 'wPOKT' })}
        />
        <SmallInfoCard statType={'question'} statTitle={'MAX RELAYS/DAY'} statContent={'10 M '} />
        <SmallInfoCard statType={'question'} statTitle={'time left'} statContent={'2 days'} statFill={38} />
        <SmallInfoCardExtraLinks />
      </StyledSmallInfoCardsContainer>
      <StyledMoreInfoContainer>
        <button
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
    </div>
  );
};
