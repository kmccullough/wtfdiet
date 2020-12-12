import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class ModalAddAttendeeComponent extends Component {

  @inject('attendees') attendeeService;
  @inject modal;

  attendeeName;
  attendeeColor;

  @action
  addAttendee() {
    this.attendeeService.addAttendee({
      name: this.attendeeName,
      color: this.attendeeColor,
    });
    this.attendeeName = '';
    this.attendeeColor = '';
    this.modal.close();
  }

}
