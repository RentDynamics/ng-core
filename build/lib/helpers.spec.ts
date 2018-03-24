/* tslint:disable:no-unused-variable */

import {
  async, inject
} from '@angular/core/testing';
import { extend, isBoolean, isDate, isString, equals } from './helpers';

describe('Helpers', () => {
  it('extend({ id: 1 }, { name: "one" }) returns { id: 1, name: "one" }', () => {
    expect(extend({ id: 1 }, { name: "one" })).toEqual({ id: 1, name: "one" });
  });

  it('isBoolean(true) resolves truthy', () => {
    expect(isBoolean(true)).toBeTruthy();
  });

  it('isDate(new Date()) resolves truthy', () => {
    expect(isDate(new Date())).toBeTruthy();
  });

  it('isString("turbonemesis") resolves truthy', () => {
    expect(isString("turbonemesis")).toBeTruthy();
  });

  it('equals("turbonemesis", "turbonemesis") resolves truthy', () => {
    expect(equals("turbonemesis", "turbonemesis")).toBeTruthy();
  });

  it('equals(1, 1) resolves truthy', () => {
    expect(equals(1, 1)).toBeTruthy();
  });

  it('equals(1, 2) resolves falsy', () => {
    expect(equals(1, 2)).toBeFalsy();
  });

  it('equals([1, 2], [1, 2]) resolves truthy', () => {
    expect(equals([1, 2], [1, 2])).toBeTruthy();
  });

  it('equals([1, 2], [2, 2]) resolves falsy', () => {
    expect(equals([1, 2], [2, 2])).toBeFalsy();
  });

  it('equals({ id: 1 }, { id: 1 }) resolves truthy', () => {
    expect(equals({ id: 1 }, { id: 1 })).toBeTruthy();
  });

  it('equals({ id: 1 }, { id: 2 }) resolves falsy', () => {
    expect(equals({ id: 1 }, { id: 2 })).toBeFalsy();
  });

  // it('isBlankObject({}) resolves truthy', () => {
  //   expect(isBlankObject({})).toBeTruthy();
  // });
});
