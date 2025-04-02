import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';
import { cached } from '@glimmer/tracking';

export default class PopupsComponent extends Component {
  @inject('popups') popupsService;

  _element;

  @cached get popups() {
    return this.popupsService.popups;
  }

  @action didInsertPopups(element) {
    this._element = element;
    this.didUpdatePopups();
    window.addEventListener('scroll', this.updatePositions, true);
  }

  @action updatePositions() {
    this.popupsService.popups.forEach(p => p.updatePosition());
  }

  @action didUpdatePopups() {
    this._element.innerHTML = '';
    this.popupsService.popups
      .forEach(p => {
        this._element.appendChild(p._element);
        p.updatePosition();
      });
  }

  @action willDestroyPopups() {
    window.removeEventListener('scroll', this.updatePositions, true);
  }
}
