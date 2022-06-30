import { helper } from '@ember/component/helper';

function notHelper([ value ]) {
  return !value;
}
export default helper(notHelper);
