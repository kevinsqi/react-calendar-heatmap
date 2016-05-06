// returns a new date shifted a certain number of days (can be negative)
export function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

export function getBeginningTimeForDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
