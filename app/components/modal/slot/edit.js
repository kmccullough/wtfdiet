import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class ModalSlotEditComponent extends Component {

  @inject('slots') slotService;
  @inject modal;

  editSlot = this.slotService.slotsById[this.args.modalId];
  slot;

  constructor() {
    super(...arguments);
    if (!this.editSlot) {
      this.modal.open('slot.add');
      return;
    }
    this.slot = this.slotService.copy(this.editSlot);
  }

  @action
  deleteSlot() {
    this.slotService.delete(this.editSlot);
    this.modal.close();
  }

  @action
  updateSlot() {
    this.slotService.update({
      ...this.editSlot,
      ...this.slot,
    });
    this.modal.close();
  }

}
