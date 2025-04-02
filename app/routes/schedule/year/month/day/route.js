import Route from '@ember/routing/route';

import { inject } from '@ember/service';

export default class MealScheduleDayRoute extends Route {
  @inject schedule;

  model({ day }) {
    this.schedule.setDay(day);
    return {};
  }
}
