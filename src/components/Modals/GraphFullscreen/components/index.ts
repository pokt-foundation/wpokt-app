import styled from 'styled-components/macro';
import { ResponsiveContainer } from 'recharts';
import { colors, GU } from 'components/theme';
import { media } from 'components/breakpoints';

export const StyledChartContainer = styled(ResponsiveContainer)`
  min-height: ${75 * GU}px;
  max-height: ${75 * GU}px;
  max-width: 95%;

  ${media.sm`
    min-height: ${100 * GU}px;
    max-height: ${100 * GU}px;
  `}

  ${media.md`
    min-height: ${125 * GU}px;
    max-height: ${125 * GU}px;
  `}

  ${media.xl`
    min-height: ${165 * GU}px;
  `}
`;

export const StyledCloseContainer = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  display: flex;
  fill: ${colors.white};
  justify-content: center;
  position: absolute;
  right: ${4 * GU}px;
  top: ${4 * GU}px;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledModalContainer = styled.div`
  background: white;
  border: ${GU}px solid #000;
  box-sizing: border-box;
  left: 50%;
  max-height: 100vh;
  position: fixed;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: ${74 * GU}px;
  z-index: 10000;

  ${media.xs`
    width: ${112 * GU}px;
  `}

  ${media.sm`
    width: ${180 * GU}px;
  `}

  ${media.md`
    height: ${160 * GU}px;
    width: ${240 * GU}px;
  `}

  ${media.lg`
    height: ${180 * GU}px;
    width: ${250 * GU}px;
  `}

  ${media.xl`
    height: ${200 * GU}px;
    width: ${300 * GU}px;
  `}
`;
