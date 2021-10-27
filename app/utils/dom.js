export function resolveElsSet(els) {
  let isArray = false;
  if (!els || !(typeof els === 'string')
      && (isArray = ('forEach' in els)) && !els.length
  ) {
    return [];
  }
  if (!isArray) {
    els = [ els ];
  }
  const elements = new Set();
  els.forEach(el => {
    if (!el) {
      // Skip
    } else if (typeof el === 'string') {
      document.querySelectorAll(el)
        .forEach(e => elements.add(e));
    } else {
      elements.add(el);
    }
  });
  return elements;
}

export function resolveEls(els) {
  return Array.from(resolveElsSet(els));
}

export function getElementAncestorEl(element, ancestorEl) {
  while (element) {
    if (element === ancestorEl || element.matches && element.matches(ancestorEl))  {
      return element;
    }
    element =  element.parentNode;
  }
  return null;
}

export function isAnyElDescendentOfAnyEl(needles, haystacks) {
  needles = resolveElsSet(needles);
  if (!needles.size) {
    return false;
  }
  haystacks = resolveElsSet(haystacks);
  if (!haystacks.size) {
    return false;
  }
  for (let needle of needles) {
    while (needle) {
      if (haystacks.has(needle))  {
        return true;
      }
      needle =  needle.parentNode;
    }
  }
  return false;
}
