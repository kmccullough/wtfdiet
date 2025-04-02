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

    if (document) {
      const { side } = this.sideBar;
      document.body.classList[ side ? 'add' : 'remove' ]('l-visible--side-bar');
    }

    return {
      modal: params.modal,
      modalId: params['modal-id'],
    }
  }
}
