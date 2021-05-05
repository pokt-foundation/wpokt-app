import React from 'react';
import { colors } from 'components/theme';

import { ReactComponent as FarmSvg } from 'assets/icons/farm.svg';
import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';

import {
  StyledFarmContainer,
  StyledHeader,
  StyledHeaderLeft,
  StyledHeaderRight,
  StyledLine,
  StyledSelectorContainer,
  StyledSmallInfoCardsContainer,
  StyledStakedText,
} from 'views/Stats/components';
import { Flex } from 'components/Containers';
import { Card, InnerCardContainer, MediumInfoCard } from 'components/Cards';
import Spacer from 'components/Spacer';
import { H1, P2 } from 'components/Typography';

import { TOKEN_GEYSER_ADDRESS, WPOKT_DECIMALS } from 'constants/index';

import { useFarmStats } from 'hooks/useFarmStats';

import { commifyString, formatDaysFromTimestamp } from 'utils';

const Stats: React.FC = () => {
  const { lockedRewards, rewardUnlockRate, totalRewards, totalStaked, totalTime, unlockedRewards } = useFarmStats(
    TOKEN_GEYSER_ADDRESS,
  );
  const [farmSelected, setFarmSelected] = React.useState<boolean>(true);

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
              <MediumInfoCard
                amount={`${commifyString(totalStaked.toFixed(WPOKT_DECIMALS))} wPOKT`}
                header={'Total Staked'}
                icon={'chest'}
                size={'sm'}
              />
              <MediumInfoCard
                amount={`${commifyString(totalRewards.toFixed(WPOKT_DECIMALS))} wPOKT`}
                header={'Total  Rewards'}
                icon={'star'}
                size={'sm'}
              />
              <MediumInfoCard
                amount={`${commifyString(lockedRewards.toFixed(WPOKT_DECIMALS))} wPOKT`}
                header={'Locked Rewards'}
                icon={'padlock'}
                size={'sm'}
              />
              <MediumInfoCard
                amount={`${commifyString(unlockedRewards.toFixed(WPOKT_DECIMALS))} wPOKT`}
                header={'Unlocked Rewards'}
                icon={'key'}
                size={'sm'}
              />
              <MediumInfoCard
                amount={`${formatDaysFromTimestamp(totalTime)} Days`}
                header={'Duration'}
                icon={'clock'}
                size={'sm'}
              />
              <MediumInfoCard
                amount={`${commifyString(rewardUnlockRate.toFixed(WPOKT_DECIMALS))} / month`}
                header={'Reward unlock Rate'}
                icon={'diamond'}
                size={'sm'}
              />
            </StyledSmallInfoCardsContainer>
          )}
        </InnerCardContainer>
      </Card>
      <Spacer size={'lg'} />
    </>
  );
};

export default Stats;
