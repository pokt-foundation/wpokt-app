import React from 'react';
import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { API as OnboardAPI, Wallet } from 'libs/types';

import { Web3Context } from 'contexts/Web3';

export interface ContextValues {
  address: string | null;
  network: number | null;
  // eslint-disable-next-line
  balance: any;
  onboard: OnboardAPI | null;
  wallet: Wallet | Record<string, never>;
  provider: Provider | null;
  signer: Signer | null;
}

// eslint-disable-next-line
const useWallet = (): any => {
  return { ...React.useContext(Web3Context) };
};

export default useWallet;
