import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

export default class extends Helper {

  @inject schedule;

  compute() {
    const time = this.schedule.date.getTime();
    const dates = [];
    for (let i = 0;  i < 32; ++i) {
      const date = new Date(time);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  }

}
