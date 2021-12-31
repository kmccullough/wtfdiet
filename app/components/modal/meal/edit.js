import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class ModalMealEditComponent extends Component {

  @inject('meals') mealService;
  @inject modal;

  meal;
  mealName;

  constructor() {
    super(...arguments);
    this.meal = this.mealService.mealsById[this.args.modalId];
    if (!this.meal) {
      this.modal.open('meal.add');
      return;
    }
    this.mealName = this.meal.name;
  }

  @action
  deleteMeal() {
    this.mealService.delete(this.meal.id);
    this.modal.close();
  }

  @action
  updateMeal() {
    this.mealService.update({
      ...this.meal,
      name: this.mealName,
    });
    this.modal.close();
  }

}
