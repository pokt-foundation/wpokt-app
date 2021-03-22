import React from 'react';
import 'styled-components/macro';
import { colors, GU } from 'components/theme';

import { ReactComponent as CoinSvg } from 'assets/icons/coin.svg';
import { ReactComponent as CloseSvg } from 'assets/icons/close.svg';
import { ReactComponent as DepositButtonActiveSvg } from 'assets/icons/deposit_button_active.svg';
import { ReactComponent as FarmSvg } from 'assets/icons/farm.svg';

import { Flex } from 'components/Containers';
import Spacer from 'components/Spacer';
import { H1, H2, P2 } from 'components/Typography';

import {
  StyledCloseContainer,
  StyledCoinContainer,
  StyledContentContainer,
  StyledDepositButtonContainer,
  StyledDetailHeader,
  StyledFarmContainer,
  StyledModalContainer,
} from './components';
// import { TOKEN_GEYSER_ADDRESS } from 'constants/index';

import { ModalsContext } from 'contexts/Modals';

// import { parseInputValue, stake } from 'utils';

const ConfirmDeposit: React.FC = () => {
  const { onCloseModal } = React.useContext(ModalsContext);

  const onDeposit = async () => {
    // const response = await stake(parseInputValue(wpoktInputValue, 18).toString(), TOKEN_GEYSER_ADDRESS, signer);
    // setWpoktInputValue('');
    // setFarmSelected(false);
    // console.log(response);
    console.log('Deposit');
  };

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
            position: relative;
            width: 100%;
          `}
        >
          <StyledCoinContainer>
            <CoinSvg />
          </StyledCoinContainer>
          <H1 color={colors.white}>Confirm Your Deposit</H1>
          <StyledCloseContainer onClick={onCloseModal}>
            <CloseSvg />
          </StyledCloseContainer>
        </div>
        <Spacer size={'sm'} />
        <div
          css={`
            align-items: center;
            background: ${colors.yellow};
            border-bottom: ${GU}px solid #000000;
            border-top: ${GU}px solid #000000;
            display: flex;
            padding: ${4 * GU}px;
            position: relative;
            width: 100%;
          `}
        >
          <StyledFarmContainer>
            <FarmSvg />
          </StyledFarmContainer>
          <H2 color={'#000'}>Genesis Farm</H2>
        </div>
        <Flex>
          <div
            css={`
              border-right: ${GU}px solid #000000;
              width: 50%;
            `}
          >
            <StyledDetailHeader>
              <P2 color={colors.white}>APY</P2>
            </StyledDetailHeader>
            <StyledContentContainer>
              <P2 color={'#000'}>55,4 %</P2>
            </StyledContentContainer>
          </div>
          <div
            css={`
              width: 50%;
            `}
          >
            <StyledDetailHeader>
              <P2 color={colors.white}>Multiplier</P2>
            </StyledDetailHeader>
            <StyledContentContainer>
              <P2 color={'#000'}>5.0x</P2>
            </StyledContentContainer>
          </div>
        </Flex>
        <Spacer size={'sm'} />
        <StyledDetailHeader>
          <P2 color={colors.white}>Deposit</P2>
        </StyledDetailHeader>
        <StyledContentContainer>
          <P2 color={'#000'}>7,876.820174829907907176 w POKT</P2>
        </StyledContentContainer>
        <Spacer size={'sm'} />
        <StyledDetailHeader>
          <P2 color={colors.white}>Address</P2>
        </StyledDetailHeader>
        <StyledContentContainer>
          <P2 color={'#000'}>0x2434a85bdb0a09f58565dee6b5252e941bbec709</P2>
        </StyledContentContainer>
        <StyledDepositButtonContainer>
          <button onClick={onDeposit}>
            <DepositButtonActiveSvg />
          </button>
        </StyledDepositButtonContainer>
      </div>
    </StyledModalContainer>
  );
};

export default ConfirmDeposit;
