import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'styled-components/macro';
import type {} from 'styled-components/cssprop';
import GlobalFonts from 'fonts/font';
import { GU } from 'components/theme';

import Modals from 'components/Modals';
import Navigation from 'components/Navigation';
import Sidebar from 'components/Sidebar';
import Wrapper from 'components/Wrapper';

import { Web3Context } from 'contexts/Web3';

import Deposit from 'views/Deposit';

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
              <Deposit readyToTransact={readyToTransact} />
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
      <Modals />
    </>
  );
};

export default App;
