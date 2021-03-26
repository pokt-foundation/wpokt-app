import React from 'react';
import 'styled-components/macro';
import { colors, GU } from 'components/theme';

import { ReactComponent as EthereumSvg } from 'assets/icons/ethereum.svg';
import { ReactComponent as FarmSvg } from 'assets/icons/farm.svg';

import {
  StyledContentContainer,
  StyledFarmContainer,
  StyledHeader,
  StyledHeaderLeft,
  StyledHeaderRight,
  StyledLine,
  StyledRewardText,
  StyledSmallInfoCardsContainer,
} from './components';
import { MediumInfoCard, SmallInfoCard, SmallInfoCardExtraLinks } from 'components/Cards';
import { H1, P2 } from 'components/Typography';

import { Web3Context } from 'contexts/Web3';

interface IWithdraw {
  farmSelected: boolean;
}

export const WithdrawInfo: React.FC<IWithdraw> = ({ farmSelected }) => {
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
        <WithdrawFarm farmSelected={farmSelected} />
      )}
    </>
  );
};

interface IWithdrawFarm {
  farmSelected: boolean;
}

const WithdrawFarm: React.FC<IWithdrawFarm> = ({ farmSelected }) => {
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
          <SmallInfoCardExtraLinks showOnDesktop={true} showOnMobile={true} />
        </StyledContentContainer>
        <div>
          <MediumInfoCard amount={'5,563.865330 wPOKT'} header={'Total Deposit'} icon={'chest'} size={'md'} />
          <MediumInfoCard amount={'5,563.865330 wPOKT'} header={'Rewards Claimed'} icon={'rewards'} size={'md'} />
        </div>
      </StyledSmallInfoCardsContainer>
    </div>
  );
};
