// eslint-disable-next-line
export default function getSigner(provider: { getSigner: () => any }): any {
  const signer = provider.getSigner();
  return signer;
}
