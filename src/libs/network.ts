export default function networkName(id: number | 'localhost') {
  switch (Number(id)) {
    case 1:
      return 'main';
    case 3:
      return 'ropsten';
    case 4:
      return 'rinkeby';
    case 5:
      return 'goerli';
    case 42:
      return 'kovan';
    default:
      return 'rinkeby';
  }
}
