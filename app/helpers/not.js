import { helper } from '@ember/component/helper';

export default helper(function notHelper([ value ]) {
  return !value;
});
