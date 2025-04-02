import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

/**
 * Returns a function to assign randomized meal for given date/slot
 */
export default class extends Helper {
  @inject meals;
  @inject slots;
  @inject plans;
  compute([ date, slot ]) {
    return () => {
      const { meals } = this.meals;
      const slotPlan = this.plans.copy(this.plans.get(date, slot));
      const meal = meals[Math.floor(meals.length * Math.random())];
      slotPlan.meal = meal.id;
      this.plans.set(date, slot, slotPlan);
    };
  }
}
