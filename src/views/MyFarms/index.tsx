import React from 'react';
import { useHistory } from 'react-router-dom';
import { colors } from 'components/theme';

import { ReactComponent as FarmSvg } from 'assets/icons/farm.svg';
import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';

import {
  StyledContentContainer,
  StyledFarmContainer,
  StyledHeader,
  StyledHeaderLeft,
  StyledHeaderRight,
  StyledLine,
  StyledSelectorContainer,
  StyledSmallInfoCardsContainer,
  StyledStakedText,
} from 'views/MyFarms/components';
import { Flex } from 'components/Containers';
import {
  Card,
  InnerCardContainer,
  MediumDepositWithdrawLinks,
  MediumInfoCard,
  MediumStatsFaqLinks,
  SmallInfoCard,
  SmallInfoCardExtraLinks,
} from 'components/Cards';
import Spacer from 'components/Spacer';
import { H1, P2 } from 'components/Typography';

import { TOKEN_GEYSER_ADDRESS } from 'constants/index';

import { DepositWithdrawalContext } from 'contexts/DepositWithdrawal';

import { useFarmStats } from 'hooks/useFarmStats';

import { commifyString } from 'utils';

const MyFarms: React.FC = () => {
  const history = useHistory();
  const { onSetActionType } = React.useContext(DepositWithdrawalContext);
  const { apy, timeRemaining, totalStaked } = useFarmStats(TOKEN_GEYSER_ADDRESS);
  const [farmSelected, setFarmSelected] = React.useState<boolean>(true);

  const onDepositWithdrawLink = (actionType: 'deposit' | 'withdraw') => {
    onSetActionType(actionType);
    history.replace('/');
  };

  return (
    <>
      <Spacer size={'md'} />
      <Card>
        <InnerCardContainer borderBottom={false}>
          <StyledHeader onClick={() => setFarmSelected(!farmSelected)} farmSelected={farmSelected}>
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
                <Flex align={'center'}>
                  <StyledStakedText color={colors.white}>
                    {commifyString(totalStaked.toFixed(6))} wPOKT
                  </StyledStakedText>
                  <StyledSelectorContainer farmSelected={farmSelected}>
                    <SelectorSvg />
                  </StyledSelectorContainer>
                </Flex>
              </div>
            </StyledHeaderRight>
          </StyledHeader>
          {farmSelected && (
            <StyledSmallInfoCardsContainer>
              <StyledContentContainer>
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'APY'}
                  statContent={`${commifyString(apy.toFixed(2))}%`}
                />
                <SmallInfoCard iconType={'caret'} statTitle={'Multiplier'} statContent={'1.0 X'} />
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Total Staked'}
                  statContent={`${commifyString(totalStaked.toFixed(2))} wPOKT`}
                />
                <SmallInfoCard iconType={'caret'} statTitle={'Max Relays/Day'} statContent={'1 M'} />
                <SmallInfoCard iconType={'question'} statTitle={'Farm Usage'} statContent={'55.4%'} />
                <SmallInfoCard iconType={'question'} statTitle={'Supported APps'} statContent={'12'} />
                <SmallInfoCard iconType={'question'} statTitle={'Rewards unlocked'} statContent={'30%'} />
                <SmallInfoCard iconType={'question'} statTitle={'Farm ownership'} statContent={'14%'} />
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Duration'}
                  statContent={`${timeRemaining?.days} Days`}
                  statFill={38}
                />
                <SmallInfoCardExtraLinks />
              </StyledContentContainer>
              <div>
                <MediumInfoCard amount={'5,563.865330 wPOKT'} header={'Total Yield Earned'} icon={'rake'} size={'md'} />
                <MediumDepositWithdrawLinks onDepositWithdrawLink={onDepositWithdrawLink} />
                <MediumStatsFaqLinks />
              </div>
            </StyledSmallInfoCardsContainer>
          )}
        </InnerCardContainer>
      </Card>
      <Spacer size={'lg'} />
    </>
  );
};

export default MyFarms;
