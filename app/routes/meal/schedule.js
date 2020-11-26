import Route from '@ember/routing/route';

import { getParentRouteName } from 'wtfdiet/utils/router';

export default class MealScheduleRoute extends Route {
  model(params) {
    // console.log(getParentRouteName(this, transition));
    return {};
  }
}
