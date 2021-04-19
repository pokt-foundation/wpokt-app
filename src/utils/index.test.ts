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
} from 'utils';

describe('Formatting functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should commify strings', () => {
    expect(commifyString('.123456789')).toEqual('.123456789');
    expect(commifyString('123')).toEqual('123');
    expect(commifyString('123456789')).toEqual('123,456,789');
    expect(commifyString('123456.789')).toEqual('123,456.789');
  });

  it('should format BigNumber relays', () => {
    expect(formatRelays(new BNJS('123456789123456789123456789'))).toEqual('123456789123456789123.46');
    expect(formatRelays(new BNJS(100000000))).toEqual('100.00');
    expect(formatRelays(new BNJS(100000000.01))).toEqual('100.00');
    expect(formatRelays(new BNJS(10))).toEqual('0.00');
    expect(formatRelays(new BNJS('0.123456789123456789123456789'))).toEqual('0.00');
  });

  it('should format string relays', () => {
    expect(formatRelays('123456789123456789123456789')).toEqual('123456789123456789123.46');
    expect(formatRelays('100000000')).toEqual('100.00');
    expect(formatRelays('100000000.01')).toEqual('100.00');
    expect(formatRelays('10')).toEqual('0.00');
    expect(formatRelays('.123456789123456789123456789')).toEqual('0.00');
  });

  it('should format days left as a percentage', () => {
    expect(formatFillPercentage(1, 5000)).toEqual(100);
    expect(formatFillPercentage(500, 5000)).toEqual(90);
    expect(formatFillPercentage(5000, 5000)).toEqual(0);
  });

  it('should format the number of days from time in seconds', () => {
    expect(formatDaysFromTimestamp(172804)).toEqual(2);
    expect(formatDaysFromTimestamp(172799)).toEqual(2);
  });

  it('should format format the share of ownership into a percentage', () => {
    expect(formatOwnershipShare(4)).toEqual('4.00');
    expect(formatOwnershipShare(0.001)).toEqual('< 0.01');
  });

  it('should parse string input value', () => {
    expect(parseInputValue('0.123456', 6).toString()).toEqual('123456');
    expect(parseInputValue('123', 6).toString()).toEqual('123000000');
    expect(parseInputValue('123456789', 6).toString()).toEqual('123456789000000');
    expect(parseInputValue('123456789123456789123456789.123', 6).toString()).toEqual('123456789123456789123456789123000');
  });

  it('should shorten an ethereum address', () => {
    expect(shortenAddress('0x6C6Cf8276CCe6821Cb5D26447D35F082A3C3c66b')).toEqual('0x6C6C…c66b');
    expect(shortenAddress('0x6C6Cf8276CCe6821Cb5D26447D35F082A3C3c66b', 2)).toEqual('0x6C…6b');
  });
});
