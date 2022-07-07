import Route from '@ember/routing/route';

import { inject } from '@ember/service';

export default class MealScheduleYearRoute extends Route {

  @inject schedule;

  model({ year }) {
    this.schedule.setYear(year);
    this.schedule.setMonth();
    this.schedule.setDay();
    return {};
  }

}
