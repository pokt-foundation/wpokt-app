import React from 'react';
import styled from 'styled-components/macro';
import { colors, GU } from 'components/theme';
import { media } from 'components/breakpoints';

import { ReactComponent as ChestSvg } from 'assets/icons/chest.svg';
import { ReactComponent as RewardsSvg } from 'assets/icons/rewards.svg';

import Spacer from 'components/Spacer';
import { H2, P2 } from 'components/Typography';

interface IMediumInfoCard {
  amount: string;
  header: string;
  icon: 'chest' | 'rewards';
}

export const MediumInfoCard: React.FC<IMediumInfoCard> = ({ amount, header, icon }) => {
  return (
    <StyledMediumInfoCardContainer>
      {icon === 'chest' ? <ChestSvg /> : <RewardsSvg />}
      <div>
        <H2 color={colors.white}>{header}</H2>
        <Spacer size={'xs'} />
        <P2 color={colors.white}>{amount}</P2>
      </div>
    </StyledMediumInfoCardContainer>
  );
};

const StyledMediumInfoCardContainer = styled.div`
  align-items: center;
  background: #000;
  box-sizing: border-box;
  display: flex;
  height: ${27 * GU}px;
  justify-content: flex-start;
  margin-bottom: ${2 * GU}px;
  padding: 0 ${6 * GU}px;
  width: ${68 * GU}px;

  ${media.xs`
    margin-bottom: ${5 * GU}px;
    width: ${100 * GU}px;
  `}

  ${media.sm`
    width: ${52 * GU}px;
  `}

  ${media.md`
    height: ${28 * GU}px;
    margin-bottom: ${7 * GU}px;
    width: ${70 * GU}px;
  `}

  ${media.lg`
    width: ${98 * GU}px;
  `}

  ${media.xl`
    width: ${170 * GU}px;
  `}

  div {
    margin-left: ${6 * GU}px;
  }
`;
