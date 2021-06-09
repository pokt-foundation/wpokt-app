import React from 'react';
import { Signer } from 'ethers';

import { TOKEN_GEYSER_ADDRESS } from 'constants/index';

import { Web3Context } from 'contexts/Web3';

import { getTokenGeyserContract } from 'utils';

const RETRY_DELAY = 10000;

export interface ContextValues {
  // eslint-disable-next-line
  totalStaked?: any;
}

export const TotalStakedContext = React.createContext<ContextValues>({});

export const TotalStakedProvider: React.FC = ({ children }) => {
  const { address, signer } = React.useContext(Web3Context);
  const [totalStaked, setTotalStaked] = React.useState<string>();

  const fetchTotalStaked = React.useCallback(async (userAddress: string, signer: Signer) => {
    const geyserContract = getTokenGeyserContract(signer, TOKEN_GEYSER_ADDRESS as string);
    try {
      const balance = await geyserContract.totalStakedFor(userAddress);
      setTotalStaked(balance.toString());
    } catch (e) {
      console.error(e);
      setTotalStaked('0');
    }
  }, []);

  React.useEffect((): (() => void) => {
    if (address && signer) {
      fetchTotalStaked(address, signer);
      const refreshInterval = setInterval(() => fetchTotalStaked(address, signer), RETRY_DELAY);
      return () => clearInterval(refreshInterval);
    } else {
      setTotalStaked('0');
    }
    return () => null;
  }, [address, fetchTotalStaked, signer]);

  return (
    <TotalStakedContext.Provider
      value={{
        totalStaked,
      }}
    >
      {children}
    </TotalStakedContext.Provider>
  );
};
