import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

export default class DateKeyHelper extends Helper {
  @inject plans;
  compute([ date ]) {
    return date instanceof Date ? this.plans.getDateKey(date) : undefined;
  }
}
