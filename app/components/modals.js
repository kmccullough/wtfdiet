import Component from '@glimmer/component';

import { getOwner } from '@ember/application';
import { cached } from '@glimmer/tracking';

export default class ModalsComponent extends Component {

  @cached
  get modal() {
    const { modal } = this.args;
    if (!modal) {
      return null;
    }
    const name = `modal-${modal}`;
    return getOwner(this).factoryFor(`component:${name}`) && name || null;
  }

}
