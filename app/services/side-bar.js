import Service from '@ember/service';

import { tracked } from '@glimmer/tracking';
import { inject } from '@ember/service';

function getSideParam(side) {
  return side && (side.param || side.name.toLowerCase()) || null;
}

export default class SideBarService extends Service {

  sides = [
    { name: 'Meals',     icon: 'meal-icon' },
    { name: 'Attendees', icon: 'attendees-icon' },
  ];

  @inject router;

  sideQueryParam = 'side';
  routeQueryParams = {
    [this.sideQueryParam]: { refreshModel: true },
  };
  controllerQueryParams = [ this.sideQueryParam ];

  @tracked
  side;

  getSideByParam(param) {
    return typeof param === 'string'
      ? this.sides.find(s => getSideParam(s) === param.toLowerCase())
      : null;
  }

  getSideBySide(side) {
    return side
      ? this.getSideByParam(typeof side === 'string' ? side : getSideParam(side))
      : null;
  }

  processParams(params) {
    this.side = this.getSideByParam(params[this.sideQueryParam]);
  }

  setSide(side) {
    if (!side || (side = this.getSideBySide(side))) {
      this.router.transitionTo({
        queryParams: {
          [this.sideQueryParam]: side ? getSideParam(side) : undefined,
        },
      });
    }
  }

  toggleSide(side) {
    side = this.getSideBySide(side);
    const sideMatch = getSideParam(side) === getSideParam(this.side);
    if (this.side && !side || side && sideMatch) {
      this.closeSide();
    } else if (!this.side && side || side && !sideMatch) {
      this.setSide(side);
    }
  }

  closeSide() {
    this.setSide();
  }

}
