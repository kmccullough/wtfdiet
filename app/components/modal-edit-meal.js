import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class ModalEditMealComponent extends Component {

  @inject('meals') mealService;
  @inject modal;

  meal;
  mealName;

  constructor() {
    super(...arguments);
    this.meal = this.mealService.getMeal(this.args.modalId);
    if (!this.meal) {
      this.modal.open('add-meal');
      return;
    }
    this.mealName = this.meal.name;
  }

  @action
  updateMeal() {
    this.mealService.updateMeal({
      ...this.meal,
      name: this.mealName,
    });
    this.modal.close();
  }

}
