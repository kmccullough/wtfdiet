import Helper from '@ember/component/helper';

import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class extends Helper {
  @inject('slots') slotService;
  @action onChange(slots) {
    this.slotService.reorder(slots);
  }
  compute() {
    return this.onChange;
  }
}
