import React from 'react';
import 'styled-components/macro';
import { Provider } from '@ethersproject/abstract-provider';
import { API as OnboardAPI } from 'libs/types';

import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';

import { EnterAmount, DepositInfoCard, StyledButtonLarge, StyledSelectorContainer } from './components';
import { Card, InnerCardContainer } from 'components/Card';
import { Flex } from 'components/Containers';
import Spacer from 'components/Spacer';

interface IDeposit {
  readyToTransact: (onboard: OnboardAPI | null, provider: Provider | null) => Promise<boolean>;
}

const Deposit: React.FC<IDeposit> = ({ readyToTransact }) => {
  const [actionType, setActionType] = React.useState<'deposit' | 'withdraw'>('deposit');
  const [farmSelected, setFarmSelected] = React.useState<boolean>(false);

  return (
    <>
      <Spacer size={'md'} />
      <Card>
        <InnerCardContainer borderBottom={true}>
          <Flex align={'center'} justify={'center'}>
            <StyledButtonLarge onClick={() => setActionType('deposit')} active={actionType === 'deposit'}>
              <StyledSelectorContainer>
                <SelectorSvg
                  css={`
                    fill: ${actionType === 'deposit' ? '#000' : 'transparent'};
                  `}
                />
              </StyledSelectorContainer>
              Deposit
            </StyledButtonLarge>
            <StyledButtonLarge onClick={() => setActionType('withdraw')} active={actionType === 'withdraw'}>
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
              <DepositInfoCard farmSelected={farmSelected} />
              <Spacer size={'md'} />
            </>
          )}
        </InnerCardContainer>
      </Card>
      <Spacer size={'lg'} />
    </>
  );
};

export default Deposit;
