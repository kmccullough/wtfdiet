import { helper } from '@ember/component/helper';

function orHelper(params) {
  let value;
  return params.some(param => value = param), value;
}
export default helper(orHelper);
