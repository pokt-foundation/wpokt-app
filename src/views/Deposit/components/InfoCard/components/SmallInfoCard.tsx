import React from 'react';
import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';
import { colors, GU } from 'components/theme';

// Components
import Spacer from 'components/Spacer';

// Assets
import { ReactComponent as CaretSvg } from 'assets/icons/caret.svg';
import { ReactComponent as MultiplierSvg } from 'assets/icons/multiplier.svg';
import { ReactComponent as QuestionMarkSvg } from 'assets/icons/question_mark.svg';

interface ISmallInfoCard {
  statContent: string;
  statFill?: number;
  statTitle: string;
  statType: 'question' | 'multiplier';
}

export const SmallInfoCard: React.FC<ISmallInfoCard> = ({ statContent, statFill, statTitle, statType }) => {
  return (
    <StyledSmallInfoCard>
      <StyledSmallInfoCardHeader>
        <StyledStatText color={colors.white}>{statTitle}</StyledStatText>
        {statType === 'question' ? <QuestionMarkSvg /> : <MultiplierSvg />}
      </StyledSmallInfoCardHeader>
      <StyledSmallInfoCardContent>
        <StyledInfoCardContentFill fill={statFill ? statFill : 0} />
        <StyledStatText color={'#000'}>{statContent}</StyledStatText>
      </StyledSmallInfoCardContent>
    </StyledSmallInfoCard>
  );
};

const StyledSmallInfoCard = styled.div`
  border: ${GU}px solid #000000;
  width: ${32 * GU}px;

  ${media.xs`
        width: ${47 * GU}px;
    `}

  ${media.sm`
        width: ${31 * GU}px;
    `}

    ${media.md`
        width: ${41 * GU}px;
    `}

    ${media.lg`
        width: ${50 * GU}px;
    `}

    ${media.xl`
        width: ${75 * GU}px;
    `}
`;

const StyledSmallInfoCardContent = styled.div`
  padding: ${4 * GU}px ${2 * GU}px;
  position: relative;

  ${media.xs`
        padding: ${5 * GU}px ${2 * GU}px;
    `}
`;

interface IStyledInfoCardContentFill {
  fill: number;
}

const StyledInfoCardContentFill = styled.div<IStyledInfoCardContentFill>`
  position: absolute;
  width: 0%;
  height: 100%;
  background: ${colors.green};
  top: 0;
  left: 0;

  ${(props) =>
    props.fill > 0 &&
    css`
      width: ${props.fill}%;
    `}
`;

const StyledSmallInfoCardHeader = styled.div`
  align-items: center;
  background: #000;
  display: flex;
  height: ${12 * GU}px;
  justify-content: space-between;
  padding: ${2 * GU}px;

  svg {
    &:hover {
      cursor: pointer;
    }
  }
`;

interface ITypograhpy {
  color?: string;
}

export const StyledStatText = styled.p<ITypograhpy>`
  font-family: PixelSplitter;
  font-size: 1rem;
  line-height: 12px;
  position: relative;

  ${media.xs`
        font-size: 1.4rem;
    `}

  ${media.sm`
        font-size: 0.9rem;
    `}

    ${media.md`
        font-size: 1.2rem;
        letter-spacing: 1px;
        line-height: 15px;
    `}

    ${media.lg`
        font-size: 1.4rem;
    `}

    ${media.xl`
        font-size: 1.8rem;
    `}

    ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
`;

export const SmallInfoCardExtraLinks: React.FC = () => {
  return (
    <StyledExtraLinksContainer>
      <StyledExtraLinksButton>
        Stats
        <CaretSvg />
      </StyledExtraLinksButton>
      <Spacer size={'xs'} />
      <StyledExtraLinksButton>
        FAQ
        <CaretSvg />
      </StyledExtraLinksButton>
    </StyledExtraLinksContainer>
  );
};

const StyledExtraLinksContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: ${22 * GU}px;
  justify-content: center;
  width: ${30 * GU}px;

  ${media.xs`
        height: ${25 * GU}px;
        width: ${47 * GU}px;
    `}

  ${media.sm`
        display: none;
    `}
`;

const StyledExtraLinksButton = styled.button`
  align-items: center;
  background: #000;
  border: none;
  color: ${colors.white};
  display: flex;
  font-family: PixelSplitter;
  font-size: 1.4rem;
  height: ${12 * GU}px;
  justify-content: space-between;
  outline: none;
  padding: 0 ${5 * GU}px;
  width: 100%;
`;
