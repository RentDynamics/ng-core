/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ApiOldApiService } from './api-old-api.service';
import { ApiOldAuthService } from './api-old-auth.service';
import { Http } from '@angular/http';

describe('Service: ApiOldApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiOldApiService,
        { provide: ApiOldAuthService, useValue: { host: '' } },
        { provide: Http, useClass: MockBackend }
      ]
    });
  });

  it('should ...', inject([ApiOldApiService], (service: ApiOldApiService) => {
    expect(service).toBeTruthy();
  }));
});
