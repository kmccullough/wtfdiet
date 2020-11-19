import Route from '@ember/routing/route';

export default class MealsIndexRoute extends Route {
  beforeModel() {
    this.transitionTo('meals.schedule');
  }
}
