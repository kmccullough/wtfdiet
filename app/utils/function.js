/**
 * Call given function with args
 * @param {function|*} fn
 * @param {function|*} defaultValue
 * @param {...*} [args]
 * @return {*|undefined}
 */
export function call(fn, defaultValue, ...args) {
  return isFn(fn) ? fn(...args)
    : isFn(defaultValue) ? defaultValue(...args) : defaultValue;
}

/**
 * Whether given value is a function
 * @param {function|*} fn Value to test
 * @return {boolean}
 */
export function isFn(fn) {
  return typeof fn === 'function';
}
