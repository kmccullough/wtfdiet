import { helper } from '@ember/component/helper';

export default helper(function andHelper(params) {
  let value;
  return params.every(param => value = param), value;
});
