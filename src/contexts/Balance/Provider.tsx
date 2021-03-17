import React from 'react';
import { Provider } from '@ethersproject/abstract-provider';

import { WPOKT_ADDRESS } from 'constants/index';

import { Web3Context } from 'contexts/Web3';
import { BalanceContext } from './Context';

import { getERC20Contract } from 'utils';

export const BalanceProvider: React.FC = ({ children }) => {
  const { address, provider } = React.useContext(Web3Context);
  const [wpoktBalance, setWpoktBalance] = React.useState<string>();

  const getBalance = async (provider: Provider, tokenAddress: string, userAddress: string): Promise<string> => {
    const tokenContract = getERC20Contract(provider, tokenAddress);
    try {
      const balance = await tokenContract.balanceOf(userAddress);
      return balance.toString();
    } catch (e) {
      console.error(e);
      return '0';
    }
  };

  const fetchBalances = React.useCallback(async (userAddress: string, provider: Provider) => {
    const balance = await getBalance(provider, WPOKT_ADDRESS as string, userAddress);
    setWpoktBalance(balance);
  }, []);

  React.useEffect((): (() => void) => {
    if (address && provider) {
      fetchBalances(address, provider);
      const refreshInterval = setInterval(() => fetchBalances(address, provider), 10000);
      return () => clearInterval(refreshInterval);
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
