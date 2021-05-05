import React from 'react';
import 'styled-components/macro';
import { colors, GU } from 'components/theme';

import { ReactComponent as DiscordSvg } from 'assets/icons/discord.svg';
import { ReactComponent as TwitterSvg } from 'assets/icons/twitter.svg';
import { ReactComponent as TelegramSvg } from 'assets/icons/telegram.svg';

import {
  StyledFooterContainer,
  StyledNavigationItems,
  StyledSocialContainer,
  StyledLayerContainer,
} from 'components/Footer/components';
import { Container } from 'components/Containers';
import Spacer from 'components/Spacer';
import { P1, P2 } from 'components/Typography';

const Footer: React.FC = () => {
  return (
    <StyledFooterContainer>
      <Container
        css={`
          padding: ${GU * 20}px 0;
        `}
      >
        <TopLayer />
        <Spacer size={'md'} />
        <BottomLayer />
      </Container>
    </StyledFooterContainer>
  );
};

export default Footer;

const TopLayer: React.FC = () => {
  return (
    <StyledLayerContainer>
      <StyledNavigationItems>
        <li>
          <a href={'https://discord.gg/FK4A8AFrHZ'} target={'_blank'} rel={'noreferrer noopener'}>
            Support
          </a>
        </li>
        <li>
          <a href={'https://www.pokt.network/'} target={'_blank'} rel={'noreferrer noopener'}>
            About POKT
          </a>
        </li>
        <li>
          <a
            href={'https://form.typeform.com/to/KEDKrQ0x?typeform-medium=embed-snippet'}
            target={'_blank'}
            rel={'noreferrer noopener'}
          >
            Propose App
          </a>
        </li>
      </StyledNavigationItems>
      <Spacer size={'md'} />
      <StyledSocialContainer>
        <a href={'https://discord.com/invite/uYs6Esum3r'} target={'_blank'} rel={'noreferrer noopener'}>
          <DiscordSvg />
        </a>
        <a href={'https://twitter.com/POKTnetwork'} target={'_blank'} rel={'noreferrer noopener'}>
          <TwitterSvg />
        </a>
        <a href={'https://t.me/POKTnetwork'} target={'_blank'} rel={'noreferrer noopener'}>
          <TelegramSvg />
        </a>
      </StyledSocialContainer>
    </StyledLayerContainer>
  );
};

const BottomLayer: React.FC = () => {
  return (
    <StyledLayerContainer>
      <P2 color={'#fff'}>
        By using this app you accept Pocket{' '}
        <a
          css={`
            color: ${colors.green};
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          `}
          href={'/terms-of-use'}
          target={'_blank'}
          rel={'noreferrer noopener'}
        >
          Terms of Service
        </a>
      </P2>
      <Spacer size={'md'} />
      <P1
        color={'#fff'}
        css={`
          font-family: 'Podkova', serif;
          text-transform: uppercase;
        `}
      >
        ©2021 Pocket Network Inc.
      </P1>
    </StyledLayerContainer>
  );
};
