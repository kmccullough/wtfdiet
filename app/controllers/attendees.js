import Controller from '@ember/controller';

import { inject } from '@ember/service';
import { cached } from '@glimmer/tracking';

export default class AttendeesController extends Controller {

  @inject('attendees') attendeeService;

  @cached get attendees() {
    return this.attendeeService.attendees;
  }

}
