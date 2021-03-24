import React from 'react';
import styled from 'styled-components/macro';
import { colors, GU } from 'components/theme';
import { media } from 'components/breakpoints';

import { ReactComponent as ChestSvg } from 'assets/icons/chest.svg';
import { ReactComponent as EthereumSvg } from 'assets/icons/ethereum.svg';
import { ReactComponent as FarmSvg } from 'assets/icons/farm.svg';
import { ReactComponent as RewardsSvg } from 'assets/icons/rewards.svg';

import {
  SmallInfoCard,
  SmallInfoCardExtraLinks,
  StyledContentContainer,
  StyledFarmContainer,
  StyledHeader,
  StyledHeaderLeft,
  StyledHeaderRight,
  StyledLine,
  StyledRewardText,
  StyledSmallInfoCardsContainer,
} from './components';
import Spacer from 'components/Spacer';
import { H1, H2, P1, P2 } from 'components/Typography';

import { Web3Context } from 'contexts/Web3';

export const WithdrawInfo: React.FC = () => {
  const { address } = React.useContext(Web3Context);

  return (
    <>
      {!address ? (
        <div
          css={`
            align-items: center;
            background: #000;
            display: flex;
            padding: ${7 * GU}px;
          `}
        >
          <div
            css={`
              box-sizing: border-box;
              min-height: 50px;
              margin-right: ${5 * GU}px;
              min-width: 32px;
            `}
          >
            <EthereumSvg />
          </div>
          <P2 color={colors.white}>Connect your Ethereum wallet to withdraw your funds</P2>
        </div>
      ) : (
        <WithdrawFarm />
      )}
    </>
  );
};

const WithdrawFarm: React.FC = () => {
  return (
    <div>
      <StyledHeader farmSelected={true}>
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
            <P2 color={colors.white}>Yeild Earned</P2>
            <StyledRewardText color={colors.white}>00.0000000 wPOKT</StyledRewardText>
          </div>
        </StyledHeaderRight>
      </StyledHeader>
      <StyledSmallInfoCardsContainer>
        <StyledContentContainer>
          <SmallInfoCard iconType={'question'} statTitle={'APY'} statContent={'10%'} />
          <SmallInfoCard iconType={'caret'} statTitle={'Multiplier'} statContent={'1.0 X'} />
          <SmallInfoCard iconType={'question'} statTitle={'Farm Ownership'} statContent={'4%'} />
          <SmallInfoCard iconType={'caret'} statTitle={'Duration'} statContent={'2 Days Left'} statFill={38} />
          <SmallInfoCard iconType={'question'} statTitle={'MAX RELAYS/DAY'} statContent={'10 M '} />
          <SmallInfoCardExtraLinks />
        </StyledContentContainer>
        <div>
          <MediumInfoCard amount={'5,563.865330 wPOKT'} header={'Total Deposit'} icon={'chest'} />
          <MediumInfoCard amount={'5,563.865330 wPOKT'} header={'Rewards Claimed'} icon={'rewards'} />
        </div>
      </StyledSmallInfoCardsContainer>
    </div>
  );
};

interface IMediumInfoCard {
  amount: string;
  header: string;
  icon: 'chest' | 'rewards';
}

const MediumInfoCard: React.FC<IMediumInfoCard> = ({ amount, header, icon }) => {
  return (
    <StyledMediumInfoCardContainer>
      {icon === 'chest' ? <ChestSvg /> : <RewardsSvg />}
      <div>
        <H2 color={colors.white}>{header}</H2>
        <Spacer size={'xs'} />
        <P2 color={colors.white}>{amount}</P2>
      </div>
    </StyledMediumInfoCardContainer>
  );
};

const StyledMediumInfoCardContainer = styled.div`
  align-items: center;
  background: #000;
  box-sizing: border-box;
  display: flex;
  height: ${27 * GU}px;
  justify-content: flex-start;
  margin-bottom: ${2 * GU}px;
  padding: 0 ${6 * GU}px;
  width: ${68 * GU}px;

  ${media.xs`
    margin-bottom: ${5 * GU}px;
    width: ${100 * GU}px;
  `}

  ${media.sm`
    width: ${52 * GU}px;
  `}

  ${media.md`
    height: ${28 * GU}px;
    margin-bottom: ${7 * GU}px;
    width: ${70 * GU}px;
  `}

  ${media.lg`
    width: ${98 * GU}px;
  `}

  ${media.xl`
    width: ${170 * GU}px;
  `}

  div {
    margin-left: ${6 * GU}px;
  }
`;
