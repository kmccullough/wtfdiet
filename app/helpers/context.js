import { helper } from '@ember/component/helper';

export default helper(function contextHelper(params, hash) {
  return { ...hash };
});
