/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImmutableService } from './immutable.service';

describe('Service: Immutable', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImmutableService]
    });
  });

  it('should ...', inject([ImmutableService], (service: ImmutableService) => {
    expect(service).toBeTruthy();
  }));

  it('copy() should return a new immutable array', inject([ImmutableService], (service: ImmutableService) => {
    /* Arrange */
    let initialAry: any[] = [{ 
      id: 1, 
      name: 'default', 
      steps: [{
        id: 10,
        step: 1
      }] 
    }, { 
      id: 1, 
      name: 'secondary', 
      steps: [{
        id: 20,
        step: 2
      }] 
    }, { 
      id: 3, 
      name: 'tertiary', 
      steps: [{
        id: 30,
        step: 3
      }] 
    }];
    let resultAry: any[];
    /* Act */
    resultAry = service.copy(initialAry);
    resultAry[1].steps[0].description = 'hello secondary!!!!';
    /* Assert */
    expect(resultAry).toBeTruthy();
    expect(resultAry.length).toBe(3);
    expect(initialAry[1].steps[0].description).toBeUndefined();
  }));

  it('delete() should return a new immutable array with the item deleted at the index specified', inject([ImmutableService], (service: ImmutableService) => {
    /* Arrange */
    let deleteIndex: number = 2;
    let initialAry: any[] = [{ id: 1 }, { id: 2 }, { id: 3 }];
    let resultAry: any[];
    /* Act */
    resultAry = service.delete(initialAry, deleteIndex);
    /* Assert */
    expect(resultAry).toBeTruthy();
    expect(resultAry.length).toBe(2);
    expect(resultAry.map(result => result.id)).toEqual([1, 2]);
  }));

  it('concat() should concatenate the two arrays and be different from the original reference', inject([ImmutableService], (service: ImmutableService) => {
    /* Arrange */
    let initialAry: any[] = [{ id: 1 }, { id: 2 }, { id: 3 }];
    let secondAry: any[] = [{ id: 5 }, { id: 6}];
    let resultAry: any[];
    /* Act */
    resultAry = service.concat(initialAry, secondAry);
    /* Assert */
    expect(resultAry).toBeTruthy();
    expect(resultAry.length).toBe(5);
    expect(resultAry.map(result => result.id)).toEqual([1, 2, 3, 5, 6]);
  }));
});
