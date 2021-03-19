import React from 'react';
import { Provider } from '@ethersproject/abstract-provider';

import useWallet from 'hooks/useWallet';
import { getAllowance } from 'utils';

const useAllowance = (tokenAddress?: string, spenderAddress?: string): string | undefined => {
  const [allowance, setAllowance] = React.useState<string>();
  const { address, provider }: { address: string | null; provider: Provider | null } = useWallet();
  const fetchAllowance = React.useCallback(
    async (userAddress: string, provider: Provider) => {
      if (!spenderAddress || !tokenAddress || !userAddress || !spenderAddress) {
        return;
      }
      const allowance = await getAllowance(userAddress, spenderAddress, tokenAddress, provider);
      setAllowance(allowance);
    },
    [setAllowance, spenderAddress, tokenAddress],
  );

  React.useEffect(() => {
    if (address && provider && spenderAddress && tokenAddress) {
      fetchAllowance(address, provider);
    }
    const refreshInterval = setInterval(fetchAllowance, 10000);
    return () => clearInterval(refreshInterval);
  }, [address, provider, spenderAddress, tokenAddress, fetchAllowance]);
  return allowance;
};

export default useAllowance;
