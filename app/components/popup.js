import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';
import { cached } from '@glimmer/tracking';

import { getElementAncestorEl } from 'wtfdiet/utils/dom';
import { call } from 'wtfdiet/utils/function';

export default class PopupComponent extends Component {

  @inject documentEvents;
  @inject popups;

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
  updatePosition() {
    const bodyRect = document.body.getBoundingClientRect();
    const targetRect = this.target.getBoundingClientRect();
    // Position it top-left of view to get dimensions
    this._element.style.top = bodyRect.top + 'px';
    this._element.style.left = bodyRect.left + 'px';
    const { width: fullWidth, height: fullHeight } = this._element.getBoundingClientRect();
    const topY    = targetRect.top - bodyRect.top - fullHeight;
    const rightX  = targetRect.left - bodyRect.left;
    const bottomY = targetRect.bottom - bodyRect.top ;
    const leftX  = targetRect.right - bodyRect.left - fullWidth;
    this._element.style.top = (fullHeight <= bodyRect.height - bottomY ? bottomY
      : topY >= 0 ? topY
      : Math.max(0, (bodyRect.height - fullHeight) / 2)
    ) + 'px';
    this._element.style.left = (fullWidth <= bodyRect.width - rightX ? rightX
      : leftX >= 0 ? leftX
      : Math.max(0, (bodyRect.width - fullWidth) / 2)
    ) + 'px';
  }

  @action
  open() {
    if (!this.popups.has(this)) {
      this.popups.add(this);
      this.documentEvents.mouseMask(
        [ this._element, ...this.masked ],
        () =>
          this.args.onMask ? this.args.onMask()
            : this.close()
      );
    }
  }

  @action
  close() {
    this.args.onClose ? this.args.onClose()
      : this.popups.remove(this);
  }

  _element;

  @action
  didUpdateOpen() {
    if (this.args.open) {
      this.open();
    } else {
      this.popups.remove(this);
    }
  }

  @action
  willDestroyPopup() {
    this.popups.remove(this);
  }

  @action
  didInsertPopup(el) {
    this._element = el;
    call(this.args.didInsert, null, this);
    el.remove();
  }

}
