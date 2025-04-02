import { helper } from '@ember/component/helper';

export default helper(function eqHelper(params) {
  let value = params[0];
  return params.every(param => param === value);
});
