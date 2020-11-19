import { helper } from '@ember/component/helper';

import { dayMonth } from 'wtfdiet/utils/date';

/**
 * @param {Date} date
 * @return {string}
 */
function dayMonthHelper([ date ]/*, hash*/) {
  return dayMonth(date);
}
export default helper(dayMonthHelper);
