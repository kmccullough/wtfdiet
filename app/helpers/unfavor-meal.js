import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

/**
 * Returns a function to remove given meal from attendee's favorites
 */
export default class extends Helper {
  @inject meals;
  compute([ mealId, attendeeId ]) {
    return () => {};
  }
}
