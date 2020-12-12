import { helper } from '@ember/component/helper';

function initialHelper([ name ]) {
  return name ? name.charAt(0) : '';
}
export default helper(initialHelper);
