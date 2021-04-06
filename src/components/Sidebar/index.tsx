import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import 'styled-components/macro';
import { colors, GU } from 'components/theme';

import { ReactComponent as CloseSvg } from 'assets/icons/close.svg';
import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';

import { StyledCloseContainer, StyledLink, StyledNav, StyledSidebarBackground } from 'components/Sidebar/components';

interface ISidebar {
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  sidebar: boolean;
}
const Sidebar: React.FC<ISidebar> = ({ setSidebar, sidebar }) => {
  return (
    <StyledSidebarBackground active={sidebar}>
      <StyledCloseContainer onClick={() => setSidebar(false)}>
        <VisuallyHidden>Close</VisuallyHidden>
        <CloseSvg />
      </StyledCloseContainer>
      <StyledNav>
        <ul>
          <li>
            <div
              css={`
                height: ${5 * GU}px;
                width: ${5 * GU}px;
              `}
            >
              <SelectorSvg fill={window.location.pathname === '/propose' ? colors.yellow : 'transparent'} />
            </div>
            <StyledLink onClick={() => setSidebar(false)} exact activeClassName="active" to="/propose">
              Propose App
            </StyledLink>
          </li>
          <li>
            <div
              css={`
                height: ${5 * GU}px;
                width: ${5 * GU}px;
              `}
            >
              <SelectorSvg fill={window.location.pathname === '/new-farm' ? colors.yellow : 'transparent'} />
            </div>
            <StyledLink onClick={() => setSidebar(false)} exact activeClassName="active" to="/new-farm">
              New Farm
            </StyledLink>
          </li>
          <li>
            <div
              css={`
                height: ${5 * GU}px;
                width: ${5 * GU}px;
              `}
            >
              <SelectorSvg fill={window.location.pathname === '/stats' ? colors.yellow : 'transparent'} />
            </div>
            <StyledLink onClick={() => setSidebar(false)} exact activeClassName="active" to="/stats">
              Stats
            </StyledLink>
          </li>
          <li>
            <div
              css={`
                height: ${5 * GU}px;
                width: ${5 * GU}px;
              `}
            >
              <SelectorSvg fill={window.location.pathname === '/my-farms' ? colors.yellow : 'transparent'} />
            </div>
            <StyledLink onClick={() => setSidebar(false)} exact activeClassName="active" to="/my-farms">
              My Farms
            </StyledLink>
          </li>
        </ul>
      </StyledNav>
    </StyledSidebarBackground>
  );
};

export default Sidebar;
