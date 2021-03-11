import { TimeRemaining } from 'util/types';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export function getTimeRemaining(timeSec: number): TimeRemaining {
  let months = dayjs.duration(timeSec, 'seconds').months();
  let days = dayjs.duration(timeSec, 'seconds').days();
  let hours = dayjs.duration(timeSec, 'seconds').hours();
  let minutes = dayjs.duration(timeSec, 'seconds').minutes();
  let seconds = dayjs.duration(timeSec, 'seconds').seconds();

  return {
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}
