import Service from '@ember/service';

import ObjectProxy from '@ember/object/proxy';
import { cached, tracked } from '@glimmer/tracking';
import { TrackedArray } from 'tracked-built-ins';

export default class MealsStoreService extends Service {

  _key = 'meals';
  _mealIds;

  getMealsArrayFromStorage() {
    const meals = [];
    this.getMealIds().forEach(id => meals.push(this.getMeal(id)));
    return meals;
  }

  @tracked
  mealsArray = new TrackedArray(this.getMealsArrayFromStorage());

  @cached
  get mealsById() {
    const meals = {};
    this.getMealIds().forEach(id => meals[id] = this.getMeal(id));
    return ObjectProxy.create({ content: meals });
  }

  getNextMealId() {
    const nextId = localStorage.getItem(`${this._key}::nextId`);
    return +(nextId || 1);
  }

  updateNextMealId(id) {
    localStorage.setItem(`${this._key}::nextId`, id);
  }

  getMealIds() {
    if (this._mealIds) {
      return this._mealIds;
    }
    let ids = localStorage.getItem(`${this._key}::ids`);
    return this._mealIds = new Set(
      ids && Array.isArray(ids = JSON.parse(ids)) ? ids.map(id => +id) : []
    );
  }

  get length() {
    return this.getMealIds().size;
  }

  updateMealIds() {
    localStorage.setItem(`${this._key}::ids`, JSON.stringify(Array.from(this.getMealIds())));
  }

  _getMeal(id) {
    const ids = this.getMealIds();
    const key = `${this._key}:${id}`;
    let meal = localStorage.getItem(key);
    if (!meal || !(meal = JSON.parse(meal)) || typeof meal !== 'object') {
      localStorage.removeItem(key);
      ids.delete(id);
      this.updateMealIds();
      return;
    }
    return meal;
  }

  getMeal(id) {
    if (!id) {
      return;
    }
    id = +id;
    const ids = this.getMealIds();
    if (!ids.has(id)) {
      return;
    }
    return this._getMeal(id);
  }

  updateMeal(id, meal) {
    if (!id) {
      return;
    }
    id = +id;
    if (!meal || typeof meal !== 'object' || !this.getMealIds().has(id)) {
      return;
    }
    meal.id = id;
    const { mealsArray } = this;
    const mealIndex = mealsArray.findIndex(meal => meal.id === id);
    if (mealIndex >= 0) {
      mealsArray.splice(mealIndex, 1, meal);
    }
    this.mealsById.set(id, meal);
    localStorage.setItem(`${this._key}:${id}`, JSON.stringify(meal));
  }

  addMeal(meal) {
    if (!meal || typeof meal !== 'object') {
      return;
    }
    const id = this.getNextMealId();
    this.updateNextMealId(id + 1);
    meal.id = id;
    this.getMealIds().add(id);
    this.updateMealIds();
    this.mealsArray.push(meal);
    this.mealsById.set(id, meal);
    localStorage.setItem(`${this._key}:${id}`, JSON.stringify(meal));
  }

  _deleteMeal(id) {
    if (!id) {
      return;
    }
    const ids = this.getMealIds();
    if (typeof id === 'object') {
      id = id.id;
    }
    id = +id;
    ids.delete(id);
    const { mealsArray } = this;
    const mealIndex = mealsArray.findIndex(meal => meal.id === id);
    if (mealIndex) {
      mealsArray.splice(mealIndex, 1);
    }
    const { mealsById } = this;
    if (mealsById[id]) {
      mealsById.removeObject(id);
    }
    localStorage.removeItem(`${this._key}:${id}`);
    this.updateMealIds();
  }

  deleteMeal(id) {
    if (!id) {
      return;
    }
    const ids = this.getMealIds();
    if (typeof id === 'object') {
      id = id.id;
    } else if (!ids.has(id)) {
      return;
    }
    this._deleteMeal(id);
  }

  clearMeals() {
    this.getMealIds().forEach(id => this.deleteMeal(id));
  }

  reidMeals() {
    localStorage.removeItem(`${this._key}::ids`);
    const meals = [];
    for (let i = 0, l = localStorage.length; i < l; ++i) {
      const key = localStorage.key(i);
      if (key.startsWith(`${this._key}:`) && !key.startsWith(`${this._key}::`)) {
        meals.push(this._getMeal(key.substr(this._key.length + 1)));
      }
    }
    this.updateNextMealId(1);
    meals.sort((a, b) => a.id - b.id).forEach(meal => {
      this._deleteMeal(meal);
      this.addMeal(meal);
    });
  }

}
