import { helper } from '@ember/component/helper';

import { dayWeekShort } from 'wtfdiet/utils/date';

/**
 * @param {Date} date
 * @return {string}
 */
function dayWeekShortHelper([ date ]/*, hash*/) {
  return dayWeekShort(date);
}
export default helper(dayWeekShortHelper);
