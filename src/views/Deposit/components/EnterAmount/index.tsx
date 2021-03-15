import React from 'react';
import 'styled-components/macro';
import BigNumber from 'utils/bignumber';
import { colors, GU } from 'components/theme';

// Assets
import { ReactComponent as DepositButtonActiveSvg } from 'assets/icons/deposit_button_active.svg';
import { ReactComponent as DepositButtonDisabledSvg } from 'assets/icons/deposit_button_disabled.svg';
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
import { TOKEN_GEYSER_ADDRESS, WPOKT_ADDRESS } from 'constants/index';

// Contexts
import { BalanceContext } from 'contexts/Balance';
import { Web3Context } from 'contexts/Web3';

// Utils
import { approve, bnToDec, decToBn, getAllowance, getNotification, stake } from 'utils';

export const EnterAmount: React.FC = () => {
  const { wpoktBalance } = React.useContext(BalanceContext);
  const [isApproved, setIsApproved] = React.useState<boolean>(true);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
  const [wpoktInputValue, setWpoktInputValue] = React.useState<string>('');
  const { address, onboard, provider, notify, signer } = React.useContext(Web3Context);

  // Should probably a separated hook
  const useApproval = async () => {
    if (address && provider && !isDisabled) {
      const allowance = await getAllowance(address, TOKEN_GEYSER_ADDRESS, WPOKT_ADDRESS, provider);
      if (+decToBn(+wpoktInputValue) > +allowance) {
        setIsApproved(true);
      } else {
        setIsApproved(false);
      }
    }
  };
  useApproval();

  // Effects
  React.useEffect(() => {
    if (wpoktInputValue === '' || wpoktInputValue === '0') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [wpoktInputValue]);

  // Handlers
  const onDeposit = async () => {
    onboard?.walletCheck();
    if (address && provider && !isDisabled) {
      if (isApproved && signer) {
        const response = await approve(
          decToBn(+wpoktInputValue).toString(),
          TOKEN_GEYSER_ADDRESS,
          WPOKT_ADDRESS,
          signer,
        );
        if (typeof response === 'boolean') {
          console.log(response);
        } else {
          if (notify) {
            getNotification(notify, response);
          }
        }
      } else {
        if (signer) {
          const response = await stake(decToBn(+wpoktInputValue).toString(), TOKEN_GEYSER_ADDRESS, signer);
          if (typeof response === 'boolean') {
            console.log(response);
          } else {
            if (notify) {
              getNotification(notify, response);
              setWpoktInputValue('');
            }
          }
        }
      }
    }
  };

  const onMaxValue = () => {
    setWpoktInputValue(bnToDec(new BigNumber(wpoktBalance)).toString());
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
        {isApproved ? (
          <button
            css={`
              background: white !important;
              height: ${10 * GU}px;
              width: ${20 * GU}px;
            `}
            disabled={isDisabled}
            onClick={onDeposit}
          >
            Approve
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
