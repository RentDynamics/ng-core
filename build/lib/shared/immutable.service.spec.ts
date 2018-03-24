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
