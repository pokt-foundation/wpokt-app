import { ethers, ContractInterface, ContractTransaction, Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { API } from 'bnc-notify';
import BigNumber from 'utils/bignumber';
import ERC20ABI from 'abis/ERC20.json';
import TokenGeyserABI from 'abis/TokenGeyser.json';

export const bnToDec = (bn: BigNumber, decimals = 18): number => {
  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber();
};

export const decToBn = (dec: number, decimals = 18): BigNumber => {
  return new BigNumber(dec).multipliedBy(new BigNumber(10).pow(decimals));
};

/**
 * Shorten an Ethereum address. `charsLength` allows to change the number of
 * characters on both sides of the ellipsis.
 *
 * Examples:
 *   shortenAddress('0x19731977931271')    // 0x1973…1271
 *   shortenAddress('0x19731977931271', 2) // 0x19…71
 *   shortenAddress('0x197319')            // 0x197319 (already short enough)
 *
 * @param {string} address The address to shorten
 * @param {number} [charsLength=4] The number of characters to change on both sides of the ellipsis
 * @returns {string} The shortened address
 */
export function shortenAddress(address: string, charsLength = 4): string {
  const prefixLength = 2; // "0x"
  if (!address) {
    return '';
  }
  if (address.length < charsLength * 2 + prefixLength) {
    return address;
  }
  return address.slice(0, charsLength + prefixLength) + '…' + address.slice(-charsLength);
}

export const getERC20Contract = (signerOrProvider: Signer | Provider, address: string): ethers.Contract => {
  const contract = new ethers.Contract(address, (ERC20ABI as unknown) as ContractInterface, signerOrProvider);

  return contract;
};

export const getTokenGeyserContract = (signer: Signer, address: string): ethers.Contract => {
  const contract = new ethers.Contract(address, (TokenGeyserABI as unknown) as ContractInterface, signer);

  return contract;
};

export const stake = async (
  stakeAmount: string,
  tokenAddress: string,
  signer: Signer,
): Promise<boolean | ContractTransaction> => {
  try {
    const tokenContract = getTokenGeyserContract(signer, tokenAddress);
    const response: ContractTransaction = await tokenContract.stake(stakeAmount, '0x');
    return response;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const approve = async (spenderAddress: string, tokenAddress: string, signer: Signer): Promise<boolean> => {
  try {
    const tokenContract = getERC20Contract(signer, tokenAddress);
    const transaction: ContractTransaction = await tokenContract.approve(spenderAddress, ethers.constants.MaxUint256);
    console.log(transaction);
    const { status } = await transaction.wait();
    if (status === 1) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getAllowance = async (
  userAddress: string,
  spenderAddress: string,
  tokenAddress: string,
  provider: Provider,
): Promise<string> => {
  try {
    const tokenContract = getERC20Contract(provider, tokenAddress);
    const balance = await tokenContract.allowance(userAddress, spenderAddress);
    return balance.toString();
  } catch (e) {
    console.error(e);
    return '0';
  }
};

export const getNotification = (notify: API, response: ContractTransaction): void => {
  const { emitter } = notify.hash(response.hash);
  emitter.on('txPool', (transaction) => {
    return {
      // message: `Your transaction is pending, click <a href="https://rinkeby.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
      // or you could use onclick for when someone clicks on the notification itself
      onclick: () => window.open(`https://rinkeby.etherscan.io/tx/${transaction.hash}`),
    };
  });

  emitter.on('txSent', console.log);
  emitter.on('txConfirmed', console.log);
  emitter.on('txSpeedUp', console.log);
  emitter.on('txCancel', console.log);
  emitter.on('txFailed', console.log);
};
