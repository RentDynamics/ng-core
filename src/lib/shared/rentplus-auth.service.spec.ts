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

import { RentplusAuthService } from './rentplus-auth.service';
import { RentplusAuthServiceConfig } from './rentplus-auth-service-config';

class RentplusAuthServiceConfigMock implements RentplusAuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//mock.rentdynamics.com';
  secretKey: string = '';
  userId: string = '';
}

describe('Service: RentplusAuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        RentplusAuthService,
        { provide: RentplusAuthServiceConfig, useClass: RentplusAuthServiceConfigMock },
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('can instantiate service when inject service',
    inject([RentplusAuthService], (service: RentplusAuthService) => {
      expect(service instanceof RentplusAuthService).toBe(true);
    }));

  it('service config should be instanceof RentplusAuthServiceConfigMock',
    inject([RentplusAuthService], (service: RentplusAuthService) => {
      expect(service.config instanceof RentplusAuthServiceConfigMock).toBe(true);
    }));

  it('service config host should be "//mock.rentdynamics.com"',
    inject([RentplusAuthService], (service: RentplusAuthService) => {
      expect(service.config.host).toBe('//mock.rentdynamics.com');
    }));

  it('getHost should return //mock.rentdynamics.com from provided config',
    inject([RentplusAuthService], (service: RentplusAuthService) => {
      //Arrange

      //Act
      let host = service.getHost();
      //Assert
      expect(host).toEqual('//mock.rentdynamics.com');
    }));
});
