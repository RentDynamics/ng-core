/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { CoreApiService, CoreAuthServiceConfig } from '@rd/core';
import { Http } from '@angular/http';
import { CoreApiServiceMock } from '@rd/core/testing';

import { ApiOldAuthService } from './api-old-auth.service';
import { ApiOldAuthServiceConfig } from './api-old-auth-service-config';
import { MockBackend } from '@angular/http/testing';
import { CookieService, CookieOptions } from 'angular2-cookie/core';

describe('Service: ApiOldAuthSvc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiOldAuthService,
        { provide: CookieService, useClass: CookieService },
        { provide: CookieOptions, useValue: { } },
        { provide: ApiOldAuthServiceConfig, useValue: { host: '//api-old-dev.rentdynamics.com' } },
        { provide: CoreAuthServiceConfig, useValue: { host: '' } },
        { provide: CoreApiService, useValue: CoreApiServiceMock },
        { provide: Http, useClass: MockBackend }
      ]
    });
  });

  it('should ...', inject([ApiOldAuthService], (service: ApiOldAuthService) => {
    expect(service).toBeTruthy();
  }));

  it('service.config.host should equal "//api-old-dev.rentdynamics.com"', inject([ApiOldAuthService], (service: ApiOldAuthService) => {
    expect(service.config).toBeTruthy();
    expect(service.config.host).toBe('//api-old-dev.rentdynamics.com');
  }));
});
