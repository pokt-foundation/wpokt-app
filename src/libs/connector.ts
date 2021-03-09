import Onboard from 'bnc-onboard';
import Web3 from 'web3';
import Notify, { API } from 'bnc-notify';
import getRpcUrl from 'libs/rpc';

const networkId = 4;
const rpcUrl = getRpcUrl(networkId);
const dappId = process.env.ONBOARD_API_KEY;

let web3;

export const onboard = Onboard({
  dappId: process.env.ONBOARD_API_KEY, // [String] The API key created by step one above
  networkId: 4, // [Integer] The Ethereum network ID your Dapp uses.
  subscriptions: {
    wallet: (wallet) => {
      // eslint-disable-next-line
      web3 = new Web3(wallet.provider);
    },
  },
  walletSelect: {
    wallets: [
      { walletName: 'metamask' },
      {
        walletName: 'trezor',
        appUrl: 'https://reactdemo.blocknative.com',
        email: 'aaron@blocknative.com',
        rpcUrl,
      },
      {
        walletName: 'ledger',
        rpcUrl,
      },
      { walletName: 'authereum', disableNotifications: true },
      {
        walletName: 'lattice',
        appName: 'Onboard Demo',
        rpcUrl,
      },
      { walletName: 'coinbase' },
      { walletName: 'status' },
      { walletName: 'walletLink', rpcUrl },
      {
        walletName: 'portis',
        apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b',
      },
      { walletName: 'fortmatic', apiKey: 'pk_test_886ADCAB855632AA' },
      { walletName: 'torus' },
      { walletName: 'trust', rpcUrl },
      {
        walletName: 'walletConnect',
        infuraKey: 'd5e29c9b9a9d4116a7348113f57770a8',
      },
      { walletName: 'opera' },
      { walletName: 'operaTouch' },
      { walletName: 'imToken', rpcUrl },
      { walletName: 'meetone' },
      { walletName: 'mykey', rpcUrl },
      { walletName: 'wallet.io', rpcUrl },
      { walletName: 'huobiwallet', rpcUrl },
      { walletName: 'hyperpay' },
      { walletName: 'atoken' },
      { walletName: 'liquality' },
    ],
  },
  walletCheck: [
    { checkName: 'derivationPath' },
    { checkName: 'connect' },
    { checkName: 'accounts' },
    { checkName: 'network' },
    { checkName: 'balance', minimumBalance: '100000' },
  ],
});

export function initNotify(): API {
  const notify = Notify;
  return notify({
    dappId,
    networkId,
  });
}
