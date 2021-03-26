import React from 'react';
import TokenAmount from 'token-amount';
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
} from './components';
import { SmallInfoCard, SmallInfoCardExtraLinks } from 'components/Cards';
import { Flex } from 'components/Containers';
import { H1, P2 } from 'components/Typography';

import { TOKEN_GEYSER_ADDRESS } from 'constants/index';

import { useFarmStats } from 'hooks/useFarmStats';

interface IDepositInfo {
  farmSelected: boolean;
}

export const DepositInfo: React.FC<IDepositInfo> = ({ farmSelected }) => {
  const { apy, totalStaked } = useFarmStats(TOKEN_GEYSER_ADDRESS);
  const [showMore, setShowMore] = React.useState<boolean>(false);

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
        <SmallInfoCard iconType={'question'} statTitle={'APY'} statContent={`${apy.toString()}%`} />
        <SmallInfoCard iconType={'caret'} statTitle={'Multiplier'} statContent={'1.0 X'} />
        <SmallInfoCard
          iconType={'question'}
          statTitle={'TOTAL STAKED'}
          statContent={TokenAmount.format(totalStaked, 18, { symbol: 'wPOKT' })}
        />
        <SmallInfoCard iconType={'question'} statTitle={'MAX RELAYS/DAY'} statContent={'10 M '} />
        <SmallInfoCard iconType={'question'} statTitle={'time left'} statContent={'2 days'} statFill={38} />
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
            <SmallInfoCard iconType={'question'} statTitle={'Farm Ownership'} statContent={'12%'} />
            <SmallInfoCard iconType={'caret'} statTitle={'Apps'} statContent={'12'} />
            <SmallInfoCard iconType={'question'} statTitle={'Usage'} statContent={'55.4%'} />
            <SmallInfoCard iconType={'question'} statTitle={'xxxxxx'} statContent={'00.00'} />
            <SmallInfoCardExtraLinks showOnDesktop={true} showOnMobile={false} />
          </StyledSmallInfoCardsContainer>
        </>
      )}
    </div>
  );
};
