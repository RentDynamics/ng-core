/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { CoreApiService } from '../../src/public_api';
import { CoreApiServiceMock } from '../../testing';

import { TimezoneService } from './timezone.service';

describe('Service: Timezone', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CoreApiService, useValue: CoreApiServiceMock }, TimezoneService]
    });
  });

  it('should ...', inject([TimezoneService], (service: TimezoneService) => {
    expect(service).toBeTruthy();
  }));

  // it('getUtcOffset should return a value', inject([TimezoneService], (service: TimezoneService) => {
  //   service.getUtcOffset(7, '01/22/2017 04:00:00 PM').;
  //   expect(service).toBeTruthy();
  // }));
});
