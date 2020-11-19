import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  queryParams = {
    modal: { refreshModel: true },
    'modal-id': { refreshModel: true },
  };
  model(params, transition) {
    return {
      modal: params.modal,
      modalId: params['modal-id'],
    }
  }
}
