import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';
import { colors } from 'components/theme';

export { EnterAmount } from './EnterAmount';
export { InfoCard } from './InfoCard';

interface IStyledButtonLarge {
  active: boolean;
}

export const StyledButtonLarge = styled.button<IStyledButtonLarge>`
  background: transparent;
  border: none;
  font-family: PixelSplitter;
  font-size: 8px;
  height: 40px;
  letter-spacing: 3px;
  outline: none;
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
        font-size: 10px;
        height: 50px;
        letter-spacing: 7px;
    `}

    ${media.sm`
        font-size: 14px;
        letter-spacing: 14px;
    `}

    ${media.md`
        font-size: 16px;
        letter-spacing: 16px;
    `}

    ${media.lg`
        font-size: 18px;
    `}

    ${media.xl`
        font-size: 20px;
        height: 60px;
    `}
`;

export const StyledSelectorContainer = styled.div`
  height: 14px;
  left: 10px;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;

  ${media.xs`
        height: 16px;
        left: 12px;
        width: 16px;
    `}

  ${media.sm`
        height: 22px;
        left: 20px;
        width: 22px;
    `}
`;
