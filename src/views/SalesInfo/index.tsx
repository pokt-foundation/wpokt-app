import React from 'react';
import { Bar, BarChart, ErrorBar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import { colors, GU } from 'components/theme';

import { Card, InnerCardContainer } from 'components/Cards';
import Spacer from 'components/Spacer';
import { H1, P1, P2 } from 'components/Typography';

const data = [
  { name: 'Day 1', max: 20000, min: 10000, error: [1000, 1000] },
  { name: 'Day 2', max: 45000, min: 34000, errorNegative: [10000, 2000] },
  { name: 'Day 3', max: 32000, min: 24000, errorNegative: [10000, 2000] },
  { name: 'Day 4', max: 10000, min: 4000, error: [2000, 10000] },
  { name: 'Day 5', max: 20000, min: 11000, error: [2000, 10000] },
  { name: 'Day 6', max: 30000, min: 4000, error: [2000, 20000] },
  { name: 'Day 7', max: 2000, min: 1000, error: [1200, 2000] },
];

const lineWidth = 3;

const SalesInfo: React.FC = () => {
  return (
    <>
      <Spacer size={'md'} />
      <Card>
        <InnerCardContainer borderBottom={false}>
          <StyledGraphContainer>
            <StyledGraphTextContainer>
              <H1 color={colors.white}>wPOKT Liquidity bootstrapping Event</H1>
            </StyledGraphTextContainer>
            <StyledChartContainer>
              <BarChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <XAxis xAxisId={0} dataKey="name" hide />
                <XAxis xAxisId={1} dataKey="name" tickMargin={10} />
                <YAxis domain={[0, 50000]} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar barSize={10} xAxisId={0} dataKey="max" fill={colors.green} />
                <Bar barSize={10} xAxisId={1} dataKey="min" fill={colors.white}>
                  <ErrorBar dataKey="error" width={4} strokeWidth={2} stroke={colors.green} />
                  <ErrorBar dataKey="errorNegative" width={4} strokeWidth={2} stroke={colors.red} />
                </Bar>
              </BarChart>
            </StyledChartContainer>
            <StyledGraphTextContainer>
              <P1 color={colors.white}>Price movement if nobody buys</P1>
              <Spacer size={'xs'} />
              <P2 color={colors.red}>89% wPokt sold</P2>
            </StyledGraphTextContainer>
          </StyledGraphContainer>
        </InnerCardContainer>
      </Card>
      <Spacer size={'lg'} />
    </>
  );
};

export default SalesInfo;

export const StyledChartContainer = styled(ResponsiveContainer)`
  background: white;
  min-height: ${125 * GU}px;
`;

const StyledGraphContainer = styled.div`
  border: ${GU}px solid #000;
`;

const StyledGraphTextContainer = styled.div`
  background: #000;
  display: flex;
  flex-direction: column;
  padding: ${5 * GU}px;
  width: 100%;
`;
