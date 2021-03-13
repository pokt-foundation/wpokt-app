import React from 'react';
import { ethers, Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { API } from 'bnc-notify';
import { Web3Context } from 'contexts/Web3';
import { initOnboard, initNotify } from 'libs/connector';
import getSigner from 'libs/signer';
import { Wallet, API as OnboardAPI } from 'libs/types';

let provider: Provider | null;
let signer: Signer | null;

export const Web3Provider: React.FC = ({ children }) => {
  const [address, setAddress] = React.useState(null);
  const [network, setNetwork] = React.useState(null);
  const [balance, setBalance] = React.useState(null);
  const [wallet, setWallet] = React.useState<Wallet | Record<string, never>>({});

  const [onboard, setOnboard] = React.useState<OnboardAPI | null>(null);
  const [notify, setNotify] = React.useState<API | null>(null);

  // const [toAddress, setToAddress] = React.useState('');

  React.useEffect(() => {
    const onboard = initOnboard({
      address: (setAddress as unknown) as (address: string) => void,
      network: (setNetwork as unknown) as (networkId: number) => void,
      balance: (setBalance as unknown) as (balance: string) => void,
      wallet: (wallet: Wallet) => {
        if (wallet.provider) {
          setWallet(wallet);

          const ethersProvider = new ethers.providers.Web3Provider(wallet.provider);

          provider = ethersProvider;
          signer = getSigner(ethersProvider);

          if (wallet.name) {
            window.localStorage.setItem('selectedWallet', wallet.name);
          }
        } else {
          provider = null;
          signer = null;
          setWallet({});
        }
      },
    });
    setOnboard(onboard);

    setNotify(initNotify());
  }, []);

  React.useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem('selectedWallet');

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
    }
  }, [onboard]);

  return (
    <Web3Context.Provider
      value={{
        address,
        network,
        balance,
        wallet,
        onboard,
        notify,
        provider,
        signer,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
