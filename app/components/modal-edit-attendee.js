import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class ModalEditAttendeeComponent extends Component {

  @inject('attendees') attendeeService;
  @inject modal;

  attendee;
  attendeeName;
  attendeeColor;

  constructor() {
    super(...arguments);
    this.attendee = this.attendeeService.getAttendee(this.args.modalId);
    if (!this.attendee) {
      this.modal.open('add-attendee');
      return;
    }
    this.attendeeName = this.attendee.name;
    this.attendeeColor = this.attendee.color;
  }

  @action
  updateAttendee() {
    this.attendeeService.updateAttendee({
      ...this.attendee,
      name:  this.attendeeName,
      color: this.attendeeColor,
    });
    this.modal.close();
  }

  @action
  onPickColor(color) {
    this.attendeeColor = color;
  }

}
