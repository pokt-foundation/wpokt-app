import { ethers, ContractInterface } from 'ethers';
import BigNumber from 'utils/bignumber';
import ERC20ABI from 'abis/ERC20.json';

interface TransactionReceipt {
  status: boolean;
}

export const bnToDec = (bn: BigNumber, decimals = 18): number => {
  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber();
};

// eslint-disable-next-line
export const getERC20Contract = (provider: any, address: string) => {
  const contract = new ethers.Contract(address, (ERC20ABI.abi as unknown) as ContractInterface, provider);

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
  userAddress: string,
  spenderAddress: string,
  tokenAddress: string,
  // eslint-disable-next-line
  provider: any,
  onTxHash?: (txHash: string) => void,
): Promise<boolean> => {
  try {
    const tokenContract = getERC20Contract(provider, tokenAddress);
    return (
      tokenContract
        .approve(spenderAddress, ethers.constants.MaxUint256)
        // eslint-disable-next-line
      .send({ from: userAddress, gas: 80000 }, async (error: any, txHash: string) => {
          if (error) {
            console.log('ERC20 could not be approved', error);
            onTxHash && onTxHash('');
            return false;
          }
          if (onTxHash) {
            onTxHash(txHash);
          }
          const status = await waitTransaction(provider, txHash);
          if (!status) {
            console.log('Approval transaction failed.');
            return false;
          }
          return true;
        })
    );
  } catch (e) {
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
