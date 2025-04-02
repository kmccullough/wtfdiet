import { helper } from '@ember/component/helper';

const favors = [ 'Reject', 'Dislike', 'Accept', 'Like', 'Love' ]
  .map((name, i) => ({ name, id: String(i + 1) }))
  .reverse();

export default helper(function favorsHelper() {
  return favors;
});
