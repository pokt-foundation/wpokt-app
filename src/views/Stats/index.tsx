import React from 'react';
import { CartesianGrid, LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { colors, GU } from 'components/theme';

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
} from './components';
import { Flex } from 'components/Containers';
import { Card, InnerCardContainer, MediumInfoCard } from 'components/Cards';
import Spacer from 'components/Spacer';
import { H1, P2 } from 'components/Typography';

const data = [
  { time: 'Day 1', rewards: 1 },
  { time: 'Day 2', rewards: 2 },
  { time: 'Day 3', rewards: 4 },
  { time: 'Day 4', rewards: 3 },
];

const Stats: React.FC = () => {
  const [farmSelected, setFarmSelected] = React.useState<boolean>(false);

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
                <Flex>
                  <StyledStakedText color={colors.white}>2,669.830235 wPOKT</StyledStakedText>
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
                <MediumInfoCard amount={'5,563.865330 wPOKT'} header={'Total Staked'} icon={'chest'} size={'sm'} />
                <MediumInfoCard amount={'5,563.865330 wPOKT'} header={'Total  Rewards'} icon={'star'} size={'sm'} />
                <MediumInfoCard amount={'5,563.865330 wPOKT'} header={'Locked Rewards'} icon={'padlock'} size={'sm'} />
                <MediumInfoCard amount={'5,563.865330 wPOKT'} header={'Unlocked Rewards'} icon={'key'} size={'sm'} />
                <MediumInfoCard amount={'5,563.865330 wPOKT'} header={'Duration'} icon={'clock'} size={'sm'} />
                <MediumInfoCard
                  amount={'5,563.865330 wPOKT'}
                  header={'Reward unlock Rate'}
                  icon={'diamond'}
                  size={'sm'}
                />
              </StyledContentContainer>
              <div>
                <LineChart width={1000} height={450} data={data} margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" height={75} tickMargin={15} />
                  <YAxis tickMargin={15} />
                  <Tooltip />
                  <Line
                    dot={{ strokeWidth: 2 * GU }}
                    strokeWidth={GU}
                    type={'linear'}
                    dataKey="rewards"
                    stroke={colors.yellow}
                  />
                </LineChart>
              </div>
            </StyledSmallInfoCardsContainer>
          )}
        </InnerCardContainer>
      </Card>
      <Spacer size={'lg'} />
    </>
  );
};

export default Stats;
