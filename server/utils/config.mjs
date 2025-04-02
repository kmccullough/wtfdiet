export function bool(...values) {
  for (const v of values) {
    if (typeof v === 'boolean' || !isNaN(v)) {
      return Boolean(v);
    }
    if (v === 'false' || v === 'true') {
      return v === 'true';
    }
  }
  return false;
}

export function num(...values) {
  for (const v of values) {
    if (typeof v === 'number') {
      return v;
    }
    if (v && typeof v === 'string' && !isNaN(v)) {
      return +v;
    }
  }
  return 0;
}
