import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

/**
 * Returns a function to assign given meal for given date/slot
 */
export default class extends Helper {
  @inject plans;
  compute([ date, slot, meal ]) {
    return () => {
      const slotPlan = this.plans.copy(this.plans.get(date, slot));
      slotPlan.meal = meal.id;
      this.plans.set(date, slot, slotPlan);
    };
  }
}
