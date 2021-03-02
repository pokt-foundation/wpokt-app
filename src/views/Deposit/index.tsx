import React from 'react';
import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';
import { colors } from 'components/theme';

// Assets
import { ReactComponent as MaxSvg } from 'assets/icons/max.svg';
import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';

// Components
import {
    StyledButtonLarge,
    StyledDepositHeader,
    StyledMaxButton,
    StyledSelectorContainer,
} from './components';
import { Card } from 'components/Card';
import { Flex } from 'components/Containers';
import Spacer from 'components/Spacer';
import { H2, P2 } from 'components/Typography';

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
                <StyledDepositHeader>
                    <H2 color={colors.white}>Enter Amount</H2>
                    <Flex align={'center'}>
                        <P2 color={colors.white}>Wallet balance: 2345.926562 wPOKT</P2>
                        <StyledMaxButton>
                            <div id={'max-svg'}>
                                <MaxSvg />
                            </div>
                            <div id={'max-selector-svg'}>
                                <SelectorSvg />
                            </div>
                        </StyledMaxButton>
                    </Flex>
                </StyledDepositHeader>
            </Card>
        </>
    )
}

export default Deposit;
