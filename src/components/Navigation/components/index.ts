import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { media } from 'components/breakpoints';
import { colors, GU } from 'components/theme';

interface IStyledConnectWalletButton {
  connected: boolean;
}
export const StyledConnectWalletButton = styled.button<IStyledConnectWalletButton>`
  align-items: center;
  background: transparent;
  border: ${0.5 * GU}px solid ${colors.white};
  box-sizing: border-box;
  color: ${colors.white};
  display: flex;
  font-family: PixelSplitter;
  font-size: 0.8rem;
  height: ${9 * GU}px;
  justify-content: space-around;
  letter-spacing: 3px;
  transition: all 0.3s ease;
  width: ${27 * GU}px;

  &:hover,
  &:active,
  &:focus {
    border: ${0.5 * GU}px solid ${colors.yellow};
    color: ${colors.yellow};
    cursor: pointer;
  }

  ${media.xs`
    font-size: 1rem;
    width: ${38 * GU}px;
  `}

  ${media.sm`
    width: ${32 * GU}px;
  `}

  ${media.md`
    font-size: 1.2rem;
    letter-spacing: 5px;
    width: ${43 * GU}px;
  `}

  ${media.lg`
    letter-spacing: 6px;
    height: ${11 * GU}px;
    width: ${50 * GU}px;
  `}

  ${media.xl`
    border: ${GU}px solid ${colors.white};
    font-size: 1.4rem;
    height: ${13 * GU}px;
    width: ${56 * GU}px;
  `}

  ${(props) =>
    props.connected &&
    css`
      ${media.xs`
        font-size: 0.8rem;
      `}

      ${media.md`
        font-size: 0.9rem;
      `}

      ${media.xl`
        font-size: 1.1rem;
      `}
    `}
`;

export const StyledLink = styled(NavLink)`
  color: ${colors.white};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: ${colors.yellow};
  }
  &:focus {
    color: ${colors.yellow};
  }
  &.active {
    color: ${colors.yellow};
  }
`;

export const StyledLogoContainer = styled.div`
  fill: ${colors.white};
  height: ${5 * GU}px;
  transition: all 0.3s ease;
  width: ${25 * GU}px;

  &:hover {
    cursor: pointer;
    fill: ${colors.yellow};
  }

  ${media.xs`
    height: ${7 * GU}px;
    width: ${37 * GU}px;
  `}

  ${media.lg`
    height: ${9 * GU}px;
    width: ${50 * GU}px;
  `}

  ${media.xl`
    height: ${10 * GU}px;
    width: ${56 * GU}px;
  `}
`;

export const StyledMetaMaskImageContainer = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: ${3 * GU}px;
  width: ${3 * GU}px;

  ${media.xs`
    height: ${5 * GU}px;
    width: ${5 * GU}px;
  `}

  ${media.md`
    height: ${6 * GU}px;
    width: ${6 * GU}px;
  `}

  ${media.lg`
    height: ${7 * GU}px;
    width: ${7 * GU}px;
  `}

  ${media.xl`
    height: ${8 * GU}px;
    width: ${8 * GU}px;
  `}
`;

export const StyledNavigationContainer = styled.div`
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  height: ${20 * GU}px;
  justify-content: space-between;
  padding: 0 ${4 * GU}px;
  position: sticky;
  top: ${5 * GU}px;
  width: auto;
  z-index: 999;

  ${media.md`
    padding: 0 ${5 * GU}px;
  `}

  ${media.lg`
    padding: 0 ${10 * GU}px;
  `}

  ${media.xl`
    height: ${25 * GU}px;
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
    width: ${100 * GU}px;

    ${media.md`
      width: ${135 * GU}px;
    `}

    ${media.lg`
      width: ${155 * GU}px;
    `}

    ${media.xl`
      width: ${175 * GU}px;
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

export const StyledSandwichMenuContainer = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  display: flex;
  fill: ${colors.white};
  justify-content: center;
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
