import { BigNumber } from 'ethers';
import {
  parseInputValue,
  formatRelays,
  commifyString,
  formatFillPercentage,
  formatDaysFromTimestamp,
  formatOwnershipShare,
  shortenAddress,
} from 'utils/index';
import { WPOKT_DECIMALS } from 'constants/index';

describe('testing formatting & ethereum utils', () => {
  it('should parse 1 to wPOKT representation', () => {
    const parsedAmount = parseInputValue('1', WPOKT_DECIMALS);
    const expectedAmount = BigNumber.from(1 * 10 ** WPOKT_DECIMALS);

    expect(parsedAmount).toStrictEqual(expectedAmount);
  });

  it('should format 10 million relays to 10 with two decimals', () => {
    const parsedRelays = '10.00';
    const expectedRelays = formatRelays('10000000');

    expect(parsedRelays).toStrictEqual(expectedRelays);
  });

  it('should commify string (number)', () => {
    const commifiedString = commifyString('10000');
    const expectedString = '10,000';

    expect(commifiedString).toStrictEqual(expectedString);
  });

  it('should format 50% percent', () => {
    const expectedPercent = 50;
    const parsedPercent = formatFillPercentage(100, 200);

    expect(parsedPercent).toStrictEqual(expectedPercent);
  });

  it('should format farm seconds left to days', () => {
    const TWO_DAYS_IN_SECONDS = 172800;
    const parsedDays = formatDaysFromTimestamp(TWO_DAYS_IN_SECONDS);
    const expectedDays = 2;

    expect(parsedDays).toStrictEqual(expectedDays);
  });

  it('should format 0.1 ownership share', () => {
    const share = 0.1;
    const parsedOwnershipShare = formatOwnershipShare(share);
    const expectedOwnershipShare = '0.10';

    expect(parsedOwnershipShare).toStrictEqual(expectedOwnershipShare);
  });

  it('should format 0.001 ownership share', () => {
    const share = 0.001;
    const parsedOwnershipShare = formatOwnershipShare(share);
    const expectedOwnershipShare = '< 0.01';

    expect(parsedOwnershipShare).toStrictEqual(expectedOwnershipShare);
  });

  it('should shorten 0x address', () => {
    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
    const shortenedAddress = shortenAddress(ZERO_ADDRESS);
    const expectedAddress = '0x0000…0000';

    expect(shortenedAddress).toStrictEqual(expectedAddress);
  });
});
