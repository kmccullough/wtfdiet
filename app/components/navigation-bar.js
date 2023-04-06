import Component from '@glimmer/component';

import config from 'wtfdiet/config';

export default class NavigationBarComponent extends Component {

  locations = config.navigation.map(nav => ({
    ...nav,
  }));

}
