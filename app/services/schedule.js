import Service from '@ember/service';

import { action } from '@ember/object';
import { once } from '@ember/runloop';
import { cached, tracked } from '@glimmer/tracking';

/**
 * Handles settings for display of meal-plan-schedule
 */
export default class ScheduleService extends Service {

  /**
   * Date object representing date set on service or today
   * @type {Date}
   */
  @cached
  get date() {
    return this._date;
  }

  /**
   * Full year representation of date set on service or today
   * @type {number}
   */
  @cached
  get year() {
    return this.date.getFullYear();
  }

  /**
   * 1-indexed representation of month of date set on service or today
   * @type {number}
   */
  @cached
  get month() {
    return this.date.getMonth() + 1;
  }

  /**
   * Day of month of date set on service or today
   * @type {number}
   */
  @cached
  get day() {
    return this.date.getDate()
  }

  /**
   * Set year used on schedule
   * @param {number|string} year
   */
  @action
  setYear(year) {
    this._year = year;
    once(this, '_setDate');
  }

  /**
   * Set 1-indexed month used on schedule
   * @param {number|string} month
   */
  @action
  setMonth(month) {
    this._month = month ? month - 1 : month;
    once(this, '_setDate');
  }

  /**
   * Set day of month used on schedule
   * @param {number|string} day
   */
  @action
  setDay(day) {
    this._day = day;
    once(this, '_setDate');
  }

  /**
   * Array of dates visible on schedule
   * @returns {Date[]}
   */
  @tracked dates = [];

  @tracked _year;
  @tracked _month;
  @tracked _day;
  @tracked _date;

  _setDate() {
    const { _year, _month, _day } = this;
    this._date = _year && (_month || _month === 0) && _day
      ? new Date(_year, _month, _day) : new Date;
    this._setDates();
  }

  _setDates() {
    const time = this.date.getTime();
    const dates = [];
    for (let i = 0;  i < 32; ++i) {
      const date = new Date(time);
      date.setDate(date.getDate() + i);
      dates.push({ key: date.getTime(), value: date });
    }
    this.dates = dates;
  }

}
