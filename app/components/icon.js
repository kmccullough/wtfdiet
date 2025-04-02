import Component from '@glimmer/component';

import { cached } from '@glimmer/tracking';

import config from 'wtfdiet/config';

export default class IconComponent extends Component {
  @cached get config() {
    const classModifier = this.args.icon;
    let icon = config.icons[this.args.icon];
    let rotate = this.args.rotate;
    if (icon) {
      if (icon.icon) {
        rotate = rotate || icon.rotate;
        icon = icon.icon;
      }
    } else {
      icon = this.args.icon;
    }
    return { icon, rotate, classModifier };
  }
}
