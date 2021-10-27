import Helper from '@ember/component/helper';

import { set } from '@ember/object';

export default class extends Helper {

  compute(args0) {
    return (...args1) => {
      const [ ctx, key, val ]  = [ ...args0, ...args1 ];
      set(ctx, key, val);
      return val;
    };
  }

}
