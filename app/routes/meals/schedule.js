import Route from '@ember/routing/route';

import { getParentRouteName } from 'wtfdiet/utils/router';

export default class MealsScheduleRoute extends Route {
  model(params, transition) {
    // console.log(getParentRouteName(this, transition));
    return {};
  }
}
