export default function getRpcUrl(networkId: number): string | undefined {
  switch (networkId) {
    case 1:
      return process.env.REACT_APP_MAINNET_RPC;
    case 4:
      return process.env.REACT_APP_RINKEBY_RPC;
    case 42:
      return process.env.REACT_APP_KOVAN_RPC;
    default:
      return process.env.REACT_APP_RINKEBY_RPC;
  }
}
