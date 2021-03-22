import React from 'react';

export interface ContextValues {
  modalOpen: boolean;
  changeModalOpen: () => void;
}

export const ModalsContext = React.createContext<ContextValues>({
  modalOpen: false,
  changeModalOpen: () => {
    return null;
  },
});

export const ModalsProvider: React.FC = ({ children }) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const changeModalOpen = (): void => {
    setModalOpen(!modalOpen);
  };

  return (
    <ModalsContext.Provider
      value={{
        modalOpen,
        changeModalOpen,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};
