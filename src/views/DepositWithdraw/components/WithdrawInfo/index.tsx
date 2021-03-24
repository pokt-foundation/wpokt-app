import React from 'react';
import 'styled-components/macro';
import { colors, GU } from 'components/theme';

import { ReactComponent as EthereumSvg } from 'assets/icons/ethereum.svg';

import { P2 } from 'components/Typography';

export const WithdrawInfo: React.FC = () => {
  return (
    <div
      css={`
        align-items: center;
        background: #000;
        display: flex;
        padding: ${7 * GU}px;
      `}
    >
      <div
        css={`
          box-sizing: border-box;
          min-height: 50px;
          margin-right: ${5 * GU}px;
          min-width: 32px;
        `}
      >
        <EthereumSvg />
      </div>
      <P2 color={colors.white}>Connect your Ethereum wallet to withdraw your funds</P2>
    </div>
  );
};
