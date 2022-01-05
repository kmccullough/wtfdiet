import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class ModalMealAddComponent extends Component {

  @inject('meals') mealService;
  @inject modal;

  meal = this.mealService.copy();

  @action
  addMeal() {
    this.mealService.add(this.meal);
    this.meal = this.mealService.copy();
    this.modal.close();
  }

}
