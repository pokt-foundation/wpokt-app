import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';
import { colors, GU } from 'components/theme';

export const StyledCloseContainer = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  display: flex;
  fill: ${colors.white};
  justify-content: center;
  position: absolute;
  right: ${4 * GU}px;
  top: ${11 * GU}px;
  transition: all 0.3s ease;

  &:hover,
  &:active,
  &:focus {
    color: ${colors.yellow};
  }
`;

export const StyledLink = styled(NavLink)`
  color: ${colors.white};
  text-decoration: none;
  transition: all 0.3s ease;
  margin-left: ${5 * GU}px;

  &:focus {
    color: ${colors.yellow};
  }
  &.active {
    color: ${colors.yellow};
  }
`;

export const StyledNav = styled.nav`
  ul {
    color: ${colors.white};
    display: flex;
    flex-direction: column;
    font-size: ${4 * GU}px;
    height: ${37 * GU}px;
    justify-content: space-between;
    letter-spacing: 3px;
    margin-top: ${25 * GU}px;

    li {
      align-items: center;
      display: flex;
      justify-content: flex-start;
    }
  }
`;

interface IStyledSidebarBackground {
  active: boolean;
}

export const StyledSidebarBackground = styled.div<IStyledSidebarBackground>`
  align-items: flex-start;
  background: rgba(0, 0, 0, 0.95);
  display: none;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;

  ${(props) =>
    props.active &&
    css`
      display: flex;
    `}

  ${media.sm`
    display: none;
  `}
`;
