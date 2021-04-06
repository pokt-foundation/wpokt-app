import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';
import { colors, GU } from 'components/theme';
import { media } from 'components/breakpoints';

import { ReactComponent as CaretSvg } from 'assets/icons/caret.svg';
import { ReactComponent as ChestSvg } from 'assets/icons/chest.svg';
import { ReactComponent as ClockSvg } from 'assets/icons/clock.svg';
import { ReactComponent as DiamondSvg } from 'assets/icons/diamond.svg';
import { ReactComponent as KeySvg } from 'assets/icons/key.svg';
import { ReactComponent as MultiplierSvg } from 'assets/icons/multiplier.svg';
import { ReactComponent as PadlockSvg } from 'assets/icons/padlock.svg';
import { ReactComponent as RakeSvg } from 'assets/icons/rake.svg';
import { ReactComponent as RewardsSvg } from 'assets/icons/rewards.svg';
import { ReactComponent as StarSvg } from 'assets/icons/star.svg';

import Spacer from 'components/Spacer';
import { H2, P2 } from 'components/Typography';

interface IMediumInfoCard {
  amount: string;
  header: string;
  icon: 'chest' | 'clock' | 'diamond' | 'key' | 'padlock' | 'rake' | 'rewards' | 'star';
  size: 'sm' | 'md';
}

export const MediumInfoCard: React.FC<IMediumInfoCard> = ({ amount, header, icon, size }) => {
  return (
    <StyledMediumInfoCardContainer size={size}>
      <VisuallyHidden>More Info</VisuallyHidden>
      {icon === 'chest' && <ChestSvg />}
      {icon === 'clock' && <ClockSvg />}
      {icon === 'diamond' && <DiamondSvg />}
      {icon === 'key' && <KeySvg />}
      {icon === 'padlock' && <PadlockSvg />}
      {icon === 'rake' && <RakeSvg />}
      {icon === 'rewards' && <RewardsSvg />}
      {icon === 'star' && <StarSvg />}
      <div>
        <H2 color={colors.white}>{header}</H2>
        <Spacer size={'xs'} />
        <P2 color={colors.white}>{amount}</P2>
      </div>
    </StyledMediumInfoCardContainer>
  );
};

interface IStyledMediumInfoCardContainer {
  size: 'sm' | 'md';
}

const StyledMediumInfoCardContainer = styled.div<IStyledMediumInfoCardContainer>`
  align-items: center;
  background: #000;
  display: flex;
  height: ${27 * GU}px;
  justify-content: flex-start;
  margin-bottom: ${2 * GU}px;
  padding: 0 ${6 * GU}px;

  ${media.xs`
    margin-bottom: ${5 * GU}px;
  `}

  ${media.md`
    height: ${28 * GU}px;
    margin-bottom: ${7 * GU}px;
  `}

  ${(props) =>
    props.size === 'sm' &&
    css`
      width: 100%;

      ${media.sm`
        width: ${78 * GU}px;
      `}

      ${media.md`
        width: ${104 * GU}px;
      `}

      ${media.lg`
        width: ${84 * GU}px;
      `}

      ${media.xl`
        width: ${121 * GU}px;
      `}
    `}

    ${(props) =>
    props.size === 'md' &&
    css`
      width: ${68 * GU}px;

      ${media.xs`
        width: ${100 * GU}px;
      `}

      ${media.sm`
        width: ${52 * GU}px;
      `}
  
      ${media.md`
        width: ${70 * GU}px;
      `}
  
      ${media.lg`
        width: ${98 * GU}px;
      `}
  
      ${media.xl`
        width: ${170 * GU}px;
      `}
    `}

  div {
    margin-left: ${6 * GU}px;
  }
`;

interface IMediumDepositWithdrawLinks {
  onDepositWithdrawLink: (actionType: 'deposit' | 'withdraw') => void;
}

export const MediumDepositWithdrawLinks: React.FC<IMediumDepositWithdrawLinks> = ({ onDepositWithdrawLink }) => {
  return (
    <StyledLinksContainer>
      <StyledLinkButton color={colors.green} onClick={() => onDepositWithdrawLink('deposit')}>
        <P2 color={colors.white}>Deposit</P2>
        <div>
          <CaretSvg />
        </div>
      </StyledLinkButton>
      <StyledLinkButton color={colors.red} onClick={() => onDepositWithdrawLink('withdraw')}>
        <P2 color={colors.white}>Withdraw</P2>
        <div>
          <CaretSvg />
        </div>
      </StyledLinkButton>
    </StyledLinksContainer>
  );
};

export const MediumStatsFaqLinks: React.FC = () => {
  const history = useHistory();

  return (
    <StyledLinksContainer>
      <StyledLinkButton color={'#000'} onClick={() => history.replace('/stats')}>
        <P2 color={colors.white}>Stats</P2>
        <div>
          <MultiplierSvg />
        </div>
      </StyledLinkButton>
      <StyledLinkButton color={'#000'}>
        <P2 color={colors.white}>Faq</P2>
        <div>
          <MultiplierSvg />
        </div>
      </StyledLinkButton>
    </StyledLinksContainer>
  );
};

const StyledLinksContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: ${27 * GU}px;
  justify-content: space-between;
  margin-bottom: ${2 * GU}px;
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

interface IStyledLinkButton {
  color: string;
}

const StyledLinkButton = styled.button<IStyledLinkButton>`
  align-items: center;
  border: ${GU}px solid #000000;
  display: flex;
  justify-content: center;
  padding: ${3 * GU}px;
  position: relative;
  width: 100%;

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.color &&
    css`
      background: ${props.color};
    `}

  div {
    position: absolute;
    right: ${4 * GU}px;
  }
`;
