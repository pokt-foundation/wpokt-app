import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { media } from 'components/breakpoints';
import { colors, GU } from 'components/theme';

export const StyledInnerContainer = styled.div`
  margin: 0 auto;
  padding: ${GU * 20}px 0;
  width: ${80 * GU}px;

  ${media.xs`
    width: ${120 * GU}px;
  `}

  ${media.sm`
    width: ${190 * GU}px;
  `}

  ${media.md`
    width: ${247 * GU}px;
  `}

  ${media.lg`
    width: ${300 * GU}px;
  `}

  ${media.xl`
    width: ${450 * GU}px;
  `}
`;

export const StyledLink = styled(NavLink)`
  align-items: center;
  color: ${colors.white};
  display: none;
  text-decoration: none;
  transition: all 0.3s ease;

  ${media.sm`
    display: flex;
  `}

  div {
    height: ${3 * GU}px;
    margin-right: ${3 * GU}px;
    width: ${3 * GU}px;

    ${media.lg`
      height: ${4 * GU}px;
      margin-right: ${4 * GU}px;
      width: ${4 * GU}px;
    `}

    ${media.xl`
      height: ${5 * GU}px;
      margin-right: ${5 * GU}px;
      width: ${5 * GU}px;
    `}
  }

  svg {
    fill: #000};
  }

  &:hover {
    color: ${colors.yellow};
  }
  &:focus {
    color: ${colors.yellow};
  }
  &.active {
    color: ${colors.yellow};
    svg {
      fill: ${colors.yellow};
    }
  }
`;

export const StyledLowerLayer = styled.div``;

export const StyledNavigationContainer = styled.footer`
  background: #000;
  color: #fff;
  z-index: 999;
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

export const StyledNavigationItems = styled.ul`
  color: ${colors.white};
  font-size: 1rem;
  font-wight: 700;
  text-transform: uppercase;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
    transition: all 0.3s ease;
    letter-spacing: 3px;

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

export const StyledTopLayer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;

  ${media.lg`
    flex-direction: row;
    width: 70%;
  `}

  ${media.xl`
    width: 60%;
  `}
`;
