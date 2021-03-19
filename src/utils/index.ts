import { ethers, ContractInterface, ContractTransaction, Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import ERC20ABI from 'abis/ERC20.json';
import TokenGeyserABI from 'abis/TokenGeyser.json';

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
    const transaction: ContractTransaction = await tokenContract.stake(stakeAmount, '0x');
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
