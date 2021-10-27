import Helper from '@ember/component/helper';

export default class extends Helper {

  compute(args) {
    return (...moreArgs) => {
      console.log(...args, ...moreArgs);
    };
  }

}
