import React from 'react';
import { NavLink } from 'react-router-dom';
import 'styled-components/macro';
import { onboard } from 'libs/connector';

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

interface INavigation {
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: React.FC<INavigation> = ({ setSidebar }) => {
  const [address, setAddress] = React.useState<string>('');
  const onConnect = async () => {
    console.log('connect');
    await onboard.walletSelect();
    const checkResponse = await onboard.walletCheck();
    console.log('Ready to connect', checkResponse);
    const currentState = onboard.getState();
    console.log(currentState);
    setAddress(currentState.address);
  };

  return (
    <StyledNavigationContainer
      css={`
        background-image: url(${NavigationBarImage});
      `}
    >
      <NavLink exact activeClassName="active" to="/">
        <StyledLogoContainer>
          <LogoSvg />
        </StyledLogoContainer>
      </NavLink>
      <StyledNavigationItems>
        <ul>
          <li>
            <StyledLink exact activeClassName="active" to="/propose">
              Propose App
            </StyledLink>
          </li>
          <li>
            <StyledLink exact activeClassName="active" to="/new-farm">
              New Farm
            </StyledLink>
          </li>
          <li>
            <StyledLink exact activeClassName="active" to="/stats">
              Stats
            </StyledLink>
          </li>
          <li>
            <StyledLink exact activeClassName="active" to="/my-farm">
              My Farm
            </StyledLink>
          </li>
        </ul>
      </StyledNavigationItems>
      <Flex align={'center'}>
        <StyledConnectWalletButton onClick={onConnect}>
          {address === '' ? 'Connect' : `${address.slice(0, 5)}...`}
          <StyledMetaMaskImageContainer
            css={`
              background-image: url(${MetaMaskImage});
            `}
          />
        </StyledConnectWalletButton>
        <StyledSandwichMenuContainer onClick={() => setSidebar(true)}>
          <SandwichMenu />
        </StyledSandwichMenuContainer>
      </Flex>
    </StyledNavigationContainer>
  );
};

export default Navigation;
