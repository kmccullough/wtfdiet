import Route from '@ember/routing/route';

import { inject } from '@ember/service';

export default class MealScheduleMonthRoute extends Route {
  @inject schedule;

  model({ month }) {
    this.schedule.setMonth(month);
    this.schedule.setDay();
    return {};
  }
}
