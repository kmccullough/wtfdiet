import Component from '@glimmer/component';

import { inject } from '@ember/service';
import { cached } from '@glimmer/tracking';

export default class SideBarMealsComponent extends Component {
  @inject('meals') mealService;
  @cached
  get meals() {
    return this.mealService.meals;
  }
}
