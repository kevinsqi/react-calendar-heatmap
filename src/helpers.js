// returns a new date shifted a certain number of days (can be negative)
export const shiftDate = (date, numDays) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

export const getBeginningTimeForDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// obj can be a parseable string, a millisecond timestamp, or a Date object
export const convertToDate = (obj) => {
  return obj instanceof Date ? obj : new Date(obj);
}

export const dateNDaysAgo = (numDaysAgo) => {
  return shiftDate(new Date(), -numDaysAgo);
}

export const getRange = (count) => {
  const arr = [];
  for (let idx = 0; idx < count; idx += 1) {
    arr.push(idx);
  }
  return arr;
}
