import React from 'react';
import 'styled-components/macro';
import { colors, GU } from 'components/theme';

import { ReactComponent as EthereumSvg } from 'assets/icons/ethereum.svg';
import { ReactComponent as FarmSvg } from 'assets/icons/farm.svg';

import {
  StyledContentContainer,
  StyledFarmContainer,
  StyledHeader,
  StyledHeaderLeft,
  StyledHeaderRight,
  StyledLine,
  StyledRewardText,
  StyledSmallInfoCardsContainer,
} from 'views/DepositWithdraw/components/WithdrawInfo/components';
import { MediumInfoCard, SmallInfoCard, SmallInfoCardExtraLinks } from 'components/Cards';
import { H1, P2 } from 'components/Typography';

import { TOKEN_GEYSER_ADDRESS } from 'constants/index';

import { Web3Context } from 'contexts/Web3';

import { useFarmStats } from 'hooks/useFarmStats';
import { useUserStats } from 'hooks/useUserStats';

import {
  commifyString,
  formatDaysFromTimestamp,
  formatFillPercentage,
  formatOwnershipShare,
  formatRelays,
} from 'utils';

interface IWithdraw {
  farmSelected: boolean;
}

export const WithdrawInfo: React.FC<IWithdraw> = ({ farmSelected }) => {
  const { address } = React.useContext(Web3Context);

  return (
    <>
      {!address ? (
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
              max-height: 50px;
              min-height: 50px;
              margin-right: ${5 * GU}px;
              max-width: 32px;
              min-width: 32px;
            `}
          >
            <EthereumSvg />
          </div>
          <P2 color={colors.white}>Connect your Ethereum wallet to withdraw your funds</P2>
        </div>
      ) : (
        <WithdrawFarm address={address} farmSelected={farmSelected} />
      )}
    </>
  );
};

interface IWithdrawFarm {
  address: string;
  farmSelected: boolean;
}

const WithdrawFarm: React.FC<IWithdrawFarm> = ({ address, farmSelected }) => {
  const { apr, maxRelays, timeLeft, totalStaked, totalTime, unlockedRewards, totalUnlockedRewards } = useFarmStats(
    TOKEN_GEYSER_ADDRESS,
  );
  const { earned, ownershipShare, weightedMultiplier } = useUserStats(address ? address : '', TOKEN_GEYSER_ADDRESS);

  return (
    <div>
      <StyledHeader farmSelected={farmSelected}>
        <StyledHeaderLeft>
          <div id={'farm-title'}>
            <StyledFarmContainer>
              <FarmSvg />
            </StyledFarmContainer>
            <H1 color={colors.white}>Genesis Farm</H1>
          </div>
        </StyledHeaderLeft>
        <StyledHeaderRight>
          <StyledLine />
          <div id={'estimated-reward'}>
            <P2 color={colors.white}>Yield Earned</P2>
            <StyledRewardText color={colors.white}>{commifyString(earned.toFixed(6))} wPOKT*</StyledRewardText>
          </div>
        </StyledHeaderRight>
      </StyledHeader>
      <StyledSmallInfoCardsContainer>
        <StyledContentContainer>
          <SmallInfoCard
            statTitle={'Farm APR'}
            statContent={`${commifyString(apr.toFixed(6))}%`}
            tooltip={`The APR (Annual Percentage Rate) is an annual rate of rewards on wPOKT staked. While most projects used APY, APR is a more accurate way to measure wPOKT returns as wPOKT is non-compounding. This is a current Farm-wide APR.`}
          />
          <SmallInfoCard
            statTitle={'Multiplier'}
            statContent={`${weightedMultiplier.toFixed(2)} X`}
            tooltip={`The Multiplier increases the longer you stake, up to 3x. This gives you more pool ownership and incentivizes long-term staking which provides usage stability for DApps. `}
          />
          <SmallInfoCard
            statTitle={'Farm Ownership'}
            statContent={`${formatOwnershipShare(ownershipShare)}%`}
            tooltip={`Farm ownership is your rights to the Unlocked Rewards measured as a percentage.`}
          />
          <SmallInfoCard
            statTitle={'Time Left'}
            statContent={`${formatDaysFromTimestamp(timeLeft)} days left`}
            statFill={formatFillPercentage(timeLeft, totalTime)}
            tooltip={`The remaining number of days for which pool rewards will unlocked at the current rate.`}
          />
          <SmallInfoCard
            statTitle={'MAX RELAYS/DAY'}
            statContent={`${formatRelays(maxRelays)} M`}
            tooltip={`The amount of relays you are contributing to DApps by staking in this Farm. The more you stake, the more access DApps get to Pocket Network.`}
          />
          <SmallInfoCardExtraLinks showOnDesktop={true} showOnMobile={true} />
        </StyledContentContainer>
        <div>
          <MediumInfoCard
            amount={`${commifyString(totalStaked.toFixed(6))} wPOKT`}
            header={'Total Staked'}
            icon={'chest'}
            size={'md'}
          />
          <MediumInfoCard
            amount={`${commifyString(totalUnlockedRewards.minus(unlockedRewards).toFixed(6))} wPOKT`}
            header={'Rewards Claimed'}
            icon={'rewards'}
            size={'md'}
          />
        </div>
      </StyledSmallInfoCardsContainer>
    </div>
  );
};
