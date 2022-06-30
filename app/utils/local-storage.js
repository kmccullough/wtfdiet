import { tracked } from '@glimmer/tracking';
import { TrackedArray, TrackedObject } from 'tracked-built-ins';

export function localStorageParse(key) {
  let result;
  try {
    result = JSON.parse(localStorage.getItem(key));
  } catch(e) {}
  return result;
}

export class LocalStorageCollection {

  constructor(key) {
    if (!key) {
      throw new Error('Expected local-storage key');
    }
    this._key = key;
    const { collection, byId } = this;
    const ids = localStorageParse(`${this._key}::ids`);
    (Array.isArray(ids) ? ids : []).forEach(id => {
      const key = `${this._key}:${id}`;
      const item = localStorageParse(key);
      if (!item || typeof item !== 'object') {
        localStorage.removeItem(key);
      } else {
        collection.push(item);
        byId[id] = item;
      }
    });
  }

  @tracked
  collection = new TrackedArray();
  @tracked
  byId = new TrackedObject();

  get length() {
    return this.collection.length;
  }

  /**
   * Get item with given ID
   * @param {string|number} id
   */
  get(id) {
    return this.byId[id];
  }

  /**
   * Add item with next ID
   * @param {object} item
   */
  add(item) {
    if (!item || typeof item !== 'object') {
      return;
    }
    const id = this._getNextId();
    this._updateNextId(id + 1);
    item.id = id;
    localStorage.setItem(`${this._key}:${id}`, JSON.stringify(item));
    this.collection.push(item);
    this.byId[id] = item;
    this._updateIds();
  }

  /**
   * Update specific item by ID if it exists
   * @param {string|number} id
   * @param {object} item
   */
  update(id, item) {
    if (!id) {
      return;
    }
    if (!item || typeof item !== 'object' || !this.byId[id]) {
      return;
    }
    item.id = id;
    const { collection } = this;
    const index = collection.findIndex(item => item.id === id);
    if (index >= 0) {
      collection.splice(index, 1, item);
    }
    localStorage.setItem(`${this._key}:${id}`, JSON.stringify(item));
    this.byId[id] = item;
  }

  /**
   * Set/create specific item by ID
   * @param {string|number} id
   * @param {object} item
   */
  set(id, item) {
    if (!id) {
      return;
    }
    if (!item || typeof item !== 'object') {
      return;
    }
    item.id = id;
    const { collection } = this;
    let index = -1;
    if (this.byId[id]) {
      index = collection.findIndex(item => item.id === id);
    }
    if (index >= 0) {
      collection.splice(index, 1, item);
    } else {
      collection.push(item);
    }
    localStorage.setItem(`${this._key}:${id}`, JSON.stringify(item));
    this.byId[id] = item;
    this._updateIds();
  }

  /**
   * Delete specific item by ID
   * @param {string|number} id
   */
  delete(id) {
    if (!id) {
      return;
    }
    if (typeof id === 'object') {
      id = id.id;
    }
    localStorage.removeItem(`${this._key}:${id}`);
    const { collection } = this;
    const index = collection.findIndex(item => item.id === id);
    if (index >= 0) {
      collection.splice(index, 1);
    }
    delete this.byId[id];
    this._updateIds();
  }

  /**
   * Clear all items
   */
  clear() {
    this.collection.forEach(({ id }) => this.delete(id));
  }

  _getNextId() {
    const nextId = localStorage.getItem(`${this._key}::nextId`);
    return +(nextId || 1);
  }

  reorder(collection) {
    this.collection = new TrackedArray(collection);
    this._updateIds();
  }

  _updateNextId(id) {
    localStorage.setItem(`${this._key}::nextId`, id);
  }

  _updateIds() {
    localStorage.setItem(`${this._key}::ids`, JSON.stringify(
      this.collection.map(({ id }) => id)
    ));
  }

}
