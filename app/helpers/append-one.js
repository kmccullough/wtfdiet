import { helper } from '@ember/component/helper';

export default helper(function appendOneHelper([ array, ...appendFirst ]) {
  return one => {
    array = array || [];
    array.push(...appendFirst, one);
    return array;
  };
});
