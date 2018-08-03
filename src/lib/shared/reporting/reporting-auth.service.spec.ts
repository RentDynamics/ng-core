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
import { ReportingAuthService } from './reporting-auth.service';
import { ReportingAuthServiceConfig } from './reporting-auth-service-config';

class ReportingAuthServiceConfigMock implements ReportingAuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//mock.rentdynamics.com';
  secretKey: string = '';
  userId: string = '';
}

describe('Service: ReportingAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
          ReportingAuthService,
        { provide: ReportingAuthServiceConfig, useClass: ReportingAuthServiceConfigMock },
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('can instantiate service when inject service',
    inject([ReportingAuthService], (service: ReportingAuthService) => {
      expect(service instanceof ReportingAuthService).toBe(true);
    }));

  it('service config should be instanceof ReportingAuthServiceConfigMock',
    inject([ReportingAuthService], (service: ReportingAuthService) => {
      expect(service.config instanceof ReportingAuthServiceConfigMock).toBe(true);
    }));

  it('service config host should be "//mock.rentdynamics.com"',
    inject([ReportingAuthService], (service: ReportingAuthService) => {
      expect(service.config.host).toBe('//mock.rentdynamics.com');
    }));

  it('getHost should return //mock.rentdynamics.com from provided config',
    inject([ReportingAuthService], (service: ReportingAuthService) => {
      //Arrange

      //Act
      let host = service.getHost();
      //Assert
      expect(host).toEqual('//mock.rentdynamics.com');
    }));
});
