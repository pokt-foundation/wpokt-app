import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import 'styled-components/macro';
import { CartesianGrid, LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { colors, GU } from 'components/theme';

import { ReactComponent as CloseSvg } from 'assets/icons/close.svg';

import {
  StyledChartContainer,
  StyledCloseContainer,
  StyledModalContainer,
} from 'components/Modals/GraphFullscreen/components';
import Spacer from 'components/Spacer';
import { H1 } from 'components/Typography';

import { DepositWithdrawalContext } from 'contexts/DepositWithdrawal';

const data = [
  { time: 'Day 1', rewards: 1 },
  { time: 'Day 2', rewards: 2 },
  { time: 'Day 3', rewards: 4 },
  { time: 'Day 4', rewards: 3 },
];

const GraphFullscreen: React.FC = () => {
  const { onCloseModal } = React.useContext(DepositWithdrawalContext);

  return (
    <StyledModalContainer>
      <div
        css={`
          align-items: center;
          background: ${colors.yellow};
          border-bottom: ${GU}px solid #000;
          display: flex;
          padding: ${8 * GU}px;
          position: relative;
          width: 100%;
        `}
      >
        <H1 color={colors.white}>unlocked Rewards</H1>
        <StyledCloseContainer onClick={onCloseModal}>
          <VisuallyHidden>Close</VisuallyHidden>
          <CloseSvg />
        </StyledCloseContainer>
      </div>
      <Spacer size={'xs'} />
      <StyledChartContainer>
        <LineChart data={data} margin={{ top: 50, right: 30, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" height={75} stroke={'#000'} tickMargin={15} />
          <YAxis stroke={'#000'} tickMargin={15} />
          <Tooltip />
          <Line
            dot={{ strokeWidth: 2 * GU }}
            strokeWidth={GU}
            type={'linear'}
            dataKey="rewards"
            stroke={colors.yellow}
          />
        </LineChart>
      </StyledChartContainer>
    </StyledModalContainer>
  );
};

export default GraphFullscreen;
