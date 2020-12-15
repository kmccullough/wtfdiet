import Controller from '@ember/controller';

import { inject } from '@ember/service';
import { cached } from '@glimmer/tracking';

export default class ScheduleController extends Controller {

  @inject('meals') mealService;

  @cached
  get planMeals() {
    return this.mealService.randomMeals;
  }

}
