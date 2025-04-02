import { helper } from '@ember/component/helper';

import { dayWeekShort } from 'wtfdiet/utils/date';

/**
 * @param {Date} date
 * @return {string}
 */
export default helper(function dayWeekShortHelper([ date ]/*, hash*/) {
  return dayWeekShort(date);
});
