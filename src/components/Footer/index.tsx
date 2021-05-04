import React from 'react';
import 'styled-components/macro';
import { media } from 'components/breakpoints';
import { GU } from 'components/theme';

import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';
import { ReactComponent as DiscrodSvg } from 'assets/icons/discord.svg';
import { ReactComponent as TwitterSvg } from 'assets/icons/twitter.svg';
import { ReactComponent as TelegramSvg } from 'assets/icons/telegram.svg';

import {
  StyledInnerContainer,
  StyledLink,
  StyledLowerLayer,
  StyledNavigationContainer,
  StyledNavigationItems,
  StyledSocialContainer,
  StyledTopLayer,
} from 'components/Footer/components';
import Spacer from 'components/Spacer';

const Footer: React.FC = () => {
  return (
    <StyledNavigationContainer>
      <StyledInnerContainer>
        <TopLayer />
        <Spacer size={'lg'} />
        <StyledLowerLayer>Lower Layer</StyledLowerLayer>
      </StyledInnerContainer>
    </StyledNavigationContainer>
  );
};

export default Footer;

const TopLayer: React.FC = () => {
  return (
    <StyledTopLayer>
      <StyledNavigationItems>
        <li>
          <a
            css={`
              margin-right: ${6 * GU}px;

              ${media.lg`
                margin-right: ${8 * GU}px;
              `}

              ${media.xl`
                margin-right: ${10 * GU}px;
              `}
            `}
            href={'https://discord.gg/FK4A8AFrHZ'}
            target={'_blank'}
            rel={'noreferrer noopener'}
          >
            Support
          </a>
        </li>
        <li>
          <a href={'https://www.pokt.network/'} target={'_blank'} rel={'noreferrer noopener'}>
            About POKT
          </a>
        </li>
        <li>
          <StyledLink exact activeClassName="active" to="/propose-app">
            <div>
              <SelectorSvg />
            </div>
            Propose App
          </StyledLink>
        </li>
      </StyledNavigationItems>
      <Spacer size={'md'} />
      <StyledSocialContainer>
        <a href={'https://discord.com/invite/uYs6Esum3r'} target={'_blank'} rel={'noreferrer noopener'}>
          <DiscrodSvg />
        </a>
        <a href={'https://twitter.com/POKTnetwork'} target={'_blank'} rel={'noreferrer noopener'}>
          <TwitterSvg />
        </a>
        <a href={'https://t.me/POKTnetwork'} target={'_blank'} rel={'noreferrer noopener'}>
          <TelegramSvg />
        </a>
      </StyledSocialContainer>
    </StyledTopLayer>
  );
};
