import React from 'react';
import 'styled-components/macro';

// Assets
import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';

// Components
import { EnterAmount, InfoCard, StyledButtonLarge, StyledSelectorContainer } from './components';
import { Card, InnerCardContainer } from 'components/Card';
import { Flex } from 'components/Containers';
import Spacer from 'components/Spacer';

const Deposit: React.FC = () => {
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
          {actionType === 'deposit' && <EnterAmount farmSelected={farmSelected} setFarmSelected={setFarmSelected} />}
        </InnerCardContainer>
        <InnerCardContainer>
          {actionType === 'deposit' && (
            <>
              <InfoCard farmSelected={farmSelected} setFarmSelected={setFarmSelected} />
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
