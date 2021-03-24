import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';
import { colors, GU } from 'components/theme';

export { EnterAmount } from './EnterAmount';
export { DepositInfo } from './DepositInfo';
export { WithdrawInfo } from './WithdrawInfo';

interface IStyledButtonLarge {
  active: boolean;
}

export const StyledButtonLarge = styled.button<IStyledButtonLarge>`
  background: transparent;
  border: none;
  font-family: PixelSplitter;
  font-size: 0.8rem;
  height: ${10 * GU}px;
  letter-spacing: 3px;
  position: relative;
  transition: all 0.3s ease;
  width: 50%;

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.active &&
    css`
      background: ${colors.yellowLight};
    `}

  ${media.xs`
    font-size: 1rem;
    height: ${12 * GU}px;
    letter-spacing: 7px;
  `}

  ${media.sm`
    font-size: 1.4rem;
    letter-spacing: 14px;
  `}

  ${media.md`
    font-size: 1.6rem;
    letter-spacing: 16px;
  `}

  ${media.lg`
    font-size: 1.8rem;
  `}

  ${media.xl`
    font-size: 2rem;
    height: ${15 * GU}px;
  `}
`;

export const StyledSelectorContainer = styled.div`
  height: ${3 * GU}px;
  left: ${3 * GU}px;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: ${3 * GU}px;

  ${media.xs`
    height: ${4 * GU}px;
    width: ${4 * GU}px;
  `}

  ${media.sm`
    height: ${5 * GU}px;
    left: ${5 * GU}px;
    width: ${5 * GU}px;
  `}
`;
