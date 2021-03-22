import { getTimeRemaining } from 'utils/helpers';
import { TimeRemaining } from './types';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const TWO_MONTHS = dayjs.duration(2, 'months').asSeconds();
const TWO_DAYS = dayjs.duration(2, 'days').asSeconds();
const TWO_HOURS = dayjs.duration(2, 'hours').asSeconds();
const TWO_MINUTES = dayjs.duration(2, 'minutes').asSeconds();
const TWO_SECONDS = dayjs.duration(2, 'seconds').asSeconds();

describe('make sure time remaining works properly', () => {
  it('returns an object of type TimeRemaining', () => {
    const timeRemaining: TimeRemaining = getTimeRemaining(0);
    expect.any(timeRemaining);
  });
  it('calculates time remaining months', () => {
    const timeRemaining: TimeRemaining = getTimeRemaining(TWO_MONTHS);
    expect(timeRemaining.months).toBe(2);
  });
  it('calculates time remaining days', () => {
    const timeRemaining: TimeRemaining = getTimeRemaining(TWO_DAYS);
    expect(timeRemaining.days).toBe(2);
  });
  it('calculates time remaining hours', () => {
    const timeRemaining: TimeRemaining = getTimeRemaining(TWO_HOURS);
    expect(timeRemaining.hours).toBe(2);
  });
  it('calculates time remaining minutes', () => {
    const timeRemaining: TimeRemaining = getTimeRemaining(TWO_MINUTES);
    expect(timeRemaining.minutes).toBe(2);
  });
  it('calculates time remaining seconds', () => {
    const timeRemaining: TimeRemaining = getTimeRemaining(TWO_SECONDS);
    expect(timeRemaining.seconds).toBe(2);
  });
});
