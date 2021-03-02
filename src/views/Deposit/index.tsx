import React from 'react';

// Assets
import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';

// Components
import {
    EnterAmount,
    StyledButtonLarge,
    StyledSelectorContainer,
} from './components';
import { Card } from 'components/Card';
import { Flex } from 'components/Containers';
import Spacer from 'components/Spacer';

const Deposit: React.FC = () => {
    // State
    const [ actionType, setActionType ] = React.useState<'deposit' | 'withdraw'>('deposit');

    return (
        <>
            <Spacer size={'md'} />
            <Card>
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
            </Card>
        </>
    )
}

export default Deposit;
