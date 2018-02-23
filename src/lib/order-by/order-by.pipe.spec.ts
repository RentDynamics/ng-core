/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { OrderByPipe } from './order-by.pipe';

describe('Pipe: OrderBy', () => {

  it('create an instance', () => {
    let pipe = new OrderByPipe();
    expect(pipe).toBeTruthy();
  });

  it('should sort booleans', () => {
    // Arrange
    let myArr = [
      { id: 1, isSubscriber: true },
      { id: 2, isSubscriber: false },
      { id: 3, isSubscriber: true },
      { id: 4, isSubscriber: false }
    ];
    let pipe = new OrderByPipe();
    // Act
    let result = pipe.transform(myArr, ['isSubscriber']);
    // Assert
    expect(result[0].isSubscriber).toBeTruthy();
    expect(result[1].isSubscriber).toBeTruthy();
    expect(result[2].isSubscriber).not.toBeTruthy();
    expect(result[3].isSubscriber).not.toBeTruthy();
  });

  it('should sort strings', () => {
    // Arrange
    let myArr = [
      { id: 1, name: 'd' },
      { id: 2, name: 'b' },
      { id: 3, name: 'a' },
      { id: 4, name: 'c' }
    ];
    let pipe = new OrderByPipe();
    // Act
    let result = pipe.transform(myArr, ['name']);
    // Assert
    expect(result[0].name).toEqual('a');
    expect(result[1].name).toEqual('b');
    expect(result[2].name).toEqual('c');
    expect(result[3].name).toEqual('d');
  });

  it('should sort numbers', () => {
    // Arrange
    let myArr = [
      { id: 1, number: 600 },
      { id: 2, number: 200 },
      { id: 3, number: 400 },
      { id: 4, number: 100 }
    ];
    let pipe = new OrderByPipe();
    // Act
    let result = pipe.transform(myArr, ['number']);
    // Assert
    expect(result[0].number).toEqual(100);
    expect(result[1].number).toEqual(200);
    expect(result[2].number).toEqual(400);
    expect(result[3].number).toEqual(600);
  });

});
