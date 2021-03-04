import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { media } from 'components/breakpoints';
import { colors } from 'components/theme';

export const StyledConnectWalletButton = styled.button`
  align-items: center;
  background: transparent;
  border: 3px solid ${colors.white};
  color: ${colors.white};
  display: flex;
  font-family: PixelSplitter;
  font-size: 0.8rem;
  height: 3.2rem;
  justify-content: space-around;
  letter-spacing: 3px;
  transition: all 0.3s ease;
  width: 11rem;

  &:hover,
  &:active,
  &:focus {
    border: 3px solid ${colors.yellow};
    color: ${colors.yellow};
    cursor: pointer;
  }

  ${media.xs`
        font-size: 1rem;
        height: 3.8rem;
        width: 13rem;
    `}

  ${media.md`
        font-size: 1.2rem;
        letter-spacing: 5px;
        width: 15rem;
    `}

    ${media.lg`
        letter-spacing: 6px;
        height: 4.5rem;
        width: 19rem;
    `}

    ${media.xl`
        font-size: 1.4rem;
        height: 5.5rem;
        width: 22.5rem;
    `}
`;

export const StyledLink = styled(NavLink)`
  color: ${colors.white};
  text-decoration: none;
  transition: all 0.3s ease;

  &:focus {
    color: ${colors.yellow};
  }
  &.active {
    color: ${colors.yellow};
  }
`;

export const StyledLogoContainer = styled.div`
  fill: ${colors.white};
  height: 1.9rem;
  transition: all 0.3s ease;
  width: 10rem;

  &:hover {
    cursor: pointer;
    fill: ${colors.yellow};
  }

  ${media.xs`
        height: 2.8rem;
        width: 15rem;
    `}

  ${media.lg`
        height: 3.7rem;
        width: 20rem;
    `}

    ${media.xl`
        height: 4.3rem;
        width: 22.5rem;
    `}
`;

export const StyledMetaMaskImageContainer = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 1.5rem;
  width: 1.5rem;

  ${media.xs`
        height: 2rem;
        width: 2rem;
    `}

  ${media.md`
        height: 2.5rem;
        width: 2.5rem;
    `}

    ${media.lg`
        height: 3rem;
        width: 3rem;
    `}

    ${media.xl`
        height: 3.5rem;
        width: 3.5rem;
    `}
`;

export const StyledNavigationContainer = styled.div`
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  height: 8rem;
  justify-content: space-between;
  padding: 0 1em;
  position: sticky;
  top: 2rem;
  width: auto;
  z-index: 999;

  ${media.md`
        padding: 0 2em;
    `}

  ${media.lg`
        padding: 0 4em;
    `}

    ${media.xl`
        height: 10rem;
    `}
`;

export const StyledNavigationItems = styled.nav`
  color: ${colors.white};
  display: none;
  font-size: 1rem;
  font-wight: 700;
  text-transform: uppercase;

  ${media.sm`
        display: block;
    `}

  ${media.md`
        font-size: 1.2rem;
    `}

    ${media.xl`
        font-size: 1.4rem;
    `}

    ul {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 40rem;

    ${media.md`
            width: 54rem;
        `}

    ${media.lg`
            width: 62rem;
        `}

        ${media.xl`
            width: 70rem;
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
  }
`;

export const StyledSandwichMenuContainer = styled.div`
  display: block;
  fill: ${colors.white};
  margin-left: 1em;
  transition: all 0.3s ease;

  &:hover,
  &:active,
  &:focus {
    cursor: pointer;
    fill: ${colors.yellow};
  }

  ${media.sm`
        display: none;
    `}
`;
