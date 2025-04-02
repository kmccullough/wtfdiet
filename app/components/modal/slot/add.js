import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class ModalSlotAddComponent extends Component {
  @inject('slots') slotService;
  @inject modal;

  slot = this.slotService.copy();

  @action addSlot() {
    this.slotService.add(this.slot);
    this.slot = this.slotService.copy();
    this.modal.close();
  }
}
