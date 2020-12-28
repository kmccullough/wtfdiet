import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

/**
 * Returns a function to pin the given meal to the schedule for the given date
 */
export default class extends Helper {
  @inject meals;
  compute([ mealId, date ]) {
    return () => {};
  }
}
