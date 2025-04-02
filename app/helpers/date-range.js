import { helper } from '@ember/component/helper';

import { monthShort } from 'wtfdiet/utils/date';

/**
 * @param {Date} startDate
 * @param {Date} endDate
 * @return {string}
 */
export default helper(function dateRangeHelper([ startDate, endDate ]/*, hash*/) {
  const startYear = startDate?.getFullYear();
  const endYear = endDate?.getFullYear();
  return monthShort(startDate) + (startYear === endYear ? '' : ' ' + startYear)
    + ' – ' + monthShort(endDate) + ' ' + endYear;
});
