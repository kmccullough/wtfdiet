import Application from 'wtfdiet/app';
import config from 'wtfdiet/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
