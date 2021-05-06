import Onboard from 'bnc-onboard';
import getRpcUrl from 'libs/rpc';
import { Subscriptions, API as OnboardAPI } from 'libs/types';

const NETWORK_ID = 1;
const RPC_URL = getRpcUrl(NETWORK_ID);
const DAPP_ID = process.env.REACT_APP_ONBOARD_API_KEY;

export function initOnboard(subscriptions: Subscriptions): OnboardAPI {
  const onboard = Onboard;
  return onboard({
    dappId: DAPP_ID,
    hideBranding: false,
    networkId: NETWORK_ID,
    // darkMode: true,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask' },
        {
          walletName: 'ledger',
          rpcUrl: RPC_URL,
        },
        {
          walletName: 'trezor',
          appUrl: 'https://reactdemo.blocknative.com',
          email: 'aaron@blocknative.com',
          rpcUrl: RPC_URL,
        },
        {
          walletName: 'walletConnect',
          infuraKey: 'd5e29c9b9a9d4116a7348113f57770a8',
        },
        { walletName: 'authereum', disableNotifications: true },
        {
          walletName: 'lattice',
          appName: 'Onboard Demo',
          rpcUrl: RPC_URL,
        },
        { walletName: 'coinbase' },
        { walletName: 'status' },
        { walletName: 'walletLink', rpcUrl: RPC_URL },
        {
          walletName: 'portis',
          apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b',
        },
        { walletName: 'fortmatic', apiKey: 'pk_test_886ADCAB855632AA' },
        { walletName: 'torus' },
        { walletName: 'trust', rpcUrl: RPC_URL },
        { walletName: 'opera' },
        { walletName: 'operaTouch' },
        { walletName: 'imToken', rpcUrl: RPC_URL },
        { walletName: 'meetone' },
        { walletName: 'mykey', rpcUrl: RPC_URL },
        { walletName: 'wallet.io', rpcUrl: RPC_URL },
        { walletName: 'huobiwallet', rpcUrl: RPC_URL },
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
}
