import React from 'react';
import { useHistory } from 'react-router-dom';
import VisuallyHidden from '@reach/visually-hidden';
import { BigNumber } from 'bignumber.js';
import 'styled-components/macro';
import { colors, GU } from 'components/theme';

import { ReactComponent as CoinSvg } from 'assets/icons/coin.svg';
import { ReactComponent as CloseSvg } from 'assets/icons/close.svg';
import { ReactComponent as CopySvg } from 'assets/icons/copy.svg';
import { ReactComponent as DepositButtonActiveSvg } from 'assets/icons/deposit_button_active.svg';
import { ReactComponent as FarmSvg } from 'assets/icons/farm.svg';
import { ReactComponent as MultiplierSvg } from 'assets/icons/multiplier.svg';
import { ReactComponent as WithdrawButtonActiveSvg } from 'assets/icons/withdraw_button_active.svg';

import {
  InsufficientFunds,
  StyledATag,
  StyledCloseContainer,
  StyledCoinContainer,
  StyledContentContainer,
  StyledDepositButtonContainer,
  StyledDetailHeader,
  StyledFarmContainer,
  StyledLink,
  StyledModalContainer,
  StyledWarning,
} from 'components/Modals/ConfirmTransaction/components';
import { Flex } from 'components/Containers';
import Spacer from 'components/Spacer';
import { H1, H2, P2 } from 'components/Typography';

import { DepositWithdrawalContext } from 'contexts/DepositWithdrawal';
import { TotalStakedContext } from 'contexts/TotalStaked';
import { Web3Context } from 'contexts/Web3';

import { TOKEN_GEYSER_ADDRESS } from 'constants/index';

import { useFarmStats } from 'hooks/useFarmStats';
import { useUserStats } from 'hooks/useUserStats';

import { shortenAddress } from 'utils';

const ConfirmTransaction: React.FC = () => {
  const history = useHistory();
  const { actionType, inputValue, onCloseModal, onDeposit, onWithdraw } = React.useContext(DepositWithdrawalContext);
  const { totalStaked } = React.useContext(TotalStakedContext);
  const { address } = React.useContext(Web3Context);
  const { apr } = useFarmStats(TOKEN_GEYSER_ADDRESS);
  const { weightedMultiplier } = useUserStats(address ? address : '', TOKEN_GEYSER_ADDRESS);
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

  const onStatsLink = () => {
    history.push('/stats');
    onCloseModal();
  };

  return (
    <>
      {actionType === 'withdraw' && new BigNumber(inputValue).isGreaterThan(new BigNumber(totalStaked)) ? (
        <InsufficientFunds />
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
              <H1 color={colors.white}>Confirm Your {actionType === 'deposit' ? 'Deposit' : 'Withdraw'}</H1>
              <StyledCloseContainer onClick={onCloseModal}>
                <VisuallyHidden>Close</VisuallyHidden>
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
            {actionType === 'deposit' ? (
              <div>
                <Flex>
                  <div
                    css={`
                      border-right: ${GU}px solid #000000;
                      width: 50%;
                    `}
                  >
                    <StyledDetailHeader>
                      <P2 color={colors.white}>APR</P2>
                    </StyledDetailHeader>
                    <StyledContentContainer>
                      <P2 color={'#000'}>{apr.toFixed(6)}%</P2>
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
                      <P2 color={'#000'}>{weightedMultiplier.toFixed(2)} x</P2>
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
                    <button onClick={onCopy}>
                      {!isCopied ? (
                        <div>
                          <VisuallyHidden>Copy</VisuallyHidden>
                          <CopySvg />
                        </div>
                      ) : (
                        'Copied!'
                      )}
                    </button>
                  </Flex>
                </StyledContentContainer>
              </div>
            ) : (
              <div>
                <StyledDetailHeader>
                  <P2 color={colors.white}>Amount to withdraw</P2>
                </StyledDetailHeader>
                <StyledContentContainer>
                  <P2 color={'#000'}>{inputValue} wPOKT</P2>
                </StyledContentContainer>
                <Spacer size={'xs'} />
                <StyledWarning>
                  <P2 color={colors.white} paragraphFont={true}>
                    Give it a second thought...
                  </P2>
                  <Spacer size={'xs'} />
                  <P2 color={colors.white} paragraphFont={true}>
                    If you keep your stake longer you could earn more rewards.
                  </P2>
                </StyledWarning>
                <Spacer size={'xs'} />
                <Flex
                  css={`
                    box-sizing: border-box;
                    margin: 0 ${GU * 3}px;
                  `}
                  justify={'space-between'}
                >
                  <StyledATag
                    href={'https://forum.pokt.network/t/wpokt-faq/780'}
                    target={'_blank'}
                    rel={'noreferrer noopener'}
                  >
                    <P2 color={colors.white}>FAQ</P2>
                    <MultiplierSvg />
                  </StyledATag>
                  <StyledLink onClick={onStatsLink}>
                    <P2 color={colors.white}>Stats</P2>
                    <MultiplierSvg />
                  </StyledLink>
                </Flex>
                <Spacer size={'sm'} />
              </div>
            )}
            <StyledDepositButtonContainer>
              {actionType === 'deposit' ? (
                <button onClick={onDeposit}>
                  <VisuallyHidden>Deposit</VisuallyHidden>
                  <DepositButtonActiveSvg />
                </button>
              ) : (
                <button onClick={onWithdraw}>
                  <VisuallyHidden>Withdraw</VisuallyHidden>
                  <WithdrawButtonActiveSvg />
                </button>
              )}
            </StyledDepositButtonContainer>
          </div>
        </StyledModalContainer>
      )}
    </>
  );
};

export default ConfirmTransaction;
