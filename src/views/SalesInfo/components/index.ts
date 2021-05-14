import styled from 'styled-components';
import { ResponsiveContainer } from 'recharts';
import { GU } from 'components/theme';
import { media } from 'components/breakpoints';

export { PartnersContainer } from './PartnersContainer';
export { SalesInfoStatCard } from './SalesInfoStatCard';

export const StyledPartnersContainer = styled.div`
  justify-items: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(9, ${16 * GU}px);
  padding: ${4 * GU}px;

  ${media.xs`
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(5, ${20 * GU}px);
    padding: ${8 * GU}px;
  `}

  ${media.sm`
    grid-template-rows: repeat(5, ${30 * GU}px);
  `}

  ${media.lg`
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, ${30 * GU}px);
  `}

  ${media.xl`
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(3, ${34 * GU}px);
  `}
`;

export const StyledChartContainer = styled(ResponsiveContainer)`
  background: white;
  min-height: ${125 * GU}px;
`;

export const StyledContentContainer = styled.div`
  border: ${GU}px solid #000;
`;

export const StyledContentTextContainer = styled.div`
  background: #000;
  display: flex;
  flex-direction: column;
  padding: ${5 * GU}px;
  width: 100%;
`;

export const StyledInfoCard = styled.div`
  background: #000;
  padding: ${10 * GU}px ${8 * GU}px;

  ${media.sm`
    padding: ${10 * GU}px ${10 * GU}px;
  `}

  ${media.sm`
    padding: ${10 * GU}px ${25 * GU}px;
  `}

  ${media.lg`
    padding: ${10 * GU}px ${50 * GU}px;
  `}

  ${media.xl`
    padding: ${10 * GU}px ${100 * GU}px;
  `}
`;
