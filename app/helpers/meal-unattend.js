import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

/**
 * Returns a function to remove attendee from given meal for the given date/slot
 */
export default class extends Helper {
  @inject plans;
  compute([ date, slot, attendee ]) {
    return () => {
      const slotPlan = this.plans.copy(this.plans.get(date, slot));
      const index = slotPlan.attendees.indexOf(attendee.id);
      if (index < 0) {
        return;
      }
      slotPlan.attendees.splice(index, 1);
      this.plans.set(date, slot, slotPlan);
    }
  }
}
