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
import { Container, Flex } from 'components/Containers';
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

import { TOKEN_GEYSER_ADDRESS, WPOKT_DECIMALS } from 'constants/index';

import { DepositWithdrawalContext } from 'contexts/DepositWithdrawal';
import { Web3Context } from 'contexts/Web3';

import { useFarmStats } from 'hooks/useFarmStats';
import { useUserStats } from 'hooks/useUserStats';

import {
  commifyString,
  formatDaysFromTimestamp,
  formatFillPercentage,
  formatOwnershipShare,
  formatRelays,
} from 'utils';

const MyFarms: React.FC = () => {
  const history = useHistory();
  const { onSetActionType } = React.useContext(DepositWithdrawalContext);
  const { address } = React.useContext(Web3Context);
  const { apr, farmUsage, maxRelays, unlockedRewards, timeLeft, totalTime } = useFarmStats(TOKEN_GEYSER_ADDRESS);
  const { earned, ownershipShare, totalStaked, weightedMultiplier } = useUserStats(
    address ? address : '',
    TOKEN_GEYSER_ADDRESS,
  );
  const [farmSelected, setFarmSelected] = React.useState<boolean>(true);

  const onDepositWithdrawLink = (actionType: 'deposit' | 'withdraw') => {
    onSetActionType(actionType);
    history.push('/');
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
                    {commifyString(totalStaked.toFixed(WPOKT_DECIMALS))} wPOKT
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
                  statContent={`${commifyString(apr.toFixed(WPOKT_DECIMALS))}%`}
                  tooltip={`My Estimated APR (Annual Percentage Rate) is an annual rate of rewards on wPOKT staked. While most projects used APY, APR is a more accurate way to measure wPOKT returns as wPOKT is non-compounding. This is a current Farm-wide APR.`}
                />
                <SmallInfoCard
                  iconType={'caret'}
                  statTitle={'Multiplier'}
                  statContent={`${weightedMultiplier.toFixed(2)} X`}
                  tooltip={`The Multiplier increases the longer you stake, up to 3x. This gives you more pool ownership and incentivizes long-term staking which provides usage stability for DApps. `}
                />
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Total Staked'}
                  statContent={`${commifyString(totalStaked.toFixed(2))} wPOKT`}
                  tooltip={`The total number of wPOKT staked in the Farm.`}
                />
                <SmallInfoCard
                  iconType={'caret'}
                  statTitle={'Max Relays/Day'}
                  statContent={`${formatRelays(maxRelays)} M`}
                  tooltip={`The amount of relays you are contributing to DApps by staking in this Farm. The more you stake, the more access DApps get to Pocket Network.`}
                />
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Farm Usage'}
                  statContent={`${farmUsage.toFixed(2)}%`}
                  tooltip={`Farm usage is a measurement of how over/understaked a farm is in comparison to the max Max Relays it was intended to provide. Overstaking (>100%) means that there is likely more demand to new create pools.`}
                />
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Supported Apps'}
                  statContent={'0'}
                  tooltip={`The number of applications using the Farm's relays.`}
                />
                {/* Note: If this is wPOKT, why do we have to fix it to 2 decimals? Subgraph? */}
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Rewards unlocked'}
                  statContent={`${commifyString(unlockedRewards.toFixed(2))} wPOKT`}
                  tooltip={` `}
                />
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Farm ownership'}
                  statContent={`${formatOwnershipShare(ownershipShare)}%`}
                  tooltip={`Farm ownership is your rights to the Unlocked Rewards measured as a percentage.`}
                />
                <SmallInfoCard
                  iconType={'question'}
                  statTitle={'Time Left'}
                  statContent={`${formatDaysFromTimestamp(timeLeft)} Days`}
                  statFill={formatFillPercentage(timeLeft, totalTime)}
                  tooltip={`The remaining number of days for which pool rewards will unlocked at the current rate.`}
                />
                <SmallInfoCardExtraLinks />
              </StyledContentContainer>
              <div>
                <MediumInfoCard
                  amount={`${commifyString(earned.toFixed(WPOKT_DECIMALS))} wPOKT*`}
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
      <Spacer size={'sm'} />
      <Container>
        <P2>
          *Estimated values do not represent or guarantee the actual results of any transaction or stake. In addition,
          other metrics and calculations shown on the app have not been independently verified or audited. Use at your
          own risk.
        </P2>
      </Container>
      <Spacer size={'lg'} />
    </>
  );
};

export default MyFarms;
