import Component from '@glimmer/component';

import { inject } from '@ember/service';
import { cached } from '@glimmer/tracking';

export default class SideBarAttendeesComponent extends Component {
  @inject('attendees') attendeeService;
  @cached
  get attendees() {
    return this.attendeeService.attendees;
  }
}
