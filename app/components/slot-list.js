import Component from '@glimmer/component';

import { inject } from '@ember/service';
import { cached } from '@glimmer/tracking';

export default class SlotListComponent extends Component {

  @inject('slots') slotService;

  @cached
  get slots() {
    return this.slotService.slots;
  }

}
