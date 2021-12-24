import Service from '@ember/service';

import { cached } from '@glimmer/tracking';

import { LocalStorageCollection } from 'wtfdiet/utils/local-storage';
import { randomize } from 'wtfdiet/utils/random';

export default class MealsService extends Service {

  mealsStore = new LocalStorageCollection('meals');

  add(meal) {
    this.mealsStore.add(meal);
  }

  delete(meal) {
    this.mealsStore.delete(meal);
  }

  update(meal) {
    if (!meal || !meal.id) {
      return;
    }
    this.mealsStore.update(meal.id, meal);
  }

  @cached
  get meals() {
    return this.mealsStore.collection;
  }

  @cached
  get mealsById() {
    return this.mealsStore.byId;
  }

  @cached
  get randomMeals() {
    return randomize(this.meals, this.meals.length * 3);
  }

}
