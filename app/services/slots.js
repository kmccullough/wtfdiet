import Service from '@ember/service';

import { cached } from '@glimmer/tracking';

import { LocalStorageCollection } from 'wtfdiet/utils/local-storage';

export default class PlansService extends Service {

  slotsStore = new LocalStorageCollection('slots');

  add(slot) {
    this.slotsStore.add(slot);
  }

  delete(slot) {
    this.slotsStore.delete(slot);
  }

  update(slot) {
    if (!slot || !slot.id) {
      return;
    }
    this.slotsStore.update(slot.id, slot);
  }

  copy(slot) {
    slot = slot || {};
    return {
      name: slot.name || '',
    };
  }

  reorder(slots) {
    this.slotsStore.reorder(slots);
  }

  @cached
  get slots() {
    return this.slotsStore.collection;
  }

  @cached
  get slotsById() {
    return this.slotsStore.byId;
  }

}
