import Route from '@ember/routing/route';

export default class MealIndexRoute extends Route {

  beforeModel() {
    this.transitionTo('meal.schedule');
  }

}
