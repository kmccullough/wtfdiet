import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class ModalAttendeeAddComponent extends Component {
  @inject('attendees') attendeeService;
  @inject modal;

  attendee = this.attendeeService.copy();

  @action addAttendee() {
    this.attendeeService.add(this.attendee);
    this.attendee = this.attendeeService.copy();
    this.modal.close();
  }
}
