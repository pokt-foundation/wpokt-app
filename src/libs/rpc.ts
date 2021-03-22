export default function getRpcUrl(networkId: number): string | undefined {
  switch (networkId) {
    case 1:
      return process.env.REACT_APP_MAINNET_RPC;
    case 4:
    default:
      return process.env.REACT_APP_RINKEBY_RPC;
  }
}
