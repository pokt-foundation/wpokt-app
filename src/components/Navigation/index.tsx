import React from 'react';
import { NavLink } from 'react-router-dom';
import 'styled-components/macro';

import { ReactComponent as LogoSvg } from 'assets/icons/logo.svg';
import MetaMaskImage from 'assets/images/metamask.png';
import NavigationBarImage from 'assets/images/navigation_bar_long.png';
import { ReactComponent as SandwichMenu } from 'assets/icons/sandwich_menu.svg';

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

import { Web3Context } from 'contexts/Web3';

import { shortenAddress } from 'utils';

interface INavigation {
  readyToTransact: () => Promise<boolean | undefined>;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: React.FC<INavigation> = ({ readyToTransact, setSidebar }) => {
  const { address } = React.useContext(Web3Context);

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
        <StyledConnectWalletButton connected={address ? true : false} onClick={readyToTransact}>
          {address ? shortenAddress(address) : 'Connect'}
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
