import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

/**
 * Returns a function to open application settings
 */
export default class extends Helper {
  @inject meals;
  compute() {
    return () => {};
  }
}
