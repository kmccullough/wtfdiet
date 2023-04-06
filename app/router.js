import EmberRouter from '@ember/routing/router';
import config from 'wtfdiet/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('invalid', { path: '/*path'});
  this.route('attendees');
  this.route('meals');
  this.route('slots');
  this.route('schedule', function() {
    this.route('year', { path: '/:year' }, function() {
      this.route('month', { path: '/:month' }, function() {
        this.route('day', { path: '/:day' });
      });
    });
  });
});
