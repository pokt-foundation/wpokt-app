import React from 'react';
import { ethers } from 'ethers';
import { API } from 'bnc-notify';
import { Web3Context } from 'contexts/Web3';
import { initOnboard, initNotify } from 'libs/connector';
import { Wallet, API as OnboardAPI } from 'libs/types';

// eslint-disable-next-line
let provider: any;

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

          if (wallet.name) {
            window.localStorage.setItem('selectedWallet', wallet.name);
          }
        } else {
          provider = null;
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

  //   async function sendHash() {
  //     if (!toAddress) {
  //       alert('An Ethereum address to send Eth to is required.');
  //       return;
  //     }

  //     const signer = getSigner(provider);

  //     const { hash } = await signer.sendTransaction({
  //       to: toAddress,
  //       value: 1000000000000000,
  //     });

  //     const { emitter } = notify.hash(hash);

  //     emitter.on('txPool', (transaction) => ({
  //       // message: `Your transaction is pending, click <a href="https://rinkeby.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
  //       // or you could use onclick for when someone clicks on the notification itself
  //       onclick: () => window.open(`https://rinkeby.etherscan.io/tx/${transaction.hash}`),
  //     }));

  //     emitter.on('txSent', console.log);
  //     emitter.on('txConfirmed', console.log);
  //     emitter.on('txSpeedUp', console.log);
  //     emitter.on('txCancel', console.log);
  //     emitter.on('txFailed', console.log);

  //     // emitter.on("all", event => {
  //     //   console.log("ALLLLLLL", event)
  //     // })
  //   }

  //   async function sendInternalTransaction() {
  //     if (!toAddress) {
  //       // eslint-disable-next-line no-alert
  //       alert('An Ethereum address to send Eth to is required.');
  //       return;
  //     }

  //     const { hash } = await internalTransferContract.internalTransfer(toAddress, {
  //       value: 1000000000000000,
  //     });

  //     const { emitter } = notify.hash(hash);

  //     emitter.on('txSent', console.log);
  //     emitter.on('txPool', console.log);
  //     emitter.on('txConfirmed', console.log);
  //     emitter.on('txSpeedUp', console.log);
  //     emitter.on('txCancel', console.log);
  //     emitter.on('txFailed', console.log);
  //   }

  //   async function sendTransaction() {
  //     if (!toAddress) {
  //       alert('An Ethereum address to send Eth to is required.');
  //     }

  //     const signer = getSigner(provider);

  //     const txDetails = {
  //       to: toAddress,
  //       value: 1000000000000000,
  //     };

  //     const sendTransaction = () => signer.sendTransaction(txDetails).then((tx: { hash: string; }) => tx.hash);

  //     const gasPrice = () => provider.getGasPrice().then((res: { toString: () => any; }) => res.toString());

  //     const estimateGas = () => provider.estimateGas(txDetails).then((res: { toString: () => any; }) => res.toString());

  //     const { emitter } = await notify.transaction({
  //       sendTransaction,
  //       gasPrice,
  //       estimateGas,
  //       balance: onboard?.getState().balance,
  //       txDetails,
  //     });

  //     emitter.on('txRequest', console.log);
  //     emitter.on('nsfFail', console.log);
  //     emitter.on('txRepeat', console.log);
  //     emitter.on('txAwaitingApproval', console.log);
  //     emitter.on('txConfirmReminder', console.log);
  //     emitter.on('txSendFail', console.log);
  //     emitter.on('txError', console.log);
  //     emitter.on('txUnderPriced', console.log);
  //     emitter.on('txSent', console.log);
  //     emitter.on('txPool', console.log);
  //     emitter.on('txConfirmed', console.log);
  //     emitter.on('txSpeedUp', console.log);
  //     emitter.on('txCancel', console.log);
  //     emitter.on('txFailed', console.log);
  //   }

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
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
