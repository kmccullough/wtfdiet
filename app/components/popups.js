import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';
import { cached } from '@glimmer/tracking';

export default class PopupsComponent extends Component {

  @inject('popups') popupsService;

  element;

  @cached
  get popups() {
    return this.popupsService.popups;
  }

  @action
  didInsertPopups(element) {
    this.element = element;
    this.didUpdatePopups();
  }

  @action
  didUpdatePopups() {
    this.element.innerHTML = '';
    this.popupsService.popups
      .forEach(p => this.element.appendChild(p.element));
  }

}
