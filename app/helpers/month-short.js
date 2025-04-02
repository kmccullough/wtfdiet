import { helper } from '@ember/component/helper';

import { monthShort } from 'wtfdiet/utils/date';

/**
 * @param {Date} date
 * @return {string}
 */
export default helper(function monthShortHelper([ date ]/*, hash*/) {
  return monthShort(date);
});
