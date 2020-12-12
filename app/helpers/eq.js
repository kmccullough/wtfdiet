import { helper } from '@ember/component/helper';

function eqHelper(params) {
  let value = params[0];
  return params.every(param => param === value);
}
export default helper(eqHelper);
