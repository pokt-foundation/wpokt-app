import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'styled-components/macro';
import type {} from 'styled-components/cssprop';
import GlobalFonts from 'fonts/font';
import { GU } from 'components/theme';

// Components
import Navigation from 'components/Navigation';
import Sidebar from 'components/Sidebar';
import Wrapper from 'components/Wrapper';

// Context
import { Web3Context } from 'contexts/Web3';

// Views
import Deposit from 'views/Deposit';

const App: React.FC = () => {
  // Context
  const {
    address,
    network,
    balance,
    onboard,
    provider,
    // wallet,
    // notify
  } = React.useContext(Web3Context);

  // State
  const [sidebar, setSidebar] = React.useState<boolean>(false);

  async function readyToTransact() {
    console.log(`
      ${address}
      ${network}
      ${balance}
    `);
    if (!provider) {
      const walletSelected = await onboard?.walletSelect();
      if (!walletSelected) return false;
    }

    const ready = await onboard?.walletCheck();
    return ready;
  }
  return (
    <Wrapper>
      <GlobalFonts />
      <Router>
        <Sidebar setSidebar={setSidebar} sidebar={sidebar} />
        <Navigation readyToTransact={readyToTransact} setSidebar={setSidebar} />
        <Switch>
          <Route exact path="/">
            <Deposit />
          </Route>
          <Route exact path="/propose">
            <div
              css={`
                align-items: center;
                display: flex;
                height: 100vh;
                justify-content: center;
                width: 100%;
              `}
            >
              <div
                css={`
                  align-items: center;
                  background: white;
                  display: flex;
                  height: ${12 * GU}px;
                  justify-content: center;
                  text-align: center;
                  width: ${50 * GU}px;
                `}
              >
                Propose App
              </div>
            </div>
          </Route>
          <Route exact path="/new-farm">
            <div
              css={`
                align-items: center;
                display: flex;
                height: 100vh;
                justify-content: center;
                width: 100%;
              `}
            >
              <div
                css={`
                  align-items: center;
                  background: white;
                  display: flex;
                  height: ${12 * GU}px;
                  justify-content: center;
                  text-align: center;
                  width: ${50 * GU}px;
                `}
              >
                New Farm
              </div>
            </div>
          </Route>
          <Route exact path="/stats">
            <div
              css={`
                align-items: center;
                display: flex;
                height: 100vh;
                justify-content: center;
                width: 100%;
              `}
            >
              <div
                css={`
                  align-items: center;
                  background: white;
                  display: flex;
                  height: ${12 * GU}px;
                  justify-content: center;
                  text-align: center;
                  width: ${50 * GU}px;
                `}
              >
                Stats
              </div>
            </div>
          </Route>
          <Route exact path="/my-farm">
            <div
              css={`
                align-items: center;
                display: flex;
                height: 100vh;
                justify-content: center;
                width: 100%;
              `}
            >
              <div
                css={`
                  align-items: center;
                  background: white;
                  display: flex;
                  height: ${12 * GU}px;
                  justify-content: center;
                  text-align: center;
                  width: ${50 * GU}px;
                `}
              >
                My Farm
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
};

export default App;
