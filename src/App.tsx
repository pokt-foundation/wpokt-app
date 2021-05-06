import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components/macro';
import type {} from 'styled-components/cssprop';
import { API as OnboardAPI } from 'libs/types';
import GlobalFonts from 'fonts/font';
import { GU } from 'components/theme';

import Footer from 'components/Footer';
import Modals from 'components/Modals';
import Navigation from 'components/Navigation';
import Sidebar from 'components/Sidebar';
import Wrapper from 'components/Wrapper';

import { Web3Context } from 'contexts/Web3';

import DepositWithdraw from 'views/DepositWithdraw';
import MyFarms from 'views/MyFarms';
import SalesInfo from 'views/SalesInfo';
import Stats from 'views/Stats';
import TermsOfUse from 'views/TermsOfUse';

const App: React.FC = () => {
  const { onboard, provider } = React.useContext(Web3Context);

  const [sidebar, setSidebar] = React.useState<boolean>(false);

  const readyToTransact = React.useCallback(async (onboard, provider): Promise<boolean> => {
    if (!provider) {
      const walletSelected = await onboard?.walletSelect();
      if (!walletSelected) return false;
    }

    const ready = await onboard?.walletCheck();
    return ready;
  }, []);

  const onConnectButton = React.useCallback(async (onboard: OnboardAPI | null, provider): Promise<boolean> => {
    if (!provider) {
      const walletSelected = await onboard?.walletSelect();
      if (!walletSelected) {
        return false;
      }
      const ready = onboard ? await onboard?.walletCheck() : false;
      return ready;
    } else {
      onboard?.walletReset();
      const walletSelected = await onboard?.walletSelect();
      if (!walletSelected) {
        return false;
      }
      const ready = onboard ? await onboard?.walletCheck() : false;
      return ready;
    }
  }, []);

  return (
    <>
      <GlobalFonts />
      <Wrapper>
        <Router>
          <Sidebar setSidebar={setSidebar} sidebar={sidebar} />
          <Navigation onConnectButton={() => onConnectButton(onboard, provider)} setSidebar={setSidebar} />
          <Switch>
            <Route exact path="/">
              <DepositWithdraw readyToTransact={readyToTransact} />
            </Route>
            <Route exact path="/sales-info">
              <SalesInfo />
            </Route>
            <Route exact path="/stats">
              <Stats />
            </Route>
            <Route exact path="/my-farms">
              <MyFarms />
            </Route>
            <Route exact path="/terms-of-use">
              <TermsOfUse />
            </Route>
          </Switch>
          <Footer />
          <Modals />
        </Router>
        <StyledReactTooltip id="custom-event" globalEventOff={'click'} event="click" />
      </Wrapper>
    </>
  );
};

export default App;

const StyledReactTooltip = styled(ReactTooltip)`
  max-width: ${GU * 50}px;
  &.type-dark {
    background: black;
    -webkit-box-shadow: inset 0px 0px 0px ${GU * 0.5}px #fff;
    -moz-box-shadow: inset 0px 0px 0px ${GU * 0.5}px #fff;
    box-shadow: inset 0px 0px 0px ${GU * 0.5}px #fff;
    font-size: 1rem;
    line-height: 15px;
    padding: ${GU * 5}px;
  }
  &.type-dark.place-top {
    opacity: 1;
    &:after {
      border-top-color: #fff;
    }
  }
  &.type-dark.place-bottom {
    opacity: 1;
    &:after {
      border-bottom-color: #fff;
    }
  }
  &.type-dark.place-right {
    opacity: 1;
    &:after {
      border-right-color: #fff;
    }
  }
  &.type-dark.place-left {
    opacity: 1;
    &:after {
      border-left-color: #fff;
    }
  }
`;
