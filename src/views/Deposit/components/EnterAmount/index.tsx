import React from 'react';
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

export const EnterAmount: React.FC = () => {
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
                        <P2 color={colors.white}>Wallet balance: 2345.926562 wPOKT</P2>
                        <StyledMaxButton>
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
                <input type="text" placeholder={'How much do you want to deposit?'} />
                <button>
                    <DepositButtonSvg />
                </button>
            </StyledDepositInputContainer>
        </>
    )
}
