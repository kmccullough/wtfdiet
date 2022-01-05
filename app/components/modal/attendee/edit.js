import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class ModalAttendeeEditComponent extends Component {

  @inject('attendees') attendeeService;
  @inject modal;

  editAttendee = this.attendeeService.attendeesById[this.args.modalId];
  attendee;

  constructor() {
    super(...arguments);
    if (!this.editAttendee) {
      this.modal.open('attendee.add');
      return;
    }
    this.attendee = this.attendeeService.copy(this.editAttendee);
  }

  @action
  deleteAttendee() {
    this.attendeeService.delete(this.attendee);
    this.modal.close();
  }

  @action
  updateAttendee() {
    this.attendeeService.update({
      ...this.editAttendee,
      ...this.attendee,
    });
    this.modal.close();
  }

}
