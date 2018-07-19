/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ApiOldApiService } from './api-old-api.service';
import { ApiOldAuthService } from './api-old-auth.service';
import { Http, XHRBackend } from '@angular/http';
import { AuthService } from '../shared/auth.service';
import { AuthServiceConfig } from '../shared/auth-service-config';
import { CoreAuthServiceConfig } from '../core-auth-service-config';
import { ApiOldAuthServiceConfig } from './api-old-auth-service-config';

class AuthServiceConfigMock implements AuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//mock.rentdynamics.com';
  secretKey: string = '';
  userId: string = '';
}

class ApiOldAuthServiceConfigMock implements CoreAuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//mock.rentdynamics.com';
  secretKey: string = '';
  userId: string = '';
}

xdescribe('Service: ApiOldApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiOldApiService,
        AuthService,
        { provide: AuthServiceConfig, useClass: AuthServiceConfigMock },
        { provide: ApiOldAuthServiceConfig, useClass: ApiOldAuthServiceConfigMock },
        { provide: Http, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([ApiOldApiService], (service: ApiOldApiService) => {
    expect(service).toBeTruthy();
  }));
});
