import Service from '@ember/service';

import ObjectProxy from '@ember/object/proxy';
import { cached, tracked } from '@glimmer/tracking';
import { TrackedArray } from 'tracked-built-ins';

export default class AttendeesStoreService extends Service {

  _key = 'attendees';
  _attendeeIds;

  getAttendeesArrayFromStorage() {
    const attendees = [];
    this.getAttendeeIds().forEach(id => attendees.push(this.getAttendee(id)));
    return attendees;
  }

  @tracked
  attendeesArray = new TrackedArray(this.getAttendeesArrayFromStorage());

  @cached
  get attendeesById() {
    const attendees = {};
    this.getAttendeeIds().forEach(id => attendees[id] = this.getAttendee(id));
    return ObjectProxy.create({ content: attendees });
  }

  getNextAttendeeId() {
    const nextId = localStorage.getItem(`${this._key}::nextId`);
    return +(nextId || 1);
  }

  updateNextAttendeeId(id) {
    localStorage.setItem(`${this._key}::nextId`, id);
  }

  getAttendeeIds() {
    if (this._attendeeIds) {
      return this._attendeeIds;
    }
    let ids = localStorage.getItem(`${this._key}::ids`);
    return this._attendeeIds = new Set(
      ids && Array.isArray(ids = JSON.parse(ids)) ? ids.map(id => +id) : []
    );
  }

  get length() {
    return this.getAttendeeIds().size;
  }

  updateAttendeeIds() {
    localStorage.setItem(`${this._key}::ids`, JSON.stringify(Array.from(this.getAttendeeIds())));
  }

  _getAttendee(id) {
    const ids = this.getAttendeeIds();
    const key = `${this._key}:${id}`;
    let attendee = localStorage.getItem(key);
    if (!attendee || !(attendee = JSON.parse(attendee)) || typeof attendee !== 'object') {
      localStorage.removeItem(key);
      ids.delete(id);
      this.updateAttendeeIds();
      return;
    }
    return attendee;
  }

  getAttendee(id) {
    if (!id) {
      return;
    }
    id = +id;
    const ids = this.getAttendeeIds();
    if (!ids.has(id)) {
      return;
    }
    return this._getAttendee(id);
  }

  updateAttendee(id, attendee) {
    if (!id) {
      return;
    }
    id = +id;
    if (!attendee || typeof attendee !== 'object' || !this.getAttendeeIds().has(id)) {
      return;
    }
    attendee.id = id;
    const { attendeesArray } = this;
    const attendeeIndex = attendeesArray.findIndex(attendee => attendee.id === id);
    if (attendeeIndex >= 0) {
      attendeesArray.splice(attendeeIndex, 1, attendee);
    }
    this.attendeesById.set(id, attendee);
    localStorage.setItem(`${this._key}:${id}`, JSON.stringify(attendee));
  }

  addAttendee(attendee) {
    if (!attendee || typeof attendee !== 'object') {
      return;
    }
    const id = this.getNextAttendeeId();
    this.updateNextAttendeeId(id + 1);
    attendee.id = id;
    this.getAttendeeIds().add(id);
    this.updateAttendeeIds();
    this.attendeesArray.push(attendee);
    this.attendeesById.set(id, attendee);
    localStorage.setItem(`${this._key}:${id}`, JSON.stringify(attendee));
  }

  _deleteAttendee(id) {
    if (!id) {
      return;
    }
    const ids = this.getAttendeeIds();
    if (typeof id === 'object') {
      id = id.id;
    }
    id = +id;
    ids.delete(id);
    const { attendeesArray } = this;
    const attendeeIndex = attendeesArray.findIndex(attendee => attendee.id === id);
    if (attendeeIndex) {
      attendeesArray.splice(attendeeIndex, 1);
    }
    const { attendeesById } = this;
    if (attendeesById[id]) {
      attendeesById.removeObject(id);
    }
    localStorage.removeItem(`${this._key}:${id}`);
    this.updateAttendeeIds();
  }

  deleteAttendee(id) {
    if (!id) {
      return;
    }
    const ids = this.getAttendeeIds();
    if (typeof id === 'object') {
      id = id.id;
    } else if (!ids.has(id)) {
      return;
    }
    this._deleteAttendee(id);
  }

  clearAttendees() {
    this.getAttendeeIds().forEach(id => this.deleteAttendee(id));
  }

  reidAttendees() {
    localStorage.removeItem(`${this._key}::ids`);
    const attendees = [];
    for (let i = 0, l = localStorage.length; i < l; ++i) {
      const key = localStorage.key(i);
      if (key.startsWith(`${this._key}:`) && !key.startsWith(`${this._key}::`)) {
        attendees.push(this._getAttendee(key.substr(this._key.length + 1)));
      }
    }
    this.updateNextAttendeeId(1);
    attendees.sort((a, b) => a.id - b.id).forEach(attendee => {
      this._deleteAttendee(attendee);
      this.addAttendee(attendee);
    });
  }

}
