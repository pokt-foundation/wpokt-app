import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import 'styled-components/macro';
import TokenAmount from 'token-amount';
import { Provider } from '@ethersproject/abstract-provider';
import { colors, GU } from 'components/theme';

import { ReactComponent as ApproveButtonActiveSvg } from 'assets/icons/approve_button_active.svg';
import { ReactComponent as ApproveButtonDisabledSvg } from 'assets/icons/approve_button_disabled.svg';
import { ReactComponent as DepositButtonActiveSvg } from 'assets/icons/deposit_button_active.svg';
import { ReactComponent as DepositButtonDisabledSvg } from 'assets/icons/deposit_button_disabled.svg';
import { ReactComponent as WithdrawButtonActiveSvg } from 'assets/icons/withdraw_button_active.svg';
import { ReactComponent as WithdrawButtonDisabledSvg } from 'assets/icons/withdraw_button_disabled.svg';
import { ReactComponent as MaxSvg } from 'assets/icons/max.svg';
import { ReactComponent as MaxSelectorSvg } from 'assets/icons/max_selector.svg';

import {
  StyledHeader,
  StyledHeaderLeft,
  StyledHeaderRight,
  StyledLine,
  StyledDepositInputContainer,
  StyledMaxButton,
} from 'views/DepositWithdraw/components/EnterAmount/components';
import { H2, P2 } from 'components/Typography';

import { BalanceContext } from 'contexts/Balance';
import { DepositWithdrawalContext } from 'contexts/DepositWithdrawal';
import { TotalStakedContext } from 'contexts/TotalStaked';
import { Web3Context } from 'contexts/Web3';
import { API as OnboardAPI } from 'libs/types';

import { WPOKT_DECIMALS } from 'constants/index';

import useApproval from 'hooks/useApproval';

import { parseInputValue } from 'utils';

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
  const { totalStaked } = React.useContext(TotalStakedContext);

  const { isApproved, isApproving, onApprove } = useApproval();

  const [didApprove, setDidApprove] = React.useState<boolean>(false);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(true);

  React.useEffect(() => {
    function setFocus() {
      if (window.innerWidth > 192 * GU) {
        const amountEl = document.getElementById('input-amount');
        amountEl?.focus();
      }
    }
    setFocus();
  }, []);

  React.useEffect(() => {
    if (wpoktBalance && wpoktBalance) {
      if (
        inputValue === '' ||
        inputValue === '0' ||
        (BigInt(parseInputValue(inputValue, WPOKT_DECIMALS)) > BigInt(wpoktBalance) && actionType === 'deposit')
      ) {
        setIsDisabled(true);
        setFarmSelected(false);
      } else {
        setIsDisabled(false);
        setFarmSelected(true);
      }
    }
  }, [actionType, address, setFarmSelected, inputValue, wpoktBalance]);

  React.useEffect(() => {
    if (isApproving) {
      setDidApprove(true);
      onSelectModal('TRANSACTION_WAITING');
    }

    if (didApprove && isApproved) {
      onSelectModal('TRANSACTION_APPROVED');
      setDidApprove(false);
    } else if (didApprove && !isApproving) {
      onSelectModal('TRANSACTION_REJECTED');
      setDidApprove(false);
    }
  }, [didApprove, isApproved, isApproving, onSelectModal]);

  const onConfirmDeposit = async () => {
    readyToTransact(onboard, provider);
    if (address && signer && !isDisabled && farmSelected) {
      if (isApproved) {
        onSelectModal('CONFIRM_TRANSACTION');
      } else {
        await onApprove();
        onSelectModal('CONFIRM_TRANSACTION');
      }
    }
  };

  const onMaxValue = () => {
    if (actionType === 'deposit') {
      const amount = new TokenAmount(wpoktBalance, WPOKT_DECIMALS);
      onChangeInput(amount.format({ commify: false, digits: WPOKT_DECIMALS }));
    } else if (actionType === 'withdraw') {
      onChangeInput(totalStaked.toString());
    }
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
                  ? `Wallet balance: ${TokenAmount.format(wpoktBalance, WPOKT_DECIMALS, { symbol: 'wPOKT' })}`
                  : 'Wallet balance: connect wallet'}
              </P2>
            )}
            {actionType === 'withdraw' && (
              <P2 color={colors.white}>
                {totalStaked
                  ? `Total staked: ${TokenAmount.format(totalStaked, WPOKT_DECIMALS, { symbol: 'wPOKT' })}`
                  : 'Total staked: connect wallet'}
              </P2>
            )}
            <StyledMaxButton onClick={onMaxValue}>
              <VisuallyHidden>Max</VisuallyHidden>
              <div id={'max-svg'}>
                <MaxSvg />
              </div>
              <div id={'max-selector-svg'}>
                <MaxSelectorSvg />
              </div>
            </StyledMaxButton>
          </div>
        </StyledHeaderRight>
      </StyledHeader>
      <StyledDepositInputContainer>
        <input
          id={'input-amount'}
          placeholder={`How much do you want to ${actionType}?`}
          type={'number'}
          min={'0'}
          step={'0.01'}
          value={inputValue}
          onChange={(e) => onChangeInput(e.target.value)}
        />
        {!isApproved ? (
          <button disabled={isDisabled} onClick={onConfirmDeposit}>
            <VisuallyHidden>Approve</VisuallyHidden>
            {isDisabled ? <ApproveButtonDisabledSvg /> : <ApproveButtonActiveSvg />}
          </button>
        ) : (
          <button disabled={isDisabled} onClick={onConfirmDeposit}>
            <VisuallyHidden>Deposit</VisuallyHidden>
            {actionType === 'deposit' && (isDisabled ? <DepositButtonDisabledSvg /> : <DepositButtonActiveSvg />)}
            {actionType === 'withdraw' && (isDisabled ? <WithdrawButtonDisabledSvg /> : <WithdrawButtonActiveSvg />)}
          </button>
        )}
      </StyledDepositInputContainer>
    </>
  );
};
