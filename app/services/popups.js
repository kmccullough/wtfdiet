import Service from '@ember/service';

import { tracked } from 'tracked-built-ins';

export default class PopupService extends Service {
  popups = tracked([]);

  has(popup) {
    return this.popups.includes(popup);
  }

  add(popup, multiple) {
    if (multiple || !this.has(popup)) {
      this.popups.push(popup);
    }
  }

  remove() {
    if (this.popups.length) {
      this.popups.pop();
    }
  }
}
