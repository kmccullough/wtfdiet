import { helper } from '@ember/component/helper';

function contextHelper(params, hash) {
  return { ...hash };
}
export default helper(contextHelper);
