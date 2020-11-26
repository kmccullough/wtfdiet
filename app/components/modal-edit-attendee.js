import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class ModalEditAttendeeComponent extends Component {
  @inject('attendees') attendeeService;
  @inject modal;
  attendee;
  attendeeName;
  constructor() {
    super(...arguments);
    this.attendee = this.attendeeService.getAttendee(this.args.modalId);
    if (!this.attendee) {
      this.modal.open('add-attendee');
      return;
    }
    this.attendeeName = this.attendee.name;
  }
  @action
  updateAttendee() {
    this.attendeeService.updateAttendee({
      ...this.attendee,
      name: this.attendeeName,
    });
    this.modal.close();
  }
}
