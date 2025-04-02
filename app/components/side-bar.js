import Component from '@glimmer/component';

import { getOwner } from '@ember/application';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import { cached } from '@glimmer/tracking';

export default class SideBarComponent extends Component {
  @inject sideBar;

  @cached get side() {
    return this.sideBar.side;
  }

  @cached get sides() {
    return this.sideBar.sides.map(side => ({
      classAffix: side.name.toLowerCase(),
      selected: side === this.side,
      ...side,
    }));
  }

  @cached get sideComponent() {
    if (!this.side) {
      return null;
    }
    const side = this.side.component || this.side.name.toLowerCase();
    const name = `side-bar/${side.replace('.', '/')}`;
    return getOwner(this).factoryFor(`component:${name}`) && name || null;
  }

  @action toggleSide(side) {
    this.sideBar.toggleSide(side);
  }

  @action closeSide() {
    this.sideBar.closeSide();
  }
}
