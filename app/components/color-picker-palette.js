import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject } from '@ember/service';
import { cached } from '@glimmer/tracking';

export default class ColorPickerPaletteComponent extends Component {
  @inject attendees;

  @cached get attendeesByColor() {
    return new Map(
      this.attendees.attendees.map(attendee => [
        attendee.id === this.args.attendee?.id ? this.args.color : attendee.color,
        attendee
      ])
    );
  }

  @cached get colors() {
    const color = (title, hex) => ({
      title,
      hex,
      attendee: this.attendeesByColor.get(hex),
      selected: hex === this.args.color,
    });
    return [
      color('Light Red', '#f88'),
      color('Light Orange', '#fa8'),
      color('Light Yellow', '#ff8'),
      color('Light Chartreuse', '#af8'),
      color('Light Green', '#8f8'),
      color('Light Spring Green', '#8fa'),
      color('Light Cyan', '#8ff'),
      color('Light Azure', '#8af'),
      color('Light Blue', '#88f'),
      color('Light Purple', '#a8f'),
      color('Light Magenta', '#f8f'),
      color('Light Pink', '#f8a'),
      color('Red', '#f00'),
      color('Orange', '#f80'),
      color('Yellow', '#ff0'),
      color('Chartreuse', '#8f0'),
      color('Green', '#0f0'),
      color('Spring Green', '#0f8'),
      color('Cyan', '#0ff'),
      color('Azure', '#08f'),
      color('Blue', '#00f'),
      color('Purple', '#80f'),
      color('Magenta', '#f0f'),
      color('Pink', '#f08'),
    ];
  }

  @action onClickColor(color) {
    if (color.attendee && color.attendee.id !== this.args.attendee?.id) {
      alert(`That color is in use by ${color.attendee.name}. Please choose another color.`);
      return;
    }
    this.args.onPick?.(color.hex);
  }
}
