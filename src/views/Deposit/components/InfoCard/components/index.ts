import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';
import { colors, GU } from 'components/theme';

export { SmallInfoCard, SmallInfoCardExtraLinks } from './SmallInfoCard';

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

interface IStyledHeader {
  farmSelected: boolean;
}

export const StyledHeader = styled.div<IStyledHeader>`
  align-items: flex-start;
  background: #000;
  border: ${GU}px solid #000000;
  border-bottom: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
  }

  ${media.sm`
    align-items: center;
    flex-direction: row;
  `}

  ${(props) =>
    props.farmSelected &&
    css`
      background: ${colors.yellow};
    `}
`;

export const StyledHeaderLeft = styled.div`
  align-items: center;
  display: flex;

  div#farm-title {
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
    width: ${104 * GU}px;
  `}

  ${media.md`
    width: ${140 * GU}px;
  `}

  ${media.lg`
    width: ${190 * GU}px;
  `}

  ${media.xl`
    width: ${340 * GU}px;
  `}

  div#estimated-reward {
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
    height: ${5 * GU}px;
    margin: 0 ${2 * GU}px 0 0;
    width: ${GU}px;
  `}
`;

export const StyledMoreInfoContainer = styled.div`
  align-items: center;
  background: ${colors.grey};
  border: ${GU}px solid #000000;
  border-top: none;
  display: flex;
  height: ${9 * GU}px;
  justify-content: flex-end;
  padding-right: ${5 * GU}px;
  width: 100%;

  div {
    &:hover {
      cursor: pointer;

      div#selector-container {
        transform: rotate(90deg) translateX(-2px);
      }
    }
  }

  ${media.xs`
    height: ${10 * GU}px;
  `}
`;

export const StyledRewardText = styled.p`
  color: ${colors.white};
  font-family: PixelSplitter;
  font-size: 1rem;
  letter-spacing: 1px;

  ${media.xs`
    font-size: 1.6rem;
  `}

  ${media.md`
    font-size: 2.4rem;
  `}
`;

export const StyledSelectorContainer = styled.div`
  fill: ${colors.white};
  height: ${3 * GU}px;
  margin-left: ${4 * GU}px;
  transform: rotate(90deg);
  transition: all 0.3s ease;
  width: ${3 * GU}px;

  ${media.xs`
    height: ${4 * GU}px;
    margin-left: ${4 * GU}px;
    width: ${4 * GU}px;
  `}

  ${media.md`
    height: ${4 * GU}px;
    margin-left: ${5 * GU}px;
    width: ${4 * GU}px;
  `}
`;

export const StyledSmallInfoCardsContainer = styled.div`
  align-items: center;
  background: #fff;
  border: ${GU}px solid #000000;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  height: ${90 * GU}px;
  justify-content: space-between;
  padding: ${2 * GU}px;
  width: 100%;

  ${media.xs`
    height: ${100 * GU}px;
    padding: ${5 * GU}px;
  `}

  ${media.sm`
    height: auto;
  `}

  ${media.md`
    padding: ${7 * GU}px;
  `}
`;
