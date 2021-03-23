import React from 'react';
import { Signer, ContractTransaction } from 'ethers';

import { TOKEN_GEYSER_ADDRESS } from 'constants/index';
import useWallet from 'hooks/useWallet';
import { parseInputValue, stake } from 'utils';

type IModalType = '' | 'CONFIRM_DEPOSIT' | 'TRANSACTION_WAITING' | 'TRANSACTION_APPROVED' | 'TRANSACTION_REJECTED';

export interface ContextValues {
  displayValue: string;
  inputValue: string;
  onChangeInput: (amount: string) => string;
  onDeposit: () => Promise<boolean | ContractTransaction | undefined>;

  modalOpen: boolean;
  onCloseModal: () => void;
  onSelectModal: (modalType: IModalType) => void;
  selectedModal: IModalType;
}

export const DepositWithdrawalContext = React.createContext<ContextValues>({
  displayValue: '',
  inputValue: '',
  onChangeInput: (amount) => {
    return amount;
  },
  onDeposit: async () => undefined,

  modalOpen: false,
  onCloseModal: () => {
    return null;
  },
  onSelectModal: (modalType) => {
    return modalType;
  },
  selectedModal: '',
});

export const DepositWithdrawalProvider: React.FC = ({ children }) => {
  const { signer }: { signer: Signer | null } = useWallet();
  const [inputValue, setInputValue] = React.useState<string>('');
  const [displayValue, setDisplayValue] = React.useState<string>('');

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [selectedModal, setSelectedModal] = React.useState<IModalType>('');

  React.useEffect(() => {
    document.body.addEventListener('keyup', function (e) {
      if (e.key === 'Escape') {
        onCloseModal();
      }
    });

    return function cleanup() {
      document.body.removeEventListener('keyup', function (e) {
        if (e.key === 'Escape') {
          onCloseModal();
        }
      });
    };
  }, []);

  const onCloseModal = () => {
    setModalOpen(false);
  };

  const onSelectModal = (modalType: IModalType): void => {
    switch (modalType) {
      case 'CONFIRM_DEPOSIT':
        setModalOpen(true);
        setSelectedModal(modalType);
        break;
      case 'TRANSACTION_WAITING':
        setModalOpen(true);
        setSelectedModal(modalType);
        break;
      case 'TRANSACTION_APPROVED':
        setModalOpen(true);
        setSelectedModal(modalType);
        break;
      case 'TRANSACTION_REJECTED':
        setModalOpen(true);
        setSelectedModal(modalType);
        break;

      default:
        setModalOpen(false);
        break;
    }
  };

  const onChangeInput = (amount: string) => {
    setInputValue(amount);
    return amount;
  };

  const onDeposit = async (): Promise<boolean | ContractTransaction> => {
    if (signer) {
      setDisplayValue(inputValue);
      const response = await stake(parseInputValue(inputValue, 18).toString(), TOKEN_GEYSER_ADDRESS, signer);
      setInputValue('');
      if (typeof response === 'boolean') {
        return response;
      } else {
        onSelectModal('TRANSACTION_WAITING');
        const { status } = await response.wait();
        if (status === 1) {
          onSelectModal('TRANSACTION_APPROVED');
        } else {
          onSelectModal('TRANSACTION_REJECTED');
        }
      }
      return response;
    } else {
      return false;
    }
  };

  return (
    <DepositWithdrawalContext.Provider
      value={{
        displayValue,
        inputValue,
        onChangeInput,
        onDeposit,

        modalOpen,
        onCloseModal,
        onSelectModal,
        selectedModal,
      }}
    >
      {children}
    </DepositWithdrawalContext.Provider>
  );
};
