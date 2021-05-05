import styled from 'styled-components';
import { media } from 'components/breakpoints';
import { colors, GU } from 'components/theme';

export const StyledFooterContainer = styled.footer`
  background: #000;
  color: #fff;
  z-index: 999;
`;

export const StyledLayerContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;

  ${media.lg`
    flex-direction: row;
  `}

  ${media.xl`
    width: ${300 * GU}px;
  `}
`;

export const StyledNavigationItems = styled.ul`
  align-items: center;
  color: ${colors.white};
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  font-wight: 700;
  justify-content: space-between;
  text-transform: uppercase;
  width: ${80 * GU}px;

  ${media.xs`
    width: ${90 * GU}px;
  `}

  ${media.md`
    font-size: 1.2rem;
    width: ${115 * GU}px;
  `}

  ${media.xl`
    font-size: 1.4rem;
    width: ${150 * GU}px;
  `}

  li {
    letter-spacing: 3px;
    transition: all 0.3s ease;

    ${media.md`
      letter-spacing: 5px;
    `}

    ${media.lg`
      letter-spacing: 6px;
    `}
              
    &:hover {
      color: ${colors.yellow};
      cursor: pointer;
    }
  }

  a {
    align-items: center;
    color: ${colors.white};
    display: flex;
    text-decoration: none;
    transition: all 0.3s ease;
    &:hover,
    &:focus {
      color: ${colors.yellow};
    }
  }
`;

export const StyledSocialContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: ${GU * 45}px;

  a {
    fill: #fff;
    transition: all 0.3s ease;
    &:hover {
      fill: ${colors.yellow};
    }
  }
`;
