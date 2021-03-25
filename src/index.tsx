import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BalanceProvider } from 'contexts/Balance';
import { DepositWithdrawalProvider } from 'contexts/DepositWithdrawal';
import { Web3Provider } from 'contexts/Web3';

ReactDOM.render(
  <React.StrictMode>
    <Web3Provider>
      <BalanceProvider>
        <DepositWithdrawalProvider>
          <App />
        </DepositWithdrawalProvider>
      </BalanceProvider>
    </Web3Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
