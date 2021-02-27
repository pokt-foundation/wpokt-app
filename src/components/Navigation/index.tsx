import React from 'react';
import { NavLink } from 'react-router-dom';

// Assets
import { ReactComponent as LogoSvg } from 'assets/icons/logo.svg';
import MetaMaskImage from 'assets/images/metamask.png';
import NavigationBarImage from 'assets/images/navigation_bar_long.png';
import { ReactComponent as SandwichMenu } from 'assets/icons/sandwich_menu.svg';

// Components
import {
    StyledLink,
    StyledConnectWalletButton,
    StyledLogoContainer,
    StyledMetaMaskImageContainer,
    StyledNavigationContainer,
    StyledNavigationItems,
    StyledSandwichMenuContainer,

} from './components';
import { Flex } from 'components/Containers';

const Navigation: React.FC = () => {
    return (
        <StyledNavigationContainer style={{ backgroundImage: `url(${NavigationBarImage})` }}>
            <NavLink exact activeClassName='active' to='/'>
                <StyledLogoContainer>
                    <LogoSvg />
                </StyledLogoContainer>
            </NavLink>
            <StyledNavigationItems>
                <ul>
                    <li>
                        <StyledLink exact activeClassName='active' to='/propose'>
                            Propose App
                        </StyledLink>
                    </li>
                    <li>
                        <StyledLink exact activeClassName='active' to='/new-farm'>
                            New Farm
                        </StyledLink>
                    </li>
                    <li>
                        <StyledLink exact activeClassName='active' to='/stats'>
                            Stats
                        </StyledLink>
                    </li>
                    <li>
                        <StyledLink exact activeClassName='active' to='/my-farm'>
                            My Farm
                        </StyledLink>
                    </li>
                </ul>
            </StyledNavigationItems>
            <Flex align={'center'}>
                <StyledConnectWalletButton>
                    Connect
                    <StyledMetaMaskImageContainer style={{ backgroundImage: `url(${MetaMaskImage})` }} />
                </StyledConnectWalletButton>
                <StyledSandwichMenuContainer>
                    <SandwichMenu />
                </StyledSandwichMenuContainer>
            </Flex>
        </StyledNavigationContainer>
    )
}

export default Navigation;
