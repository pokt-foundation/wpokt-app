import styled, { css } from 'styled-components/macro';
import { colors, GU } from 'components/theme';
import { media } from 'components/breakpoints';

export { InsufficientFunds } from 'components/Modals/ConfirmTransaction/components/InsufficientFunds';

export const StyledCloseContainer = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  display: flex;
  fill: ${colors.white};
  justify-content: center;
  position: absolute;
  right: ${1 * GU}px;
  top: ${2 * GU}px;
  transition: all 0.3s ease;

  &:hover,
  &:active,
  &:focus {
    cursor: pointer;
    fill: ${colors.yellow};
  }
`;

export const StyledCoinContainer = styled.div`
  height: ${12 * GU}px;
  width: ${12 * GU}px;
  margin-right: ${4 * GU}px;
`;

interface IStyledContentContainer {
  copied?: boolean;
}

export const StyledContentContainer = styled.div<IStyledContentContainer>`
  border-bottom: ${GU}px solid #000000;
  box-sizing: border-box;
  padding: ${4 * GU}px;

  button {
    background: transparent;
    border: none;

    ${(props) =>
      props.copied &&
      css`
        background: #000;
        border-radius: ${2 * GU}px;
        color: ${colors.white};
        font-family: PixelSplitter;
        font-size: 0.8rem;
        height: ${5 * GU}px;
        width: ${16 * GU}px;
      `}

    &:hover {
      cursor: pointer;
    }
  }
`;

export const StyledDepositButtonContainer = styled.div`
  align-items: center;
  display: flex;
  height: ${20 * GU}px;
  justify-content: center;
  width; 100%;

  button {
    background: transparent;
    border: none;
    transition: all 0.1s ease;

    &:hover {
      cursor: pointer;
      transform: translate3d(0, -2px, 0);
    }

    &:active {
      cursor: pointer;
      transform: translate3d(0, 2px, 0);
    }
  }
`;

export const StyledDetailHeader = styled.div`
  background: #000;
  padding: ${3 * GU}px;
`;

export const StyledFarmContainer = styled.div`
  height: ${7 * GU}px;
  margin-right: ${5 * GU}px;
  width: ${8 * GU}px;

  ${media.sm`
    height: ${10 * GU}px;
    margin-right: ${5 * GU}px;
    width: ${10 * GU}px;
  `}
`;

export const StyledGraphAndWarningContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;

  ${media.sm`
    flex-direction: row;
  `}
`;

export const StyledGraphContainer = styled.div`
  height: ${29 * GU}px;
  margin: 0 auto ${5 * GU}px;
  width: ${65 * GU}px;

  ${media.xs`
    margin: 0 auto ${6 * GU}px;
  `}

  ${media.sm`
    height: ${20 * GU}px;
    margin: 0;
    width: ${45 * GU}px;
  `}

  ${media.lg`
    height: ${29 * GU}px;
    width: ${65 * GU}px;
  `}
`;

export const StyledLink = styled.button`
  align-items: center;
  background: #000;
  border: none;
  box-sizing: border-box;
  display: flex;
  height: ${9 * GU}px;
  justify-content: space-between;
  padding: ${2 * GU}px;
  width: 47%;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledModalContainer = styled.div`
  background: white;
  box-sizing: border-box;
  left: 50%;
  padding: ${2 * GU}px;
  position: fixed;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: ${75 * GU}px;
  z-index: 10000;

  ${media.sm`
    width: ${100 * GU}px;
  `}

  ${media.lg`
    width: ${120 * GU}px;
  `}
`;

export const StyledPiggyBankContainer = styled.div`
  height: ${10 * GU}px;
  width: ${12 * GU}px;
  margin-right: ${4 * GU}px;
`;

export const StyledWarning = styled.div`
  background: #000;
  box-sizing: border-box;
  height: ${18 * GU}px;
  padding: ${3 * GU}px;
  width: 100%;
`;

export const StyledWarningContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: ${29 * GU}px;
  justify-content: space-between;
  width: 100%;

  ${media.sm`
    width: 50%;
  `}
`;
