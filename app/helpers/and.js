import { helper } from '@ember/component/helper';

function andHelper(params) {
  let value;
  return params.every(param => value = param), value;
}
export default helper(andHelper);
