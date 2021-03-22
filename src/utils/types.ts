export type BigIntish = bigint | { toString: () => string } | string | number;

export type TimeRemaining = {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
