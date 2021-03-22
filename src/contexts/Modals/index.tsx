import React from 'react';

type IModalType = '' | 'CONFIRM_DEPOSIT';
export interface ContextValues {
  modalOpen: boolean;
  onCloseModal: () => void;
  onSelectModal: (modalType: IModalType) => void;
  selectedModal: IModalType;
}

export const ModalsContext = React.createContext<ContextValues>({
  modalOpen: false,
  onCloseModal: () => {
    return null;
  },
  onSelectModal: (modalType) => {
    return modalType;
  },
  selectedModal: '',
});

export const ModalsProvider: React.FC = ({ children }) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [selectedModal, setSelectedModal] = React.useState<IModalType>('');

  React.useEffect(() => {
    document.body.addEventListener('keydown', onCloseModal);

    return function cleanup() {
      document.body.removeEventListener('keydown', onCloseModal);
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

      default:
        setModalOpen(false);
        break;
    }
  };

  return (
    <ModalsContext.Provider
      value={{
        modalOpen,
        onCloseModal,
        onSelectModal,
        selectedModal,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};
