import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

export default class extends Helper {
  @inject schedule;
  compute() {
    return this.schedule.dates;
  }
}
