import { helper } from '@ember/component/helper';

export default helper(function initialHelper([ name ]) {
  return name ? name.charAt(0) : '';
});
