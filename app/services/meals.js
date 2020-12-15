import Service from '@ember/service';

import { inject } from '@ember/service';
import { cached } from '@glimmer/tracking';

import { randomize } from 'wtfdiet/utils/random';

export default class MealsService extends Service {

  @inject mealsStore;

  getMeal(id) {
    return this.mealsStore.getMeal(id);
  }

  addMeal(meal) {
    this.mealsStore.addMeal(meal);
  }

  updateMeal(meal) {
    if (!meal || !meal.id) {
      return;
    }
    this.mealsStore.updateMeal(meal.id, meal);
  }

  @cached
  get meals() {
    return this.mealsStore.mealsArray;
  }

  @cached
  get mealsById() {
    return this.mealsStore.mealsById;
  }

  @cached
  get randomMeals() {
    return randomize(this.meals, this.meals.length * 3);
  }

}
