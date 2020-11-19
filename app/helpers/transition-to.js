import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

/**
 * Returns a function to transition to the given route
 */
export default class extends Helper {
  @inject router;
  compute(params/*, hash*/) {
    return () => this.router.transitionTo(...params);
  }
}
