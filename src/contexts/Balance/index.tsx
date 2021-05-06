import React from 'react';
import { Provider } from '@ethersproject/abstract-provider';

import { WPOKT_ADDRESS } from 'constants/index';

import { Web3Context } from 'contexts/Web3';

import { getERC20Contract } from 'utils';

export interface ContextValues {
  // eslint-disable-next-line
  wpoktBalance?: any;
}

export const BalanceContext = React.createContext<ContextValues>({});

export const BalanceProvider: React.FC = ({ children }) => {
  const { address, provider } = React.useContext(Web3Context);
  const [wpoktBalance, setWpoktBalance] = React.useState<string>();

  const fetchBalances = React.useCallback(async (userAddress: string, provider: Provider) => {
    const tokenContract = getERC20Contract(provider, WPOKT_ADDRESS as string);
    try {
      const balance = await tokenContract.balanceOf(userAddress);
      setWpoktBalance(balance.toString());
    } catch (e) {
      console.error(e);
      setWpoktBalance('0');
    }
  }, []);

  React.useEffect((): (() => void) => {
    if (address && provider) {
      fetchBalances(address, provider);
      const refreshInterval = setInterval(() => fetchBalances(address, provider), 10000);
      return () => clearInterval(refreshInterval);
    } else {
      setWpoktBalance('0');
    }
    return () => null;
  }, [address, fetchBalances, provider]);

  return (
    <BalanceContext.Provider
      value={{
        wpoktBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
