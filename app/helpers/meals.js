import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

export default class extends Helper {
  @inject('meals') mealService;
  compute() {
    return this.mealService.meals;
  }
}
