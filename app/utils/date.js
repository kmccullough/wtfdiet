const monthNames = [
  'January', 'February', 'March',      'April',    'May',       'June',
  'July',    'August',   'September',  'October',  'November',  'December'
];

const monthNamesShort = monthNames.map(name => name.substr(0, 3));

const dayWeekNames = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const dayWeekNamesShort = dayWeekNames.map(name => name.substr(0, 3));

/**
 * @param {Date} date
 * @return {string}
 */
export function monthShort(date) {
  return monthNamesShort[date.getMonth()];
}

/**
 * @param {Date} date
 * @return {string}
 */
export function dayMonth(date) {
  return date.getDate();
}

/**
 * @param {Date} date
 * @return {string}
 */
export function dayWeekShort(date) {
  return dayWeekNamesShort[date.getDay()];
}
