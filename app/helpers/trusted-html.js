import { helper } from '@ember/component/helper';

import { htmlSafe } from '@ember/template';

function trustedHtmlHelper([ html ]) {
  return htmlSafe(html);
}
export default helper(trustedHtmlHelper);
