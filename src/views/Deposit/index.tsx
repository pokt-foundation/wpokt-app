import React from 'react';

// Assets
import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';

// Components
import {
    EnterAmount,
    InfoCard,
    StyledButtonLarge,
    StyledSelectorContainer,
} from './components';
import { Card, InnerCardContainer } from 'components/Card';
import { Flex } from 'components/Containers';
import Spacer from 'components/Spacer';

const Deposit: React.FC = () => {
    // State
    const [ actionType, setActionType ] = React.useState<'deposit' | 'withdraw'>('deposit');

    return (
        <>
            <Spacer size={'md'} />
            <Card>
                <InnerCardContainer borderBottom={true}>
                    <Flex align={'center'} justify={'center'}>
                        <StyledButtonLarge
                            onClick={() => setActionType('deposit')} active={actionType === 'deposit'}
                        >
                            <StyledSelectorContainer>
                                <SelectorSvg style={{ fill: actionType === 'deposit' ? '#000' : 'transparent' }} />
                            </StyledSelectorContainer>
                            Deposit
                        </StyledButtonLarge>
                        <StyledButtonLarge
                            onClick={() => setActionType('withdraw')} active={actionType === 'withdraw'}
                        >
                            <StyledSelectorContainer>
                                <SelectorSvg style={{ fill: actionType === 'withdraw' ? '#000' : 'transparent' }} />
                            </StyledSelectorContainer>
                            Withdraw
                        </StyledButtonLarge>
                    </Flex>
                    <Spacer size={'md'} />
                    {actionType === 'deposit' && <EnterAmount />}
                </InnerCardContainer>
                <InnerCardContainer>
                    {actionType === 'deposit' && <InfoCard />}
                </InnerCardContainer>
            </Card>
        </>
    )
}

export default Deposit;
