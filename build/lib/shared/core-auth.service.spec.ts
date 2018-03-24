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
import { CoreAuthService } from './core-auth.service';
import { CoreAuthServiceConfig } from './core-auth-service-config';

class CoreAuthServiceConfigMock implements AuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//mock.rentdynamics.com';
  secretKey: string = '';
  userId: string = '';
}

describe('Service: CoreAuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        CoreAuthService,
        { provide: CoreAuthServiceConfig, useClass: CoreAuthServiceConfigMock },
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('can instantiate service when inject service',
    inject([CoreAuthService], (service: AuthService) => {
      expect(service instanceof AuthService).toBe(true);
    }));

  it('service config should be instanceof CoreAuthServiceConfigMock',
    inject([CoreAuthService], (service: CoreAuthService) => {
      expect(service.config instanceof CoreAuthServiceConfigMock).toBe(true);
    }));

  it('service config host should be "//mock.rentdynamics.com"',
    inject([CoreAuthService], (service: CoreAuthService) => {
      expect(service.config.host).toBe('//mock.rentdynamics.com');
    }));

  it('getHost should return //mock.rentdynamics.com from provided config',
    inject([CoreAuthService], (service: CoreAuthService) => {
      //Arrange

      //Act
      let host = service.getHost();
      //Assert
      expect(host).toEqual('//mock.rentdynamics.com');
    }));

}); 
