import Component from '@glimmer/component';

import { getOwner } from '@ember/application';
import { cached } from '@glimmer/tracking';

export default class ModalComponent extends Component {
  @cached
  get modal() {
    const name = `modal-${this.args.modal}`;
    return getOwner(this).factoryFor(`component:${name}`) && name;
  }
}
