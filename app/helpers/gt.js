import { helper } from '@ember/component/helper';

export default helper(function gtHelper([ ...params ]) {
  if (params.length <= 1) {
    return true;
  }
  let value = params.shift();
  return params.every(param => {
    const isGt = value > param;
    value = param;
    return isGt;
  });
});
