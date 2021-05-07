import React from 'react';
import ReactTooltip from 'react-tooltip';
import VisuallyHidden from '@reach/visually-hidden';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';
import { media } from 'components/breakpoints';
import { colors, GU } from 'components/theme';

import Spacer from 'components/Spacer';

import { ReactComponent as CaretSvg } from 'assets/icons/caret.svg';
import { ReactComponent as MultiplierSvg } from 'assets/icons/multiplier.svg';
import { ReactComponent as QuestionMarkSvg } from 'assets/icons/question_mark.svg';

interface ISmallInfoCard {
  iconType: 'question' | 'caret';
  statContent: string;
  statFill?: number;
  statTitle: string;
  tooltip: string;
}

export const SmallInfoCard: React.FC<ISmallInfoCard> = ({ iconType, statContent, statFill, statTitle, tooltip }) => {
  React.useEffect(() => {
    ReactTooltip.rebuild();
  }, []);
  return (
    <StyledSmallInfoCard>
      <StyledSmallInfoCardHeader>
        <StyledStatText color={colors.white}>{statTitle}</StyledStatText>
        {iconType === 'question' ? (
          <StyledSmallInfoCardButton data-for="custom-event" data-tip={tooltip} data-event="click focus">
            <VisuallyHidden>More Info</VisuallyHidden>
            <QuestionMarkSvg />
          </StyledSmallInfoCardButton>
        ) : (
          <StyledSmallInfoCardButton data-for="custom-event" data-tip={tooltip} data-event="click focus">
            <VisuallyHidden>More Info</VisuallyHidden>
            <MultiplierSvg />
          </StyledSmallInfoCardButton>
        )}
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
  margin-bottom: ${2 * GU}px;
  width: ${32 * GU}px;

  ${media.xs`
    margin-bottom: ${5 * GU}px;
    width: ${47 * GU}px;
  `}

  ${media.sm`
    width: ${31 * GU}px;
  `}

  ${media.md`
    margin-bottom: ${7 * GU}px;
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

const StyledSmallInfoCardButton = styled.a`
  background: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }
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

const StyledStatText = styled.p<ITypograhpy>`
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

interface ISmallInfoCardExtraLinks {
  showOnDesktop?: boolean;
  showOnMobile?: boolean;
}

export const SmallInfoCardExtraLinks: React.FC<ISmallInfoCardExtraLinks> = ({ showOnDesktop, showOnMobile }) => {
  const history = useHistory();
  return (
    <StyledExtraLinksContainer showOnDesktop={showOnDesktop} showOnMobile={showOnMobile}>
      <StyledExtraLinksButton onClick={() => history.push('/stats')}>
        Stats
        <CaretSvg />
      </StyledExtraLinksButton>
      <Spacer size={'xs'} />
      <StyledExtraLinksButton
        href={'https://forum.pokt.network/t/wpokt-faq/780'}
        target={'_blank'}
        rel={'noreferrer noopener'}
      >
        FAQ
        <CaretSvg />
      </StyledExtraLinksButton>
    </StyledExtraLinksContainer>
  );
};

interface IStyledExtraLinksContainer {
  showOnDesktop?: boolean;
  showOnMobile?: boolean;
}

const StyledExtraLinksContainer = styled.div<IStyledExtraLinksContainer>`
  align-items: center;
  margin-bottom: ${2 * GU}px;
  display: none;
  flex-direction: column;
  height: ${22 * GU}px;
  justify-content: center;
  width: ${30 * GU}px;

  ${media.xs`
    height: ${25 * GU}px;
    margin-bottom: ${5 * GU}px;
    width: ${47 * GU}px;
  `}

  ${media.sm`
    display: flex;
    width: ${31 * GU}px;
  `}

  ${media.md`
    margin-bottom: ${7 * GU}px;
    width: ${41 * GU}px;
  `}

  ${media.lg`
    width: ${50 * GU}px;
  `}

  ${media.xl`
    width: ${75 * GU}px;
  `}

  ${(props) =>
    !props.showOnDesktop &&
    css`
      display: flex;

      ${media.sm`
        display: none;
      `}
    `}

  ${(props) =>
    props.showOnMobile &&
    css`
      display: flex;
    `}
`;

const StyledExtraLinksButton = styled.a`
  align-items: center;
  background: #000;
  border: none;
  color: ${colors.white};
  display: flex;
  font-family: PixelSplitter;
  font-size: 1.4rem;
  height: ${12 * GU}px;
  justify-content: space-between;
  padding: 0 ${5 * GU}px;
  text-decoration: none;
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;
