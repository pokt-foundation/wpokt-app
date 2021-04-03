import React from 'react';
import 'styled-components/macro';
import { colors, GU } from 'components/theme';

import { ReactComponent as CloseSvg } from 'assets/icons/close.svg';
import { ReactComponent as PiggyBank } from 'assets/icons/piggy_bank.svg';

import {
  StyledCloseContainer,
  StyledModalContainer,
  StyledPiggyBankContainer,
} from 'components/Modals/ConfirmTransaction/components';
import Spacer from 'components/Spacer';
import { H1, P2 } from 'components/Typography';

import { DepositWithdrawalContext } from 'contexts/DepositWithdrawal';

import { TOKEN_GEYSER_ADDRESS } from 'constants/index';

import { useFarmStats } from 'hooks/useFarmStats';

import { commifyString } from 'utils';

export const InsufficientFunds: React.FC = () => {
  const { onCloseModal } = React.useContext(DepositWithdrawalContext);
  const { totalStaked } = useFarmStats(TOKEN_GEYSER_ADDRESS);

  return (
    <StyledModalContainer>
      <div
        css={`
          border: ${GU}px solid #000000;
          height: 100%;
          width: 100%;
        `}
      >
        <div
          css={`
            align-items: center;
            background: #000;
            display: flex;
            padding: ${4 * GU}px;
            padding-right: ${5 * GU}px;
            position: relative;
            width: 100%;
          `}
        >
          <StyledPiggyBankContainer>
            <PiggyBank />
          </StyledPiggyBankContainer>
          <H1 color={colors.white}>Insufficient wPOKT</H1>
          <StyledCloseContainer onClick={onCloseModal}>
            <CloseSvg />
          </StyledCloseContainer>
        </div>
        <div
          css={`
            padding: ${5 * GU}px;
          `}
        >
          <P2 center={true} color={'#000'}>
            There is not enough wPOKT staked in the selected farm to withdraw the entered amount.
          </P2>
          <Spacer size={'sm'} />
          <P2 center={true} color={'#000'}>
            Please enter {commifyString(totalStaked.toFixed(2))} wpokt or less, review the value or keep your stake
            longer to reach a higher yield.
          </P2>
        </div>
      </div>
    </StyledModalContainer>
  );
};
