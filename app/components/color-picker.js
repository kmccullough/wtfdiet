import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ColorButtonComponent extends Component {
  @inject popups;

  @tracked color;
  @tracked customColor = false;

  popup;

  constructor() {
    super(...arguments);
    this.didUpdateColor();
  }

  @action didInsertButton(el) {
    this.button = el;
  }

  @action didUpdateColor() {
    this.color = this.args.color;
  }

  @action onClick() {
    this.popup.open();
  }

  @action didInsertPopup(popup) {
    this.popup = popup;
  }

  pickColor(color) {
    this.color = color;
    this.args.onPick?.(this.color);
    this.popups.remove(this.popup);
  }

  @action onPickPaletteColor(color) {
    this.pickColor(color);
  }

  @action onPickCustomColor(color) {
    this.pickColor(color);
  }
}
