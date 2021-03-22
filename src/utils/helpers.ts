import { TimeRemaining } from 'utils/types';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export function getTimeRemaining(timeSec: number): TimeRemaining {
  const months = dayjs.duration(timeSec, 'seconds').months();
  const days = dayjs.duration(timeSec, 'seconds').days();
  const hours = dayjs.duration(timeSec, 'seconds').hours();
  const minutes = dayjs.duration(timeSec, 'seconds').minutes();
  const seconds = dayjs.duration(timeSec, 'seconds').seconds();

  return {
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}
