import Service from '@ember/service';

import { inject } from '@ember/service';
import { cached } from '@glimmer/tracking';

export default class AttendeesService extends Service {
  @inject attendeesStore;
  getAttendee(id) {
    return this.attendeesStore.getAttendee(id);
  }
  addAttendee(attendee) {
    this.attendeesStore.addAttendee(attendee);
  }
  updateAttendee(attendee) {
    if (!attendee || !attendee.id) {
      return;
    }
    this.attendeesStore.updateAttendee(attendee.id, attendee);
  }
  @cached
  get attendees() {
    return this.attendeesStore.attendeesArray;
  }
  @cached
  get attendeesById() {
    return this.attendeesStore.attendeesById;
  }
}
