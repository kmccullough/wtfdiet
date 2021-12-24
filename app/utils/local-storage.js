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

  update(id, item) {
    if (!id) {
      return;
    }
    id = +id;
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

  delete(id) {
    if (!id) {
      return;
    }
    if (typeof id === 'object') {
      id = id.id;
    }
    localStorage.removeItem(`${this._key}:${id}`);
    id = +id;
    const { collection } = this;
    const index = collection.findIndex(item => item.id === id);
    if (index) {
      collection.splice(index, 1);
    }
    delete this.byId[id];
    this._updateIds();
  }

  clear() {
    this.collection.forEach(({ id }) => this.delete(id));
  }

  reid() {
    localStorage.removeItem(`${this._key}::ids`);
    const collection = [];
    for (let i = 0, l = localStorage.length; i < l; ++i) {
      const key = localStorage.key(i);
      if (key.startsWith(`${this._key}:`) && !key.startsWith(`${this._key}::`)) {
        collection.push(this.byId[key.substr(this._key.length + 1)]);
      }
    }
    this._updateNextId(1);
    collection
      .sort((a, b) => a.id - b.id)
      .forEach(item => {
        this.delete(item);
        this.add(item);
      });
  }

  _getNextId() {
    const nextId = localStorage.getItem(`${this._key}::nextId`);
    return +(nextId || 1);
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
