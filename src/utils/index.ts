import { ethers, ContractInterface, ContractTransaction } from 'ethers';
import BigNumber from 'utils/bignumber';
import ERC20ABI from 'abis/ERC20.json';
import TokenGeyserABI from 'abis/TokenGeyser.json';

interface TransactionReceipt {
  status: boolean;
}

export const bnToDec = (bn: BigNumber, decimals = 18): number => {
  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber();
};

export const decToBn = (dec: number, decimals = 18): BigNumber => {
  return new BigNumber(dec).multipliedBy(new BigNumber(10).pow(decimals));
};

// eslint-disable-next-line
export const getERC20Contract = (provider: any, address: string) => {
  const contract = new ethers.Contract(address, (ERC20ABI as unknown) as ContractInterface, provider);

  return contract;
};

export const getTokenGeyserContract = (provider: any, address: string) => {
  const contract = new ethers.Contract(address, (TokenGeyserABI as unknown) as ContractInterface, provider);

  return contract;
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// eslint-disable-next-line
export const waitTransaction = async (provider: any, txHash: string): Promise<boolean> => {
  let txReceipt: TransactionReceipt | null = null;
  while (txReceipt === null) {
    const r = await provider.getTransactionReceipt(txHash);
    txReceipt = r;
    await sleep(2000);
  }
  return txReceipt.status;
};

export const approve = async (
  approvalAmount: string,
  spenderAddress: string,
  tokenAddress: string,
  // eslint-disable-next-line
  provider: any,
): Promise<boolean> => {
  try {
    const tokenContract = getERC20Contract(provider, tokenAddress);
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
    console.log(e);
    return false;
  }
};

export const getAllowance = async (
  userAddress: string,
  spenderAddress: string,
  tokenAddress: string,
  // eslint-disable-next-line
  provider: any,
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
