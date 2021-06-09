import React from 'react';
import styled from 'styled-components/macro';
import { media } from 'components/breakpoints';
import { GU } from 'components/theme';

import partner1 from 'assets/images/partner-1.png';
import partner2 from 'assets/images/partner-2.png';
import partner3 from 'assets/images/partner-3.png';
import partner4 from 'assets/images/partner-4.png';
import partner5 from 'assets/images/partner-5.png';
import partner6 from 'assets/images/partner-6.png';
import partner7 from 'assets/images/partner-7.png';
import partner8 from 'assets/images/partner-8.png';
import partner9 from 'assets/images/partner-9.png';
import partner10 from 'assets/images/partner-10.png';
import partner11 from 'assets/images/partner-11.png';
import partner12 from 'assets/images/partner-12.png';
import partner13 from 'assets/images/partner-13.png';
import partner14 from 'assets/images/partner-14.png';
import partner15 from 'assets/images/partner-15.png';
import partner16 from 'assets/images/partner-16.png';
import partner17 from 'assets/images/partner-17.png';

import { StyledPartnersContainer } from 'views/SalesInfo/components';

export const PartnersContainer: React.FC = () => {
  return (
    <StyledPartnersContainer>
      <StyledLogo
        css={`
          background-image: url(${partner1});
        `}
      />
      <StyledLogo
        css={`
          background-image: url(${partner2});
        `}
      />
      <StyledLogo
        css={`
          background-image: url(${partner3});
        `}
      />
      <StyledLogo
        css={`
          background-image: url(${partner4});
        `}
      />
      <StyledLogo
        css={`
          background-image: url(${partner5});
        `}
      />
      <StyledLogo
        css={`
          background-image: url(${partner6});
        `}
      />
      <StyledLogo
        css={`
          background-image: url(${partner7});
        `}
      />
      <StyledLogo
        css={`
          background-image: url(${partner8});
        `}
      />
      <StyledLogo
        css={`
          background-image: url(${partner9});
        `}
      />
      <StyledLogo
        css={`
          background-image: url(${partner10});
        `}
      />
      <StyledLogo
        css={`
          background-image: url(${partner11});
        `}
      />
      <StyledLogo
        css={`
          background-image: url(${partner12});
        `}
      />
      <StyledLogo
        css={`
          background-image: url(${partner13});
        `}
      />
      <StyledLogo
        css={`
          background-image: url(${partner14});
        `}
      />
      <StyledLogo
        css={`
          background-image: url(${partner15});
        `}
      />
      <StyledLogo
        css={`
          background-image: url(${partner16});
        `}
      />
      <StyledLogo
        css={`
          background-image: url(${partner17});
        `}
      />
    </StyledPartnersContainer>
  );
};

const StyledLogo = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: ${15 * GU}px;
  width: ${20 * GU}px;

  ${media.xs`
    height: ${15 * GU}px;
    width: ${20 * GU}px;
  `}

  ${media.sm`
    height: ${15 * GU}px;
    width: ${30 * GU}px;
  `}

  ${media.md`
    width: ${40 * GU}px;
  `}

  ${media.lg`
    height: ${15 * GU}px;
    width: ${45 * GU}px;
  `}

  ${media.xl`
    height: ${20 * GU}px;
    width: ${55 * GU}px;
  `}
`;
