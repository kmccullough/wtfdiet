import { helper } from '@ember/component/helper';

export default helper(function orHelper(params) {
  let value;
  return params.some(param => value = param), value;
});
