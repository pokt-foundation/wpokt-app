import styled, { css } from 'styled-components';
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
  right: ${4 * GU}px;
  top: ${4 * GU}px;
  transition: all 0.3s ease;

  &:hover,
  &:active,
  &:focus {
    cursor: pointer;
    fill: ${colors.yellow};
  }
`;

export const StyledFarmContainer = styled.div`
  height: ${11 * GU}px;
  margin-right: ${5 * GU}px;
  position: absolute;
  right: 0;
  width: ${12 * GU}px;

  ${media.sm`
    height: ${15 * GU}px;
    margin-right: ${5 * GU}px;
    width: ${16 * GU}px;
  `}
`;

export const StyledIconsContainer = styled.div`
  position: relative;
  height: ${13 * GU}px;
  width: 100%;

  ${media.sm`
    height: ${17 * GU}px;
  `}
`;

export const StyledInnerContainer = styled.div`
  background: #000;
  height: 100%;
  padding: ${12 * GU}px ${5 * GU}px;
  width: 100%;

  ${media.xs`
    padding: ${12 * GU}px ${10 * GU}px;
  `}

  ${media.sm`
    padding: ${12 * GU}px ${8 * GU}px;
  `}

  ${media.md`
    padding: ${12 * GU}px ${16 * GU}px;
  `}
`;

export const StyledModalContainer = styled.div`
  background: white;
  border: ${GU}px solid #000000;
  box-sizing: border-box;
  left: 50%;
  padding: ${2 * GU}px;
  position: fixed;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: ${80 * GU}px;
  z-index: 10000;

  ${media.xs`
    width: ${100 * GU}px;
  `}

  ${media.md`
    width: ${135 * GU}px;
  `}
`;

export const StyledStatusContainer = styled.div`
  bottom: -${4 * GU}px;
  height: ${8 * GU}px;
  margin-right: ${5 * GU}px;
  left: 50%;
  position: absolute;
  transform: translate3d(-50%, 0, 0);
  width: ${8 * GU}px;

  ${media.sm`
    bottom: -${6 * GU}px;
    height: ${15 * GU}px;
    margin-right: ${5 * GU}px;
    width: ${15 * GU}px;
  `}
`;

interface IStyledTractorContainer {
  type: 'TRANSACTION_WAITING' | 'TRANSACTION_APPROVED' | 'TRANSACTION_REJECTED';
}

export const StyledTractorContainer = styled.div<IStyledTractorContainer>`
  bottom: ${GU}px;
  height: ${12 * GU}px;
  margin-right: ${5 * GU}px;
  position: absolute;
  left: ${6 * GU}px;
  width: ${12 * GU}px;

  ${media.sm`
    height: ${15 * GU}px;
    margin-right: ${5 * GU}px;
    width: ${15 * GU}px;
  `}

  ${(props) =>
    props.type === 'TRANSACTION_APPROVED' &&
    css`
      left: auto;
      right: ${10 * GU}px;
    `}

  ${(props) =>
    props.type === 'TRANSACTION_REJECTED' &&
    css`
      transform: rotate(-70deg);
    `}
`;
