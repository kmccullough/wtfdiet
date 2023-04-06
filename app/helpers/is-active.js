import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

export default class IsActiveHelper extends Helper {

  @inject router;

  compute([ linkTo ]) {
    return this.router.isActive(...(linkTo ? [].concat(linkTo) : []));
  }

}
