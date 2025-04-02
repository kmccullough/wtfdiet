import Component from '@glimmer/component';

import { inject } from '@ember/service';
import { cached } from '@glimmer/tracking';

export default class MealListComponent extends Component {
  @inject('attendees') attendeeService;

  favors = [ 'Reject', 'Dislike', 'Accept', 'Like', 'Love' ]
    .map((name, i) => ({ name, id: String(i + 1) }))
    .reverse();

  @cached get attendees() {
    return this.attendeeService.attendees;
  }
}
