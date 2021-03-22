import React from 'react';
import styled from 'styled-components';
import { GU } from 'components/theme';

const ConfirmDeposit: React.FC = () => {
  return <StyledModalContainer>Confirm Deposit</StyledModalContainer>;
};

export default ConfirmDeposit;

const StyledModalContainer = styled.div`
  background: white;
  height: ${20 * GU}px;
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${50 * GU}px;
  z-index: 10000;
`;
