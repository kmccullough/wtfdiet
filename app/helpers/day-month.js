import { helper } from '@ember/component/helper';

import { dayMonth } from 'wtfdiet/utils/date';

/**
 * @param {Date} date
 * @return {string}
 */
export default helper(function dayMonthHelper([ date ]/*, hash*/) {
  return dayMonth(date);
});
