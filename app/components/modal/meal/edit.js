import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class ModalMealEditComponent extends Component {
  @inject('meals') mealService;
  @inject modal;

  editMeal = this.mealService.mealsById[this.args.modalId];
  meal;

  constructor() {
    super(...arguments);
    if (!this.editMeal) {
      this.modal.open('meal.add');
      return;
    }
    this.meal = this.mealService.copy(this.editMeal);
  }

  @action deleteMeal() {
    this.mealService.delete(this.editMeal);
    this.modal.close();
  }

  @action updateMeal() {
    this.mealService.update({
      ...this.editMeal,
      ...this.meal,
    });
    this.modal.close();
  }
}
