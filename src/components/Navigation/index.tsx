import React from 'react';

// Assets
import { ReactComponent as LogoSvg } from 'assets/icons/logo.svg';
import MetaMaskImage from 'assets/images/metamask.png';
import NavigationBarImage from 'assets/images/navigation_bar_long.png';
import { ReactComponent as SandwichMenu } from 'assets/icons/sandwich_menu.svg';

// Components
import {
    ConnectWalletButton,
    LogoContainer,
    MetaMaskImageContainer,
    NavigationContainer,
    NavigationItems,
    SandwichMenuContainer,

} from './components';
import { Flex } from 'components/Containers';

const Navigation: React.FC = () => {
    return (
        <NavigationContainer style={{ backgroundImage: `url(${NavigationBarImage})` }}>
            <LogoContainer>
                <LogoSvg />
            </LogoContainer>
            <NavigationItems>
                <ul>
                    <li>Propose App</li>
                    <li>New Farm</li>
                    <li>Stats</li>
                    <li>My Farm</li>
                </ul>
            </NavigationItems>
            <Flex align={'center'}>
                <ConnectWalletButton>
                    Connect
                    <MetaMaskImageContainer style={{ backgroundImage: `url(${MetaMaskImage})` }} />
                </ConnectWalletButton>
                <SandwichMenuContainer>
                    <SandwichMenu />
                </SandwichMenuContainer>
            </Flex>
        </NavigationContainer>
    )
}

export default Navigation;
