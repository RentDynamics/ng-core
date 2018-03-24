import { Injectable } from '@angular/core';

@Injectable()
export class ImmutableService {

  constructor() { }

  copy(arr) {
    if (!arr)
      return [];
    return [...arr];
  }

  concat(arr, items) {
    arr = arr || [];
    items = items || [];
    return [...arr, ...items]
  }

  delete(arr, index) {
    if (!arr)
      return [];
    return arr.slice(0, index).concat(arr.slice(index + 1))
  }

  pop(arr) {
    if (!arr)
      return [];
    return arr.slice(0, -1)
  }

  push(arr, newEntry) {
    arr = arr || [];
    if (!newEntry)
      return arr;
    return [...arr, newEntry]
  }

  shift(arr) {
    if (!arr)
      return [];
    return arr.slice(1)
  }

  splice(arr, start, deleteCount, ...items) {
    return [...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount)]
  }

  sort(arr, compareFunction) {
    arr = arr || [];
    return [...arr].sort(compareFunction)
  }
}
