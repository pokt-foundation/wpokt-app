import React from 'react';
import { colors } from 'components/theme';

// Assets
import { ReactComponent as DepositButtonSvg } from 'assets/icons/deposit_button.svg';
import { ReactComponent as MaxSvg } from 'assets/icons/max.svg';
import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';

// Components
import {
    StyledDepositHeader,
    StyledDepositInputContainer,
    StyledMaxButton,
} from './components';
import { Flex } from 'components/Containers';
import { H2, P2 } from 'components/Typography';

export const EnterAmount: React.FC = () => {
    return (
        <>
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
            <StyledDepositInputContainer>
                <input type="text" placeholder={'How much do you want to deposit?'} />
                <button>
                    <DepositButtonSvg />
                </button>
            </StyledDepositInputContainer>
        </>
    )
}
