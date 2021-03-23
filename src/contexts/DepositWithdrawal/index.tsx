import React from 'react';
import { Signer, ContractTransaction } from 'ethers';

import { TOKEN_GEYSER_ADDRESS } from 'constants/index';

import useWallet from 'hooks/useWallet';

import { parseInputValue, stake } from 'utils';

export interface ContextValues {
  inputValue: string;
  onChangeInput: (amount: string) => string;
  onDeposit: () => Promise<boolean | ContractTransaction | undefined>;
}

export const DepositWithdrawalContext = React.createContext<ContextValues>({
  inputValue: '',
  onChangeInput: (amount) => {
    return amount;
  },
  onDeposit: async () => undefined,
});

export const DepositWithdrawalProvider: React.FC = ({ children }) => {
  const { signer }: { signer: Signer | null } = useWallet();
  const [inputValue, setInputValue] = React.useState<string>('');

  const onChangeInput = (amount: string) => {
    setInputValue(amount);
    return amount;
  };

  const onDeposit = async (): Promise<boolean | ContractTransaction> => {
    if (signer) {
      const response = await stake(parseInputValue(inputValue, 18).toString(), TOKEN_GEYSER_ADDRESS, signer);
      console.log(response);
      setInputValue('');
      return response;
    } else {
      return false;
    }
  };

  return (
    <DepositWithdrawalContext.Provider
      value={{
        inputValue,
        onChangeInput,
        onDeposit,
      }}
    >
      {children}
    </DepositWithdrawalContext.Provider>
  );
};
