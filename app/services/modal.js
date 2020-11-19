import Service from '@ember/service';

import { inject } from '@ember/service';

export default class ModalService extends Service {
  @inject router;
  open(modal, modalId) {
    this.router.transitionTo({
      queryParams: {
        modal: modal,
        'modal-id': modalId
      }
    });
  }
  close() {
    this.router.transitionTo({
      queryParams: {
        modal: undefined,
        'modal-id': undefined
      }
    });
  }
}
