import Route from '@ember/routing/route';

import { inject } from '@ember/service';

export default class ApplicationRoute extends Route {

  @inject sideBar;

  queryParams = {
    modal: { refreshModel: true },
    'modal-id': { refreshModel: true },
    ...this.sideBar.routeQueryParams,
  };

  model(params) {
    this.sideBar.processParams(params);
    return {
      modal: params.modal,
      modalId: params['modal-id'],
    }
  }

}
