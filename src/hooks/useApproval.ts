import React from 'react';
import { Signer } from 'ethers';

import useWallet from 'hooks/useWallet';
import { approve } from 'utils';

import { TOKEN_GEYSER_ADDRESS, WPOKT_ADDRESS } from 'constants/index';

import useAllowance from './useAllowance';

interface IUseApprovalReturns {
  isApproved: boolean;
  isApproving: boolean;
  onApprove: () => Promise<boolean | undefined | null>;
}

const useApproval = (): IUseApprovalReturns => {
  const allowance = useAllowance(WPOKT_ADDRESS, TOKEN_GEYSER_ADDRESS);
  const [isApproving, setIsApproving] = React.useState(false);
  const [isApproved, setIsApproved] = React.useState(false);

  const { address, signer }: { address: string | null; signer: Signer | null } = useWallet();

  const handleApprove = React.useCallback(async (): Promise<undefined> => {
    if (!signer || !address) {
      return;
    }
    try {
      setIsApproving(true);
      const result = await approve(TOKEN_GEYSER_ADDRESS, WPOKT_ADDRESS, signer);
      setIsApproved(result);
      setIsApproving(false);
    } catch (e) {
      setIsApproving(false);
    }
  }, [address, signer, setIsApproved, setIsApproving]);

  React.useEffect(() => {
    if (allowance?.toString() && allowance?.toString() !== '0') {
      setIsApproved(true);
    }
  }, [allowance, setIsApproved]);

  return {
    isApproved,
    isApproving,
    onApprove: handleApprove,
  };
};

export default useApproval;
