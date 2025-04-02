// Suppress experimental JSON import warnings
const originalEmit = process.emit;
process.emit = function(name, data, ...args) {
  if (name === 'warning'
    && typeof data === 'object'
    && data.name === 'ExperimentalWarning'
    && data.message.includes('Importing JSON modules')
  ) {
    return false;
  }
  return originalEmit.apply(process, arguments);
};
