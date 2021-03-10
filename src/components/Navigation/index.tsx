import React from 'react';
import { NavLink } from 'react-router-dom';
import 'styled-components/macro';

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

// Context
import { Web3Context } from 'contexts/Web3';

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
        <StyledConnectWalletButton onClick={readyToTransact}>
          {address ? `${address?.slice(0, 5)}...` : 'Connect'}
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
