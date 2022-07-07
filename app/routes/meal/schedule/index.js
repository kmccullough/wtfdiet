import Route from '@ember/routing/route';

import { inject } from '@ember/service';

export default class MealScheduleRoute extends Route {

  @inject schedule;

  model(params) {
    this.schedule.setYear();
    this.schedule.setMonth();
    this.schedule.setDay();
    return {};
  }

}
