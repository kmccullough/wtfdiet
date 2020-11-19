import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

/**
 * Returns a function to open a modal dialog
 */
export default class extends Helper {
  @inject modal;
  compute(params/*, hash*/) {
    return () => this.modal.open(...params);
  }
}
