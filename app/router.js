import EmberRouter from '@ember/routing/router';
import config from 'wtfdiet/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('meal', function() {
    this.route('schedule', function() {});
  });
});
