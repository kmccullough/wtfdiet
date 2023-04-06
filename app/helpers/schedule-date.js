import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

export default class extends Helper {

  @inject schedule;

  compute(params, { array, prev, next, last }) {
    const date = new Date(this.schedule.date?.getTime());
    if (prev) {
      date.setDate(date.getDate() - 1);
    } else if (next) {
      date.setDate(date.getDate() + 1);
    } else if (last) {
      // TODO: this needs to be got from a service where hidden dates are taken into account
      date.setDate(date.getDate() + 30);
    }
    return array ? [ date.getFullYear(), date.getMonth() + 1, date.getDate() ] : date;
  }

}
