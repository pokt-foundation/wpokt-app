import { ethers, ContractInterface, ContractTransaction, Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import BigNumber from 'utils/bignumber';
import ERC20ABI from 'abis/ERC20.json';
import TokenGeyserABI from 'abis/TokenGeyser.json';

export const bnToDec = (bn: BigNumber, decimals = 18): number => {
  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber();
};

export const decToBn = (dec: number, decimals = 18): BigNumber => {
  return new BigNumber(dec).multipliedBy(new BigNumber(10).pow(decimals));
};

export const getERC20Contract = (signerOrProvider: Signer | Provider, address: string): ethers.Contract => {
  const contract = new ethers.Contract(address, (ERC20ABI as unknown) as ContractInterface, signerOrProvider);

  return contract;
};

export const getTokenGeyserContract = (signer: Signer, address: string): ethers.Contract => {
  const contract = new ethers.Contract(address, (TokenGeyserABI as unknown) as ContractInterface, signer);

  return contract;
};

export const stake = async (stakeAmount: string, tokenAddress: string, signer: Signer): Promise<boolean> => {
  try {
    const tokenContract = getTokenGeyserContract(signer, tokenAddress);
    return tokenContract.stake(stakeAmount, '0x').then((response: ContractTransaction) => {
      response.wait();
      console.log(response);
      return true;
    });
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const approve = async (
  approvalAmount: string,
  spenderAddress: string,
  tokenAddress: string,
  signer: Signer,
): Promise<boolean> => {
  try {
    const tokenContract = getERC20Contract(signer, tokenAddress);
    return (
      tokenContract
        // .approve(spenderAddress, ethers.constants.MaxUint256)
        .approve(spenderAddress, approvalAmount)
        .then((response: ContractTransaction) => {
          response.wait();
          console.log(response);
          return true;
        })
    );
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
    const balance: BigNumber = await tokenContract.allowance(userAddress, spenderAddress);
    return balance.toString();
  } catch (e) {
    console.error(e);
    return '0';
  }
};
