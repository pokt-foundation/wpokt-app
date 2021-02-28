import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';
import { colors } from 'components/theme';

// Assets
import { ReactComponent as CloseSvg } from 'assets/icons/close.svg';
import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';

interface ISidebar {
    setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    sidebar: boolean;
}
const Sidebar: React.FC<ISidebar> = ({
    setSidebar,
    sidebar,
}) => {
    return (
        <StyledSidebarBackground active={sidebar}>
            <StyledCloseContainer onClick={() => setSidebar(false)}>
                <CloseSvg />
            </StyledCloseContainer>
            <StyledNav>
                <ul>
                <li>
                    <SelectorSvg fill={window.location.pathname === '/propose' ? colors.yellow : 'transparent'} />
                    <StyledLink onClick={() => setSidebar(false)} exact activeClassName='active' to='/propose'>
                        Propose App
                    </StyledLink>
                </li>
                <li>
                    <SelectorSvg fill={window.location.pathname === '/new-farm' ? colors.yellow : 'transparent'} />
                    <StyledLink onClick={() => setSidebar(false)} exact activeClassName='active' to='/new-farm'>
                        New Farm
                    </StyledLink>
                </li>
                <li>
                    <SelectorSvg fill={window.location.pathname === '/stats' ? colors.yellow : 'transparent'} />
                    <StyledLink onClick={() => setSidebar(false)} exact activeClassName='active' to='/stats'>
                        Stats
                    </StyledLink>
                </li>
                <li>
                    <SelectorSvg fill={window.location.pathname === '/my-farm' ? colors.yellow : 'transparent'} />
                    <StyledLink onClick={() => setSidebar(false)} exact activeClassName='active' to='/my-farm'>
                        My Farm
                    </StyledLink>
                </li>
                </ul>
            </StyledNav>
        </StyledSidebarBackground>
    )
}

export default Sidebar;

const StyledCloseContainer = styled.div`
    fill: ${colors.white};
    position: absolute;
    right: 20px;
    top: 40px;
    transition: all .3s ease;

    &:hover,
    &:active,
    &:focus {
        color: ${colors.yellow};
    }
`;

export const StyledLink = styled(NavLink)`
    color: ${colors.white};
    text-decoration: none;
    transition: all .3s ease;
    margin-left: 1em;

    &:focus {
        color: ${colors.yellow};
    }
    &.active {
        color: ${colors.yellow};
    }
`;

const StyledNav = styled.nav`
    ul {
        color: ${colors.white};
        display: flex;
        flex-direction: column;
        font-size: 18px;
        height: 150px;
        justify-content: space-between;
        letter-spacing: 3px;
        margin-top: 100px;

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
  
const StyledSidebarBackground = styled.div<IStyledSidebarBackground>`
    align-items: flex-start;
    background: rgba(0, 0, 0, 0.9);
    display: none;
    height: 100%;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;

    ${props => props.active && css`
        display: flex;
    `}

    ${media.sm`
        display: none;
    `}
`;