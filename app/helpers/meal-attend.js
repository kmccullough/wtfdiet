import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

/**
 * Returns a function to add attendee to given meal for the given date/slot
 */
export default class extends Helper {
  @inject plans;
  compute([ date, slot, attendee ]) {
    return () => {
      const slotPlan = this.plans.copy(this.plans.get(date, slot));
      if (slotPlan.attendees.includes(attendee.id)) {
        return;
      }
      slotPlan.attendees.push(attendee.id);
      this.plans.set(date, slot, slotPlan);
    };
  }
}
