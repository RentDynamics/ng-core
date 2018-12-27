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

import { Observable } from 'rxjs';
import { CallroutingAuthService } from './callrouting-auth.service';
import { CallroutingAuthServiceConfig } from './callrouting-auth-service-config';

class CallroutingAuthServiceConfigMock implements CallroutingAuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//mock.rentdynamics.com';
  secretKey: string = '';
  userId: string = '';
}

describe('Service: CallroutingAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
          CallroutingAuthService,
        { provide: CallroutingAuthServiceConfig, useClass: CallroutingAuthServiceConfigMock },
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('can instantiate service when inject service',
    inject([CallroutingAuthService], (service: CallroutingAuthService) => {
      expect(service instanceof CallroutingAuthService).toBe(true);
    }));

  it('service config should be instanceof CallroutingAuthServiceConfigMock',
    inject([CallroutingAuthService], (service: CallroutingAuthService) => {
      expect(service.config instanceof CallroutingAuthServiceConfigMock).toBe(true);
    }));

  it('service config host should be "//mock.rentdynamics.com"',
    inject([CallroutingAuthService], (service: CallroutingAuthService) => {
      expect(service.config.host).toBe('//mock.rentdynamics.com');
    }));

  it('getHost should return //mock.rentdynamics.com from provided config',
    inject([CallroutingAuthService], (service: CallroutingAuthService) => {
      //Arrange

      //Act
      let host = service.getHost();
      //Assert
      expect(host).toEqual('//mock.rentdynamics.com');
    }));
});
