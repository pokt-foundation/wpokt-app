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
import { Card, InnerCardContainer } from 'components/Cards';
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
            {/* <StyledContentContainer>
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
            </div> */}
            test
          </StyledSmallInfoCardsContainer>
        </InnerCardContainer>
      </Card>
      <Spacer size={'lg'} />
    </>
  );
};

export default MyFarms;
