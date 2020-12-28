import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

/**
 * Returns a function to add given meal to attendee's favorites
 */
export default class extends Helper {
  @inject meals;
  compute([ mealId, attendeeId ]) {
    return () => {};
  }
}
