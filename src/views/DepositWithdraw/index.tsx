import React from 'react';
import 'styled-components/macro';
import { Provider } from '@ethersproject/abstract-provider';
import { API as OnboardAPI } from 'libs/types';

import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';

import {
  EnterAmount,
  DepositInfo,
  StyledButtonLarge,
  StyledSelectorContainer,
  WithdrawInfo,
} from 'views/DepositWithdraw/components';
import { Card, InnerCardContainer } from 'components/Cards';
import { Container, Flex } from 'components/Containers';
import Spacer from 'components/Spacer';
import { P2 } from 'components/Typography';

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
      <Spacer size={'sm'} />
      <Container>
        <P2>
          *Estimated values do not represent or guarantee the actual results of any transaction or stake. In addition,
          other metrics and calculations shown on the app have not been independently verified or audited. Use at your
          own risk.
        </P2>
      </Container>
      <Spacer size={'lg'} />
    </>
  );
};

export default Deposit;
