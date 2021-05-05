import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'styled-components/macro';
import type {} from 'styled-components/cssprop';
import GlobalFonts from 'fonts/font';

import Footer from 'components/Footer';
import Modals from 'components/Modals';
import Navigation from 'components/Navigation';
import Sidebar from 'components/Sidebar';
import Wrapper from 'components/Wrapper';

import { Web3Context } from 'contexts/Web3';

import DepositWithdraw from 'views/DepositWithdraw';
import MyFarms from 'views/MyFarms';
import ProposeApp from 'views/ProposeApp';
import SalesInfo from 'views/SalesInfo';
import Stats from 'views/Stats';

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

  React.useEffect(() => {
    readyToTransact(onboard, provider);
  }, [onboard, provider, readyToTransact]);

  return (
    <>
      <GlobalFonts />
      <Wrapper>
        <Router>
          <Sidebar setSidebar={setSidebar} sidebar={sidebar} />
          <Navigation readyToTransact={() => readyToTransact(onboard, provider)} setSidebar={setSidebar} />
          <Switch>
            <Route exact path="/">
              <DepositWithdraw readyToTransact={readyToTransact} />
            </Route>
            <Route exact path="/propose-app">
              <ProposeApp />
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
          </Switch>
          <Footer />
          <Modals />
        </Router>
      </Wrapper>
    </>
  );
};

export default App;
