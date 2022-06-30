import { helper } from '@ember/component/helper';

function gtHelper([ ...params ]) {
  if (params.length <= 1) {
    return true;
  }
  let value = params.shift();
  return params.every(param => {
    const isGt = value > param;
    value = param;
    return isGt;
  });
}
export default helper(gtHelper);
