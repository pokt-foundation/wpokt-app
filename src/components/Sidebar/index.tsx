import React from 'react';
import { colors } from 'components/theme';

// Assets
import { ReactComponent as CloseSvg } from 'assets/icons/close.svg';
import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';

import { StyledCloseContainer, StyledLink, StyledNav, StyledSidebarBackground } from './components';

interface ISidebar {
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  sidebar: boolean;
}
const Sidebar: React.FC<ISidebar> = ({ setSidebar, sidebar }) => {
  return (
    <StyledSidebarBackground active={sidebar}>
      <StyledCloseContainer onClick={() => setSidebar(false)}>
        <CloseSvg />
      </StyledCloseContainer>
      <StyledNav>
        <ul>
          <li>
            <div style={{ height: '22px', width: '22px' }}>
              <SelectorSvg fill={window.location.pathname === '/propose' ? colors.yellow : 'transparent'} />
            </div>
            <StyledLink onClick={() => setSidebar(false)} exact activeClassName="active" to="/propose">
              Propose App
            </StyledLink>
          </li>
          <li>
            <div style={{ height: '22px', width: '22px' }}>
              <SelectorSvg fill={window.location.pathname === '/new-farm' ? colors.yellow : 'transparent'} />
            </div>
            <StyledLink onClick={() => setSidebar(false)} exact activeClassName="active" to="/new-farm">
              New Farm
            </StyledLink>
          </li>
          <li>
            <div style={{ height: '22px', width: '22px' }}>
              <SelectorSvg fill={window.location.pathname === '/stats' ? colors.yellow : 'transparent'} />
            </div>
            <StyledLink onClick={() => setSidebar(false)} exact activeClassName="active" to="/stats">
              Stats
            </StyledLink>
          </li>
          <li>
            <div style={{ height: '22px', width: '22px' }}>
              <SelectorSvg fill={window.location.pathname === '/my-farm' ? colors.yellow : 'transparent'} />
            </div>
            <StyledLink onClick={() => setSidebar(false)} exact activeClassName="active" to="/my-farm">
              My Farm
            </StyledLink>
          </li>
        </ul>
      </StyledNav>
    </StyledSidebarBackground>
  );
};

export default Sidebar;
