import React from 'react';
import BigNumber from 'utils/bignumber';
import { colors } from 'components/theme';

// Assets
import { ReactComponent as DepositButtonSvg } from 'assets/icons/deposit_button.svg';
import { ReactComponent as MaxSvg } from 'assets/icons/max.svg';
import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';

// Components
import {
  StyledHeader,
  StyledHeaderLeft,
  StyledHeaderRight,
  StyledLine,
  StyledDepositInputContainer,
  StyledMaxButton,
} from './components';
import { H2, P2 } from 'components/Typography';

// Constants
import { tokenGeyser, wpoktAddress } from 'constants/index';

// Contexts
import { BalanceContext } from 'contexts/Balance';
import { Web3Context } from 'contexts/Web3';

// Utils
import { bnToDec, getAllowance } from 'utils';

export const EnterAmount: React.FC = () => {
  const { wpoktBalance } = React.useContext(BalanceContext);
  const [wpoktInputValue, setWpoktInputValue] = React.useState<string>('');
  const { address, provider } = React.useContext(Web3Context);

  // Handlers
  const onDeposit = () => {
    console.log(wpoktInputValue);
  };

  const onMaxValue = async () => {
    setWpoktInputValue(bnToDec(new BigNumber(wpoktBalance)).toString());
    if (address && provider) {
      const allowance = await getAllowance(address, tokenGeyser, wpoktAddress, provider);
      console.log(allowance);
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
            <P2 color={colors.white}>
              {wpoktBalance
                ? `Wallet balance: ${bnToDec(new BigNumber(wpoktBalance))} wPOKT`
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
        <button onClick={onDeposit}>
          <DepositButtonSvg />
        </button>
      </StyledDepositInputContainer>
    </>
  );
};
