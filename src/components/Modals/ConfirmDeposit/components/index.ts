import styled from 'styled-components/macro';
import { colors, GU } from 'components/theme';
import { media } from 'components/breakpoints';

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

export const StyledContentContainer = styled.div`
  border-bottom: ${GU}px solid #000000;
  padding: ${4 * GU}px;
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
      transform: translateY(-2px);
    }

    &:active {
      cursor: pointer;
      transform: translateY(2px);
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

export const StyledModalContainer = styled.div`
  background: white;
  box-sizing: border-box;
  left: 50%;
  padding: ${2 * GU}px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${75 * GU}px;
  z-index: 10000;

  ${media.sm`
    width: ${100 * GU}px;
  `}

  ${media.lg`
    width: ${120 * GU}px;
  `}
`;
