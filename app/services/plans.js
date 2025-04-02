import Service from '@ember/service';

import { cached } from '@glimmer/tracking';

import { LocalStorageCollection } from 'wtfdiet/utils/local-storage';

const padStart = (value, maxLength = 2) =>
  String(value).padStart(maxLength, '0');

export default class PlansService extends Service {
  plansStore = new LocalStorageCollection('plans');

  getDateKey(date) {
    return padStart(date.getFullYear(), 4)
      + '-' + padStart(date.getMonth() + 1)
      + '-' + padStart(date.getDate());
  }

  get(date, slot) {
    date = this.getDateKey(date);
    const slotPlan = this.plansStore.get(date) || {};
    if (slot) {
      return slotPlan[slot.id];
    }
    return slotPlan;
  }

  set(date, slot, slotPlan) {
    date = this.getDateKey(date);
    const plan = this.plansStore.get(date) || { id: date };
    plan[slot.id] = slotPlan;
    this.plansStore.set(date, plan);
  }

  copy(slotPlan) {
    slotPlan = slotPlan || {};
    return {
      meal: slotPlan.meal || null,
      attendees: Array.isArray(slotPlan.attendees) ? [ ...slotPlan.attendees ] : [],
    };
  }

  @cached get plans() {
    return this.plansStore.collection;
  }

  @cached get plansById() {
    return this.plansStore.byId;
  }
}
