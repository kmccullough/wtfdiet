import { helper } from '@ember/component/helper';

import { monthShort } from 'wtfdiet/utils/date';

/**
 * @param {Date} date
 * @return {string}
 */
function monthShortHelper([ date ]/*, hash*/) {
  return monthShort(date);
}
export default helper(monthShortHelper);
