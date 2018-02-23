/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { OrderByModule } from './order-by.module';
import { OrderByService } from './order-by.service';

describe('Service: OrderBy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderByService],
      imports: [OrderByModule]
    });
  });

  it('should ...', inject([OrderByService], (service: OrderByService) => {
    expect(service).toBeTruthy();
  }));
});
