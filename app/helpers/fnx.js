import { helper } from '@ember/component/helper';

export default helper(function fnxHelper([ fn, ...args ], hash) {
  const { context, defaultValue, pop = 0, shift = 0 } = hash;
  fn = context && typeof fn !== 'function' ? context[fn] : fn;
  return (...moreArgs) => {
    return typeof fn !== 'function' ? defaultValue
      : fn.call(context, ...[ ...args, ...moreArgs ].slice(shift, pop ? -pop : undefined));
  };
});
