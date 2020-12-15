import Controller from '@ember/controller';

import { inject } from '@ember/service';

export default class ApplicationController extends Controller {

  @inject sideBar;

  queryParams = [
    'modal',
    'modal-id',
    ...this.sideBar.controllerQueryParams,
  ];

}
