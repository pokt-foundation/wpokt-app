import React from 'react';
import 'styled-components/macro';
import TokenAmount from 'token-amount';
import { Provider } from '@ethersproject/abstract-provider';
import { colors } from 'components/theme';

import { ReactComponent as ApproveButtonActiveSvg } from 'assets/icons/approve_button_active.svg';
import { ReactComponent as ApproveButtonDisabledSvg } from 'assets/icons/approve_button_disabled.svg';
import { ReactComponent as DepositButtonActiveSvg } from 'assets/icons/deposit_button_active.svg';
import { ReactComponent as DepositButtonDisabledSvg } from 'assets/icons/deposit_button_disabled.svg';
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

import { TOKEN_GEYSER_ADDRESS } from 'constants/index';

import { BalanceContext } from 'contexts/Balance';
import { Web3Context } from 'contexts/Web3';
import { API as OnboardAPI } from 'libs/types';

import { stake } from 'utils';

import useApproval from 'hooks/useApproval';

interface IEnterAmount {
  farmSelected: boolean;
  readyToTransact: (onboard: OnboardAPI | null, provider: Provider | null) => Promise<boolean>;
  setFarmSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EnterAmount: React.FC<IEnterAmount> = ({ farmSelected, readyToTransact, setFarmSelected }) => {
  const { wpoktBalance } = React.useContext(BalanceContext);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
  const [wpoktInputValue, setWpoktInputValue] = React.useState<string>('');
  const { address, onboard, provider, signer } = React.useContext(Web3Context);
  const { isApproved, isApproving, onApprove } = useApproval();

  React.useEffect(() => {
    if (wpoktInputValue === '' || wpoktInputValue === '0' || !farmSelected) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [address, farmSelected, wpoktInputValue]);

  // This is a placeholder, which will eventually launch the transaction status modal
  React.useEffect(() => {
    if (isApproving) {
      console.log('Approving...');
    } else if (isApproved) {
      console.log('Approved');
    }
  }, [isApproving, isApproved]);

  const onDeposit = async () => {
    readyToTransact(onboard, provider);
    if (address && signer && !isDisabled && farmSelected) {
      if (isApproved) {
        const dummyToken = new TokenAmount('1', 0);
        const convertedAmount = dummyToken.convert(wpoktInputValue, 18).value;
        const response = await stake(convertedAmount, TOKEN_GEYSER_ADDRESS, signer);
        setWpoktInputValue('');
        setFarmSelected(false);
        console.log(response);
      } else {
        onApprove();
      }
    }
  };

  const onMaxValue = () => {
    const amount = new TokenAmount(wpoktBalance, 18);
    setWpoktInputValue(amount.format({ commify: false }));
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
            <P2 color={colors.white}>
              {wpoktBalance
                ? `Wallet balance: ${TokenAmount.format(wpoktBalance, 18, { symbol: 'wPOKT' })}`
                : 'Wallet balance: connect wallet'}
            </P2>
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
          placeholder={'How much do you want to deposit?'}
          type={'number'}
          min={'0'}
          step={'0.01'}
          value={wpoktInputValue}
          onChange={(e) => setWpoktInputValue(e.target.value)}
        />
        {!isApproved ? (
          <button disabled={isDisabled} onClick={onDeposit}>
            {isDisabled ? <ApproveButtonActiveSvg /> : <ApproveButtonDisabledSvg />}
          </button>
        ) : (
          <button disabled={isDisabled} onClick={onDeposit}>
            {isDisabled ? <DepositButtonActiveSvg /> : <DepositButtonDisabledSvg />}
          </button>
        )}
      </StyledDepositInputContainer>
    </>
  );
};
