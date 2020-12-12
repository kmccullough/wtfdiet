import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';
import { cached, tracked } from '@glimmer/tracking';

import { getElementAncestorEl } from 'wtfdiet/utils/dom';
import { call } from 'wtfdiet/utils/function';

export default class PopupComponent extends Component {

  @inject documentEvents;
  @inject popups;

  element;
  @tracked left = 0;
  @tracked top = 0;

  @cached
  get target() {
    return this.args.target || this.args.activator;
  }

  @cached
  get activator() {
    return this.args.activator || this.args.target;
  }

  @cached
  get maskActivator() {
    return 'maskActivator' in this.args && !this.args.maskActivator
      ? null : this.activator;
  }

  @cached
  get maskLabel() {
    return 'maskLabel' in this.args && !this.args.maskLabel
      ? null : getElementAncestorEl(this.activator, 'label');
  }

  @cached
  get masked() {
    return [
      ...(this.maskActivator ? [ this.maskActivator ] : []),
      ...(this.maskLabel ? [ this.maskLabel ] : []),
      ...[].concat(this.args.masked || []),
    ];
  }

  @action
  didInsertPopup(el) {
    this.element = el;
    call(this.args.didInsert, null, this);
    el.remove();
  }

  @action
  updatePosition() {
    const bodyRect = document.body.getBoundingClientRect();
    const targetRect = this.target.getBoundingClientRect();
    this.left = targetRect.left - bodyRect.left;
    this.top = targetRect.bottom - bodyRect.top;
  }

  @action
  popup() {
    if (!this.popups.has(this)) {
      this.popups.add(this);
      this.updatePosition();
      this.documentEvents.mouseMask(
        [ this.element, ...this.masked ],
        () => this.popups.remove(this)
      );
    }
  }

}
