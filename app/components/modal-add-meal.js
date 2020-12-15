import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class ModalAddMealComponent extends Component {

  @inject('meals') mealService;
  @inject modal;

  mealName;

  @action
  addMeal() {
    this.mealService.addMeal({
      name: this.mealName,
    });
    this.mealName = '';
    this.modal.close();
  }

}
