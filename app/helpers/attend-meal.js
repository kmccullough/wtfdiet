import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

/**
 * Returns a function to add attendee to given meal for the given date
 */
export default class extends Helper {
  @inject meals;
  compute([ mealId, date, attendeeId ]) {
    return () => {};
  }
}