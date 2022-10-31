// returns a new date shifted a certain number of days (can be negative)
import { MILLISECONDS_IN_ONE_DAY } from './constants';

export function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
export function endOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
}

// obj can be a parseable string, a millisecond timestamp, or a Date object
export function convertToDate(obj) {
  return obj instanceof Date ? obj : new Date(obj);
}

export function dateNDaysAgo(numDaysAgo) {
  return shiftDate(new Date(), -numDaysAgo);
}

export function getRange(count) {
  const arr = [];
  for (let idx = 0; idx < count; idx += 1) {
    arr.push(idx);
  }
  return arr;
}

export function getDateDifferenceInDays(startDate, endDate) {
  const timeDiff = endOfDay(convertToDate(endDate)) - startOfDay(convertToDate(startDate));
  return Math.round(timeDiff / MILLISECONDS_IN_ONE_DAY);
}

export function getISODate(date) {
  const clone = new Date(date);
  clone.setHours(12);
  return clone
    .toISOString()
    .split('T')
    .shift();
}
