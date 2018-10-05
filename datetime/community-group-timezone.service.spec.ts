/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { CoreApiService } from '../src/public_api';
import { CoreApiServiceMock } from '../testing';

import { CommunityGroupTimezoneService } from './community-group-timezone.service';

describe('Service: CommunityGroupTimezone', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CoreApiService, useValue: CoreApiServiceMock }, CommunityGroupTimezoneService]
    });
  });

  it('should ...', inject([CommunityGroupTimezoneService], (service: CommunityGroupTimezoneService) => {
    expect(service).toBeTruthy();
  }));

  // it('getUtcOffset should return a value', inject([CommunityGroupTimezoneService], (service: CommunityGroupTimezoneService) => {
  //   service.getUtcOffset(7, '01/22/2017 04:00:00 PM').;
  //   expect(service).toBeTruthy();
  // }));
});
