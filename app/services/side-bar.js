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
  closedSideParam = '';

  @inject router;
  sideQueryParam = 'side';
  routeQueryParams = {
    [this.sideQueryParam]: { refreshModel: true },
  };
  controllerQueryParams = [ this.sideQueryParam ];
  defaultSide = this.sides[0];
  @tracked
  side;

  getSideByParam(param) {
    return param
      ? this.sides.find(s => getSideParam(s) === param.toLowerCase())
      : null;
  }

  getSideBySide(side) {
    return side
      ? this.getSideByParam(typeof side === 'string' ? side : getSideParam(side))
      : null;
  }

  processParams(params) {
    let side = params[this.sideQueryParam];

    if (!side || !(side = this.getSideByParam(side))) {
      // FIXME: This raises an exception on the initial page load
      this.router.replaceWith({
        queryParams: {
          [this.sideQueryParam]: getSideParam(this.defaultSide),
        },
      });
      return;
    }

    this.side = side;
  }

  setSide(side) {
    if (!side || (side = this.getSideBySide(side))) {
      this.router.transitionTo({
        queryParams: {
          [this.sideQueryParam]: side ? getSideParam(side) : this.closedSideParam,
        },
      });
    }
  }

  toggleSide(side) {
    side = this.getSideBySide(side);
    const sideMatch = getSideParam(side) === getSideParam(this.side);
    if (this.side && !side  || side && sideMatch) {
      this.closeSide();
    } else if (!this.side && side || side && !sideMatch) {
      this.setSide(side);
    }
  }

  closeSide() {
    this.setSide();
  }

}
