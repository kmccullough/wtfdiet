import Service from '@ember/service';

import { TrackedArray } from 'tracked-built-ins';

export default class PopupService extends Service {

  popups = new TrackedArray();

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
