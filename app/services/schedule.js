import Service from '@ember/service';

import { cached, tracked } from '@glimmer/tracking';

export default class ScheduleService extends Service {

  @cached
  get date() {
    const { _year, _month, _day } = this;
    if (_year && (_month || _month === 0) && _day) {
      return new Date(_year, _month, _day);
    }
    return new Date;
  }

  @cached
  get year() {
    return this.date.getFullYear();
  }

  @cached
  get month() {
    return this.date.getMonth() + 1;
  }

  @cached
  get day() {
    return this.date.getDate()
  }

  setYear(year) {
    this._year = year;
  }

  setMonth(month) {
    this._month = month ? month - 1 : month;
  }

  setDay(day) {
    this._day = day;
  }

  @tracked _year;
  @tracked _month;
  @tracked _day;

}
