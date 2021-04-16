import { expect } from '@jest/globals';
import { BigNumber as BNJS } from 'bignumber.js';

import {
  commifyString,
  formatRelays,
  formatFillPercentage,
  formatDaysFromTimestamp,
  formatOwnershipShare,
  parseInputValue,
  shortenAddress,
  getERC20Contract,
  getTokenGeyserContract,
  stake,
  unstake,
  approve,
  getAllowance,
} from 'utils';

describe('Formatting functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should commify strings', () => {
    const commified = commifyString('123456789');
    expect(commified).toEqual('123,456,789');
  });

  it('should format BigNumber relays', () => {
    const relays = formatRelays(new BNJS(100000000));
    expect(relays).toEqual('100.00');
  });

  it('should format string relays', () => {
    const relays = formatRelays('100000000');
    expect(relays).toEqual('100.00');
  });

  it('should format days left as a percentage', () => {
    const fillPercentage = formatFillPercentage(500, 5000);
    expect(fillPercentage).toEqual(90);
  });

  it('should format the number of days from time in seconds', () => {
    expect(formatDaysFromTimestamp(172804)).toEqual(2);
    expect(formatDaysFromTimestamp(172799)).toEqual(2);
  });

  it('should format format the share of ownership into a percentage', () => {
    expect(formatOwnershipShare(4)).toEqual('4.00');
    expect(formatOwnershipShare(.001)).toEqual('< 0.01');
  });

  it('should shorten an ethereum address', () => {
    expect(shortenAddress('0x6C6Cf8276CCe6821Cb5D26447D35F082A3C3c66b')).toEqual('0x6C6C…c66b');
    expect(shortenAddress('0x6C6Cf8276CCe6821Cb5D26447D35F082A3C3c66b', 2)).toEqual('0x6C…6b');
  });
})
