import React from 'react';
import 'styled-components/macro';
import { Provider } from '@ethersproject/abstract-provider';
import { API as OnboardAPI } from 'libs/types';

import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';

import { EnterAmount, DepositInfo, StyledButtonLarge, StyledSelectorContainer, WithdrawInfo } from './components';
import { Card, InnerCardContainer } from 'components/Cards';
import { Flex } from 'components/Containers';
import Spacer from 'components/Spacer';

import { DepositWithdrawalContext } from 'contexts/DepositWithdrawal';

interface IDeposit {
  readyToTransact: (onboard: OnboardAPI | null, provider: Provider | null) => Promise<boolean>;
}

const Deposit: React.FC<IDeposit> = ({ readyToTransact }) => {
  const { actionType, onSetActionType } = React.useContext(DepositWithdrawalContext);
  const [farmSelected, setFarmSelected] = React.useState<boolean>(false);

  return (
    <>
      <Spacer size={'md'} />
      <Card>
        <InnerCardContainer borderBottom={true}>
          <Flex align={'center'} justify={'center'}>
            <StyledButtonLarge onClick={() => onSetActionType('deposit')} active={actionType === 'deposit'}>
              <StyledSelectorContainer>
                <SelectorSvg
                  css={`
                    fill: ${actionType === 'deposit' ? '#000' : 'transparent'};
                  `}
                />
              </StyledSelectorContainer>
              Deposit
            </StyledButtonLarge>
            <StyledButtonLarge onClick={() => onSetActionType('withdraw')} active={actionType === 'withdraw'}>
              <StyledSelectorContainer>
                <SelectorSvg
                  css={`
                    fill: ${actionType === 'withdraw' ? '#000' : 'transparent'};
                  `}
                />
              </StyledSelectorContainer>
              Withdraw
            </StyledButtonLarge>
          </Flex>
          <Spacer size={'sm'} />
          {actionType === 'deposit' && (
            <EnterAmount
              actionType={actionType}
              farmSelected={farmSelected}
              readyToTransact={readyToTransact}
              setFarmSelected={setFarmSelected}
            />
          )}
          {actionType === 'withdraw' && (
            <EnterAmount
              actionType={actionType}
              farmSelected={farmSelected}
              readyToTransact={readyToTransact}
              setFarmSelected={setFarmSelected}
            />
          )}
        </InnerCardContainer>
        <InnerCardContainer>
          {actionType === 'deposit' && (
            <>
              <DepositInfo farmSelected={farmSelected} />
            </>
          )}
          {actionType === 'withdraw' && <WithdrawInfo farmSelected={farmSelected} />}
        </InnerCardContainer>
      </Card>
      <Spacer size={'lg'} />
    </>
  );
};

export default Deposit;
