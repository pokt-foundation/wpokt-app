import React from 'react';
import styled, { css } from 'styled-components/macro';
import { media } from 'components/breakpoints';
import { colors, GU } from 'components/theme';

interface ISalesInfoStatCard {
  statContent: string;
  statTitle: string;
}

export const SalesInfoStatCard: React.FC<ISalesInfoStatCard> = ({ statContent, statTitle }) => {
  return (
    <StyledSmallInfoCard>
      <StyledSmallInfoCardHeader>
        <StyledStatText color={colors.white}>{statTitle}</StyledStatText>
      </StyledSmallInfoCardHeader>
      <StyledSmallInfoCardContent>
        <StyledStatText color={'#000'}>{statContent}</StyledStatText>
      </StyledSmallInfoCardContent>
    </StyledSmallInfoCard>
  );
};

const StyledSmallInfoCard = styled.div`
  border: ${GU}px solid #000000;
  width: ${36 * GU}px;

  ${media.xs`
    width: ${54 * GU}px;
  `}

  ${media.sm`
    width: ${38 * GU}px;
  `}

  ${media.md`
    width: ${52 * GU}px;
  `}

  ${media.lg`
    width: ${66 * GU}px;
  `}

  ${media.xl`
    width: ${103 * GU}px;
  `}
`;

const StyledSmallInfoCardContent = styled.div`
  padding: ${4 * GU}px ${2 * GU}px;
  position: relative;

  ${media.xs`
    padding: ${5 * GU}px ${2 * GU}px;
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
