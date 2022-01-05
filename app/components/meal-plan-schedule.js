import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';
import { cached } from '@glimmer/tracking';

export default class MealPlanScheduleComponent extends Component {

  @inject('attendees') attendeeService;
  @inject popups;

  @cached
  get attendees() {
    return this.attendeeService.attendees;
  }

  @cached
  get dates() {
    return this.args.planMeals.map((meal, i) => {
      const day = new Date();
      day.setDate(day.getDate() + i);
      return day;
    });
  }

  @action
  addAnAttendee(date, attendee) {
    console.log('addAnAttendee', date, attendee);
  }

}
