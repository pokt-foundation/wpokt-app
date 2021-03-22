import styled from 'styled-components';
import { media } from 'components/breakpoints';
import { colors, GU } from 'components/theme';

export const StyledDepositInputContainer = styled.div`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  display: flex;

  ${media.sm`
    position: relative;
  `}

  input {
    background: transparent;
    border: ${GU}px solid #000000;
    box-sizing: border-box;
    font-family: PixelSplitter;
    font-size: 0.9rem;
    height: ${15 * GU}px;
    justify-content: space-between;
    letter-spacing: 1px;
    padding: ${5 * GU}px;
    width: 100%;

    ${media.xs`
      height: ${20 * GU}px;
      font-size: 1.4rem;
      padding: ${6 * GU}px ${8 * GU}px;
    `}

    ${media.sm`
      font-size: 1.6rem;
      padding: ${8 * GU}px;
    `}

    ${media.md`
      font-size: 1.8rem;
    `}

    ${media.xl`
      height: ${22 * GU}px;
    `}
  }

  button {
    background: transparent;
    border: none;
    margin: ${4 * GU}px auto ${3 * GU}px;
    position: block;
    transition: all 0.1s ease;

    &:hover {
      cursor: pointer;
    }

    &:active {
      cursor: pointer;
      transform: translateY(2px);
    }

    ${media.xs`
      margin: ${5 * GU}px auto ${3 * GU}px;
    `}

    ${media.sm`
      position: absolute;
      margin: 0;
      right: ${5 * GU}px;
      top: 50%;
      transform: translateY(-50%);

      &:hover {
        transform: translateY(-52%);
      }

      &:active {
        transform: translateY(-48%);
      }
    `}

    &:disabled {
      cursor: not-allowed;

      &:hover {
        transform: translateY(-50%);
      }

      &:active {
        transform: translateY(-50%);
      }
    }
  }
`;

export const StyledHeader = styled.div`
  align-items: flex-start;
  background: #000;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.sm`
    align-items: center;
    flex-direction: row;
  `}
`;

export const StyledHeaderLeft = styled.div`
  align-items: center;
  display: flex;

  div#enter-amount {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: ${5 * GU}px ${5 * GU}px ${4 * GU}px;

    ${media.xs`
      padding: ${5 * GU}px ${6 * GU}px;
    `}

    ${media.sm`
      padding: ${7 * GU}px;
    `}
  }
`;

export const StyledHeaderRight = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${media.sm`
    flex-direction: row;
    width: ${85 * GU}px;
  `}

  ${media.md`
    width: ${107 * GU}px;
  `}

  ${media.lg`
    width: ${112 * GU}px;
  `}

  div#wallet-balance {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;

    padding: ${4 * GU}px ${5 * GU}px;

    ${media.xs`
      padding: ${6 * GU}px ${7 * GU}px;
    `}

    ${media.sm`
      padding: ${7 * GU}px ${7 * GU}px ${7 * GU}px 0;
    `}
  }
`;

export const StyledLine = styled.div`
  background: ${colors.red};
  height: ${0.5 * GU}px;
  width: 100%;

  ${media.sm`
    display: none;
  `}
`;

export const StyledMaxButton = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  display: flex;
  height: ${4 * GU}px;
  justify-content: center;
  margin-left: ${3 * GU}px;

  div#max-svg {
    align-items: center;
    display: flex;
    height: ${3 * GU}px;
    width: ${7 * GU}px;

    ${media.xs`
      height: ${5 * GU}px;
      width: ${13 * GU}px;
    `}
  }

  div#max-selector-svg {
    align-items: center;
    display: flex;
    fill: ${colors.yellow};
    height: ${2 * GU}px;
    margin-left: ${2 * GU}px;
    transform: rotate(90deg);
    transition: all 0.2s ease;
    width: ${2 * GU}px;

    ${media.xs`
      height: ${5 * GU}px;
      width: ${5 * GU}px;
    `}
  }

  &:hover {
    cursor: pointer;

    div#max-selector-svg {
      transform: rotate(90deg) translateX(-2px);
    }
  }

  &:active {
    cursor: pointer;

    div#max-selector-svg {
      transform: rotate(90deg) translateX(2px);
    }
  }

  ${media.xs`
    height: ${5 * GU}px;
    margin-left: ${5 * GU}px;
  `}

  ${media.sm`
    margin-left: ${3 * GU}px;
  `}
`;
