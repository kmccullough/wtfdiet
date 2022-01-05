import { helper } from '@ember/component/helper';

function notAcceptFavorHelper([ favor ]) {
  return +favor !== 3 && +favor?.id !== 3;
}
export default helper(notAcceptFavorHelper);
