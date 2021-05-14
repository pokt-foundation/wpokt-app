import styled from 'styled-components';
import { ResponsiveContainer } from 'recharts';
import { GU } from 'components/theme';
import { media } from 'components/breakpoints';

export { SalesInfoStatCard } from './SalesInfoStatCard';

export const StyledButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: ${8 * GU}px ${10 * GU}px 0;

  button {
    background: transparent;
    border: none;
    margin-bottom: ${8 * GU}px;
    transition: all 0.2s ease;

    &:hover {
      cursor: pointer;
      transform: translate3d(0, ${-GU}px, 0);
    }

    &:active,
    &:focus {
      cursor: pointer;
      transform: translate3d(0, ${GU}px, 0);
    }

    ${media.xs`
      margin-bottom: ${15 * GU}px;
    `}
  }

  ${media.xs`
    padding: ${15 * GU}px ${10 * GU}px 0;
  `}

  ${media.md`
    padding: ${15 * GU}px ${50 * GU}px 0;
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
