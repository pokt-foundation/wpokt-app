import React from 'react';
import { colors } from 'components/theme';

import { ReactComponent as FarmSvg } from 'assets/icons/farm.svg';

import {
  StyledContentContainer,
  StyledFarmContainer,
  StyledHeader,
  StyledHeaderLeft,
  StyledHeaderRight,
  StyledLine,
  StyledSmallInfoCardsContainer,
  StyledStakedText,
} from './components';
import { Card, InnerCardContainer, SmallInfoCard, SmallInfoCardExtraLinks } from 'components/Cards';
import Spacer from 'components/Spacer';
import { H1, P2 } from 'components/Typography';

const MyFarms: React.FC = () => {
  return (
    <>
      <Spacer size={'md'} />
      <Card>
        <InnerCardContainer borderBottom={false}>
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
                <P2 color={colors.white}>Total Staked</P2>
                <StyledStakedText color={colors.white}>2,669.830235wPOKT</StyledStakedText>
              </div>
            </StyledHeaderRight>
          </StyledHeader>
          <StyledSmallInfoCardsContainer>
            <StyledContentContainer>
              <SmallInfoCard iconType={'question'} statTitle={'APY'} statContent={'10%'} />
              <SmallInfoCard iconType={'caret'} statTitle={'Multiplier'} statContent={'1.0 X'} />
              <SmallInfoCard iconType={'question'} statTitle={'Total Staked'} statContent={'23,456.3 wpokt'} />
              <SmallInfoCard iconType={'caret'} statTitle={'Max Relays/Day'} statContent={'1 M'} />
              <SmallInfoCard iconType={'question'} statTitle={'MAX RELAYS/DAY'} statContent={'10 M '} />
              <SmallInfoCard iconType={'question'} statTitle={'Supported APps'} statContent={'12'} />
              <SmallInfoCard iconType={'question'} statTitle={'Rewards unlocked'} statContent={'30%'} />
              <SmallInfoCard iconType={'question'} statTitle={'Farm ownership'} statContent={'14%'} />
              <SmallInfoCard iconType={'question'} statTitle={'Duration'} statContent={'54 Days'} statFill={38} />
              <SmallInfoCardExtraLinks />
            </StyledContentContainer>
            <div>Test</div>
          </StyledSmallInfoCardsContainer>
        </InnerCardContainer>
      </Card>
      <Spacer size={'lg'} />
    </>
  );
};

export default MyFarms;
