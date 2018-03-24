/* tslint:disable:no-unused-variable */

import {
  async, inject, TestBed
} from '@angular/core/testing';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { AuthService } from './shared/auth.service';
import { AuthServiceConfig } from './shared/auth-service-config';
import { RentplusApiService } from './rentplus-api.service';
import { RentplusAuthService } from './rentplus-auth.service';
import { RentplusAuthServiceConfig } from './rentplus-auth-service-config';
import { CoreApiService } from './core-api.service';
import { CoreAuthService } from './core-auth.service';
import { CoreAuthServiceConfig } from './core-auth-service-config';

class CoreAuthServiceConfigMock implements AuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//core.rentdynamics.com';
  secretKey: string = '';
  userId: string = '';
}

class RentplusAuthServiceConfigMock implements AuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//api.rentplus.com';
  secretKey: string = '';
  userId: string = '';
}

describe('Service: RentplusApiService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        RentplusApiService,
        RentplusAuthService,
        { provide: RentplusAuthServiceConfig, useClass: RentplusAuthServiceConfigMock },
        CoreApiService,
        CoreAuthService,
        { provide: CoreAuthServiceConfig, useClass: CoreAuthServiceConfigMock },
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('can instantiate service when inject service',
    inject([RentplusApiService], (service: RentplusApiService) => {
      expect(service instanceof RentplusApiService).toBe(true);
    }));

  it('RentplusApiService getHost() should return "//api.rentplus.com"',
    inject([RentplusApiService], (service: RentplusApiService) => {
      expect(service.getHost()).toBe('//api.rentplus.com');
    }));

  it('CoreApiService getHost() should return "//core.rentdynamics.com"',
    inject([CoreApiService], (service: CoreApiService) => {
      expect(service.getHost()).toBe('//core.rentdynamics.com');
    }));

  it('CoreAuthServiceConfig host should be "//core.rentdynamics.com"',
    inject([CoreAuthServiceConfig], (config: CoreAuthServiceConfig) => {
      expect(config.host).toBe('//core.rentdynamics.com');
    }));

  it('RentplusAuthServiceConfig host should be "//api.rentplus.com"',
    inject([RentplusAuthServiceConfig], (config: RentplusAuthServiceConfig) => {
      expect(config.host).toBe('//api.rentplus.com');
    }));


  it('RentplusAuthServiceConfig authToken changes should propegate across all services',
    inject([RentplusApiService, RentplusAuthService, RentplusAuthServiceConfig], (apiSvc: RentplusApiService, authSvc: RentplusAuthService, config: RentplusAuthServiceConfig) => {
      //Arrange
      config.authToken = '1s1D2g2E3w3e';
      //Act
      let authToken = authSvc.authToken;
      //Assert
      expect(config.authToken).toEqual(authToken);
    }));
});
