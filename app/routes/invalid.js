import Route from '@ember/routing/route';

export default class InvalidRoute extends Route {
  beforeModel({ to: { params: { path } } }) {
    if (path.startsWith('meal/schedule/')) {
      // Transition to schedule from deprecated route
      this.transitionTo('schedule');
    } else {
      this.transitionTo('schedule');
    }
  }
}
