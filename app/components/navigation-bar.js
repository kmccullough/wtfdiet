import Component from '@glimmer/component';

import config from 'wtfdiet/config';

export default class NavigationBarComponent extends Component {
  get locations() {
    return config.navigation.map(nav => ({ ...nav }));
  };
}
