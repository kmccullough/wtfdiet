import { helper } from '@ember/component/helper';

function appendOneHelper([ array, ...appendFirst ]) {
  return one => {
    array = array || [];
    array.push(...appendFirst, one);
    return array;
  };
}
export default helper(appendOneHelper);
