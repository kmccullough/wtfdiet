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
  get dates() {
    return this.args.planMeals.map((meal, i) => {
      const day = new Date();
      day.setDate(day.getDate() + i);
      return day;
    });
  }

  @cached
  get allDates() {
    const dates = [];
    for (let i = 0;  i < 32; ++i) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
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
