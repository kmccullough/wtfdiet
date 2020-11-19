import Component from '@glimmer/component';

import { cached } from '@glimmer/tracking';

export default class MealPlanScheduleComponent extends Component {
  @cached
  get dates() {
    return this.args.planMeals.map((meal, i) => {
      const day = new Date();
      day.setDate(day.getDate() + i);
      return day;
    });
  }
}
