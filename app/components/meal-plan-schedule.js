import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';
import { cached } from '@glimmer/tracking';

export default class MealPlanScheduleComponent extends Component {

  @inject('attendees') attendeeService;
  @inject('meals') mealService;
  @inject('plans') planService;
  @inject('slots') slotService;
  @inject popups;

  @cached
  get attendees() {
    return this.attendeeService.attendees;
  }

  @cached
  get slots() {
    return this.slotService.slots;
  }

  @cached
  get mealsById() {
    return this.mealService.mealsById;
  }

  @cached
  get plansById() {
    return this.planService.plansById;
  }

  @action
  addAnAttendee(date, attendee) {
    console.log('addAnAttendee', date, attendee);
  }

}
