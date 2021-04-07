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
import { Web3Context } from 'contexts/Web3';

import { useFarmStats } from 'hooks/useFarmStats';
import { useUserStats } from 'hooks/useUserStats';

import { commifyString, formatFillPercentage, formatRelays } from 'utils';

const MyFarms: React.FC = () => {
  const history = useHistory();
  const { onSetActionType } = React.useContext(DepositWithdrawalContext);
  const { address } = React.useContext(Web3Context);
  const { apr, farmUsage, maxRelays, unlockedRewards, timeRemaining, totalTime } = useFarmStats(TOKEN_GEYSER_ADDRESS);
  const { earned, ownershipShare, totalStaked, weightedMultiplier } = useUserStats(
    address ? address : '',
    TOKEN_GEYSER_ADDRESS,
  );
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
                  statTitle={'APR'}
                  statContent={`${commifyString(apr.toFixed(6))}%`}
                />
                <SmallInfoCard
                  iconType={'caret'}
                  statTitle={'Multiplier'}
                  statContent={`${weightedMultiplier.toFixed(2)} X`}
                />
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Total Staked'}
                  statContent={`${commifyString(totalStaked.toFixed(2))} wPOKT`}
                />
                <SmallInfoCard
                  iconType={'caret'}
                  statTitle={'Max Relays/Day'}
                  statContent={`${formatRelays(maxRelays.toFixed(0))} M`}
                />
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Farm Usage'}
                  statContent={`${farmUsage.toFixed(2)}%`}
                />
                <SmallInfoCard iconType={'question'} statTitle={'Supported Apps'} statContent={'0'} />
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Rewards unlocked'}
                  statContent={`${commifyString(unlockedRewards.toFixed(2))} wPOKT`}
                />
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Farm ownership'}
                  statContent={`${ownershipShare.toFixed(2)}%`}
                />
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Time Left'}
                  statContent={`${timeRemaining?.days} Days`}
                  statFill={formatFillPercentage(timeRemaining, totalTime)}
                />
                <SmallInfoCardExtraLinks />
              </StyledContentContainer>
              <div>
                <MediumInfoCard
                  amount={`${commifyString(totalStaked.multipliedBy(earned).toFixed(6))} wPOKT*`}
                  header={'Total Yield Earned'}
                  icon={'rake'}
                  size={'md'}
                />
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
