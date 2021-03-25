import React from 'react';
import 'styled-components/macro';
import { colors, GU } from 'components/theme';

import { ReactComponent as CoinSvg } from 'assets/icons/coin.svg';
import { ReactComponent as CloseSvg } from 'assets/icons/close.svg';
import { ReactComponent as CopySvg } from 'assets/icons/copy.svg';
import { ReactComponent as DepositButtonActiveSvg } from 'assets/icons/deposit_button_active.svg';
import { ReactComponent as FarmSvg } from 'assets/icons/farm.svg';

import {
  StyledCloseContainer,
  StyledCoinContainer,
  StyledContentContainer,
  StyledDepositButtonContainer,
  StyledDetailHeader,
  StyledFarmContainer,
  StyledModalContainer,
} from './components';
import { Flex } from 'components/Containers';
import Spacer from 'components/Spacer';
import { H1, H2, P2 } from 'components/Typography';

import { DepositWithdrawalContext } from 'contexts/DepositWithdrawal';
import { Web3Context } from 'contexts/Web3';

import { shortenAddress } from 'utils';

const ConfirmDeposit: React.FC = () => {
  const { actionType, inputValue, onCloseModal, onDeposit, onWithdraw } = React.useContext(DepositWithdrawalContext);
  const { address } = React.useContext(Web3Context);

  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  const onCopy = () => {
    if (address && !isCopied) {
      try {
        const elem = document.createElement('textarea');
        document.body.appendChild(elem);
        elem.value = address;
        elem.select();
        document.execCommand('copy');
        document.body.removeChild(elem);
        setIsCopied(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      setIsCopied(false);
    }
  };

  return (
    <>
      {actionType === 'deposit' ? (
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
            <Spacer size={'xs'} />
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
            <Spacer size={'xs'} />
            <StyledDetailHeader>
              <P2 color={colors.white}>Deposit</P2>
            </StyledDetailHeader>
            <StyledContentContainer>
              <P2 color={'#000'}>{inputValue} wPOKT</P2>
            </StyledContentContainer>
            <Spacer size={'xs'} />
            <StyledDetailHeader>
              <P2 color={colors.white}>Address</P2>
            </StyledDetailHeader>
            <StyledContentContainer copied={isCopied}>
              <Flex align={'center'} justify={'space-between'}>
                <P2 id={'address'} color={'#000'}>
                  {address ? shortenAddress(address, 10) : ''}
                </P2>
                <button onClick={onCopy}>{!isCopied ? <CopySvg /> : 'Copied!'}</button>
              </Flex>
            </StyledContentContainer>
            <StyledDepositButtonContainer>
              <button onClick={onDeposit}>
                <DepositButtonActiveSvg />
              </button>
            </StyledDepositButtonContainer>
          </div>
        </StyledModalContainer>
      ) : (
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
            <Spacer size={'xs'} />
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
            <Spacer size={'xs'} />
            <StyledDetailHeader>
              <P2 color={colors.white}>Deposit</P2>
            </StyledDetailHeader>
            <StyledContentContainer>
              <P2 color={'#000'}>{inputValue} wPOKT</P2>
            </StyledContentContainer>
            <Spacer size={'xs'} />
            <StyledDetailHeader>
              <P2 color={colors.white}>Address</P2>
            </StyledDetailHeader>
            <StyledContentContainer copied={isCopied}>
              <Flex align={'center'} justify={'space-between'}>
                <P2 id={'address'} color={'#000'}>
                  {address ? shortenAddress(address, 10) : ''}
                </P2>
                <button onClick={onCopy}>{!isCopied ? <CopySvg /> : 'Copied!'}</button>
              </Flex>
            </StyledContentContainer>
            <StyledDepositButtonContainer>
              <button onClick={onWithdraw}>Withdraw</button>
            </StyledDepositButtonContainer>
          </div>
        </StyledModalContainer>
      )}
    </>
  );
};

export default ConfirmDeposit;
