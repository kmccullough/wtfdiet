import Controller from '@ember/controller';

import { inject } from '@ember/service';
import { cached } from '@glimmer/tracking';

export default class MealsController extends Controller {
  @inject('meals') mealService;
  @cached
  get meals() {
    return this.mealService.meals;
  }
}
