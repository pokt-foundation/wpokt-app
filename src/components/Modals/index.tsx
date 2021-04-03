import React from 'react';
import styled from 'styled-components';

import ConfirmTransaction from 'components/Modals/ConfirmTransaction';
import GraphFullscreen from 'components/Modals/GraphFullscreen';
import TransactionStatus from 'components/Modals/TransactionStatus';

import { DepositWithdrawalContext } from 'contexts/DepositWithdrawal';

const Modals: React.FC = () => {
  const { modalOpen, onCloseModal, selectedModal } = React.useContext(DepositWithdrawalContext);

  return (
    <>
      {modalOpen && (
        <>
          <StyledBackground onClick={onCloseModal} />
          {selectedModal === 'CONFIRM_DEPOSIT' && <ConfirmTransaction />}
          {(selectedModal === 'TRANSACTION_WAITING' ||
            selectedModal === 'TRANSACTION_APPROVED' ||
            selectedModal === 'TRANSACTION_REJECTED') && <TransactionStatus type={selectedModal} />}
          {selectedModal === 'GRAPH_FULLSCREEN' && <GraphFullscreen />}
        </>
      )}
    </>
  );
};

export default Modals;

const StyledBackground = styled.div`
  background: rgba(0, 0, 0, 0.6);
  height: 100%;
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 100%;
  z-index: 9999;
`;
