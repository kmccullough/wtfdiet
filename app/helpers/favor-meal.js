import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

/**
 * Returns a function to add given meal to attendee's favorites
 */
export default class extends Helper {

  @inject meals;

  compute([ meal, attendee, favor ]) {
    return () => {
      const m = this.meals.mealsById[meal.id];
      if (!m.favor) {
        m.favor = {};
      }
      m.favor[attendee.id] = favor.id;
      this.meals.update({ ...m });
    };
  }

}
