import React from 'react';
import 'styled-components/macro';
import TokenAmount from 'token-amount';
import { Provider } from '@ethersproject/abstract-provider';
import { colors } from 'components/theme';

import { ReactComponent as ApproveButtonActiveSvg } from 'assets/icons/approve_button_active.svg';
import { ReactComponent as ApproveButtonDisabledSvg } from 'assets/icons/approve_button_disabled.svg';
import { ReactComponent as DepositButtonActiveSvg } from 'assets/icons/deposit_button_active.svg';
import { ReactComponent as DepositButtonDisabledSvg } from 'assets/icons/deposit_button_disabled.svg';
import { ReactComponent as WithdrawButtonActiveSvg } from 'assets/icons/withdraw_button_active.svg';
import { ReactComponent as WithdrawButtonDisabledSvg } from 'assets/icons/withdraw_button_disabled.svg';
import { ReactComponent as MaxSvg } from 'assets/icons/max.svg';
import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';

import {
  StyledHeader,
  StyledHeaderLeft,
  StyledHeaderRight,
  StyledLine,
  StyledDepositInputContainer,
  StyledMaxButton,
} from './components';
import { H2, P2 } from 'components/Typography';

import { BalanceContext } from 'contexts/Balance';
import { DepositWithdrawalContext } from 'contexts/DepositWithdrawal';
import { Web3Context } from 'contexts/Web3';
import { API as OnboardAPI } from 'libs/types';

import useApproval from 'hooks/useApproval';

interface IEnterAmount {
  actionType: 'deposit' | 'withdraw';
  farmSelected: boolean;
  readyToTransact: (onboard: OnboardAPI | null, provider: Provider | null) => Promise<boolean>;
  setFarmSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EnterAmount: React.FC<IEnterAmount> = ({ actionType, farmSelected, readyToTransact, setFarmSelected }) => {
  const { inputValue, onChangeInput, onSelectModal } = React.useContext(DepositWithdrawalContext);
  const { address, onboard, provider, signer } = React.useContext(Web3Context);
  const { wpoktBalance } = React.useContext(BalanceContext);

  const { isApproved, isApproving, onApprove } = useApproval();

  const [isDisabled, setIsDisabled] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (inputValue === '' || inputValue === '0') {
      setIsDisabled(true);
      setFarmSelected(false);
    } else {
      setIsDisabled(false);
      setFarmSelected(true);
    }
  }, [address, setFarmSelected, inputValue]);

  React.useEffect(() => {
    if (isApproving) {
      console.log('Approving...');
    } else if (isApproved) {
      console.log('Approved');
    }
  }, [isApproving, isApproved]);

  const onConfirmDeposit = async () => {
    readyToTransact(onboard, provider);
    if (address && signer && !isDisabled && farmSelected) {
      if (isApproved) {
        onSelectModal('CONFIRM_DEPOSIT');
      } else {
        onApprove();
      }
    }
  };

  const onMaxValue = () => {
    const amount = new TokenAmount(wpoktBalance, 18);
    onChangeInput(amount.format({ commify: false }));
  };

  return (
    <>
      <StyledHeader>
        <StyledHeaderLeft>
          <div id={'enter-amount'}>
            <H2 color={colors.white}>Enter Amount</H2>
          </div>
        </StyledHeaderLeft>
        <StyledHeaderRight>
          <StyledLine />
          <div id={'wallet-balance'}>
            {actionType === 'deposit' && (
              <P2 color={colors.white}>
                {wpoktBalance
                  ? `Wallet balance: ${TokenAmount.format(wpoktBalance, 18, { symbol: 'wPOKT' })}`
                  : 'Wallet balance: connect wallet'}
              </P2>
            )}
            <StyledMaxButton onClick={onMaxValue}>
              <div id={'max-svg'}>
                <MaxSvg />
              </div>
              <div id={'max-selector-svg'}>
                <SelectorSvg />
              </div>
            </StyledMaxButton>
          </div>
        </StyledHeaderRight>
      </StyledHeader>
      <StyledDepositInputContainer>
        <input
          placeholder={`How much do you want to ${actionType}?`}
          type={'number'}
          min={'0'}
          step={'0.01'}
          value={inputValue}
          onChange={(e) => onChangeInput(e.target.value)}
        />
        {!isApproved ? (
          <button disabled={isDisabled} onClick={onConfirmDeposit}>
            {isDisabled ? <ApproveButtonDisabledSvg /> : <ApproveButtonActiveSvg />}
          </button>
        ) : (
          <button disabled={isDisabled} onClick={onConfirmDeposit}>
            {actionType === 'deposit' && (isDisabled ? <DepositButtonDisabledSvg /> : <DepositButtonActiveSvg />)}
            {actionType === 'withdraw' && (isDisabled ? <WithdrawButtonDisabledSvg /> : <WithdrawButtonActiveSvg />)}
          </button>
        )}
      </StyledDepositInputContainer>
    </>
  );
};
