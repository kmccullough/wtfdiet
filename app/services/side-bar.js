import Service from '@ember/service';

import { tracked } from '@glimmer/tracking';
import { inject } from '@ember/service';

import config from 'wtfdiet/config';

function getSideParam(side) {
  return side && (side.param || side.name.toLowerCase()) || null;
}

export default class SideBarService extends Service {
  get sides() {
    return config.navigation
      .filter(nav => nav.side !== false)
      .map(nav => ({ ...nav }));
  }

  @inject router;

  sideQueryParam = 'side';
  routeQueryParams = {
    [this.sideQueryParam]: { refreshModel: true },
  };

  @tracked side;

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
