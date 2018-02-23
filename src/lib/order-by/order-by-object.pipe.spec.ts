/* tslint:disable:no-unused-variable */

import {
  async, inject
} from '@angular/core/testing';
import { OrderByObjectPipe } from './order-by-object.pipe';

describe('Pipe: OrderBy', () => {
  it('create an instance', () => {
    let pipe = new OrderByObjectPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms array correctly', () => {
    let pipe = new OrderByObjectPipe();
    let result = pipe.transform([{id: 3}, {id: 1}], ['id']);
    expect(result[0].id).toBe(1);
  });
});
