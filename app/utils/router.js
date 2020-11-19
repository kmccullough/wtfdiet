export function getParentRouteName(route) {
  // console.log(this, this.routeName, transition, transition.targetName);

  const handlerInfos = route.router.router.currentHandlerInfos;
  let parent, current;
  for (let i = 0, l = handlerInfos.length; i < l; ++i) {
    current = handlerInfos[i].handler;
    if (current.routeName === route.routeName
      || current.routeName.split('.')[1] === route.routeName
    ){
      return parent.routeName;
    }
    parent = current;
  }
  return parent;
}
