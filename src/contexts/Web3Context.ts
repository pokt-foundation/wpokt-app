import React from 'react';
import { API } from 'bnc-notify';
import { API as OnboardAPI, Wallet } from 'libs/types';

export interface ContextValues {
  address: string | null;
  network: number | null;
  // eslint-disable-next-line
  balance: any;
  onboard: OnboardAPI | null;
  // eslint-disable-next-line
  provider: any;
  wallet: Wallet | Record<string, never>;
  notify: API | null;
}

export const Web3Context = React.createContext<ContextValues>({
  address: '',
  network: 1,
  balance: '',
  onboard: null,
  provider: null,
  wallet: {},
  notify: null,
});
