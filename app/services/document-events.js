import Service from '@ember/service';

import { action } from '@ember/object';

import { isAnyElDescendentOfAnyEl } from 'wtfdiet/utils/dom';
import { call } from 'wtfdiet/utils/function';

export default class DocumentEventsService extends Service {

  mouseMasks = [];

  mouseMask(elements, callback) {
    elements = [].concat(elements || []);
    this.mouseMasks.push({
      elements,
      callback,
    });
  }

  freeMouseMask() {
    if (this.mouseMasks.length) {
      this.mouseMasks.pop();
    }
  }

  constructor() {
    super(...arguments);
    document.addEventListener('mousedown', this.mouseDownHandler, true);
    document.addEventListener('mouseup', this.mouseUpHandler, true);
    document.addEventListener('click', this.clickHandler, true);
  }

  @action
  mouseDownHandler(e) {
    if (!this.mouseMaskHandlerHard(e)) {
      return;
    }
  }

  @action
  mouseUpHandler(e) {
    if (!this.mouseMaskHandlerSoft(e)) {
      return;
    }
  }

  @action
  clickHandler(e) {
    if (!this.mouseMaskHandlerSoft(e)) {
      return;
    }
  }

  mouseMaskHandlerHard(e) {
    const { length } = this.mouseMasks;
    if (!length) {
      return true;
    }
    const mask = this.mouseMasks[length - 1];
    const isAllowedElement = isAnyElDescendentOfAnyEl(e.target, mask.elements);
    const maskFrees = true;
    if (!isAllowedElement) {
      console.log(1, isAllowedElement);
      e.preventDefault();
      e.stopImmediatePropagation();
      if (maskFrees) {
        this.freeMouseMask();
      }
      call(mask.callback, null, mask);
    }
    return isAllowedElement;
  }

  mouseMaskHandlerSoft(e) {
    const { length } = this.mouseMasks;
    if (!length) {
      return true;
    }
    const mask = this.mouseMasks[length - 1];
    const isAllowedElement = isAnyElDescendentOfAnyEl(e.target, mask.elements);
    if (!isAllowedElement) {
      console.log(2, isAllowedElement);
      e.preventDefault();
      e.stopImmediatePropagation();
    }
    return isAllowedElement;
  }

}
