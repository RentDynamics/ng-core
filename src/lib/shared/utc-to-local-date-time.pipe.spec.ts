/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { UtcToLocalDateTimePipe } from './utc-to-local-date-time.pipe';

import { CoreApiService } from '@rd/core';
import { CoreApiServiceMock } from '@rd/core/testing';

import { TimezoneService } from './timezone.service';

declare var moment;

describe('Pipe: UtcToLocalDateTime', () => {
  let spy = {
    timezoneSvc: {
      getLocalOffset: null
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimezoneService,
        { provide: CoreApiService, useValue: CoreApiServiceMock }
      ]
    })
  });

  beforeEach(inject([TimezoneService], (tzSvc) => {
    spy.timezoneSvc.getLocalOffset = spyOn(tzSvc, 'getLocalOffset').and.callFake(() => {
      return Observable.create(moment('2017-01-22T11:56:34.388Z'));
    })
  }));

  it('create an instance', inject([TimezoneService], (tzSvc) => {
    let pipe = new UtcToLocalDateTimePipe(tzSvc);
    expect(pipe).toBeTruthy();
  }));

  // it('transform', inject([TimezoneService], (tzSvc) => {
  //   let pipe = new UtcToLocalPipe(tzSvc);
  //   let result = pipe.transform('2017-01-22T06:56:34.388Z', 7);
  //   expect(result).toBe('01/22/2017 11:56 am');
  // }));
});
