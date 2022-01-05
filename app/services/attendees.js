import Service from '@ember/service';

import { cached } from '@glimmer/tracking';

import { LocalStorageCollection } from 'wtfdiet/utils/local-storage';

export default class AttendeesService extends Service {

  attendeesStore = new LocalStorageCollection('attendees');

  add(attendee) {
    this.attendeesStore.add(attendee);
  }

  delete(attendee) {
    this.attendeesStore.delete(attendee);
  }

  update(attendee) {
    if (!attendee || !attendee.id) {
      return;
    }
    this.attendeesStore.update(attendee.id, attendee);
  }

  copy(attendee) {
    attendee = attendee || {};
    return {
      name: attendee.name || '',
      color: attendee.color || null,
    };
  }

  @cached
  get attendees() {
    return this.attendeesStore.collection;
  }

  @cached
  get attendeesById() {
    return this.attendeesStore.byId;
  }

}
