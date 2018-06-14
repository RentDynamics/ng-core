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
import { ReportSchedulerAuthService } from './report-scheduler-auth.service';
import { ReportSchedulerAuthServiceConfig } from './report-scheduler-auth-service-config';

class ReportSchedulerAuthServiceConfigMock implements ReportSchedulerAuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//mock.rentdynamics.com';
  secretKey: string = '';
  userId: string = '';
}

describe('Service: ReportSchedulerAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
          ReportSchedulerAuthService,
        { provide: ReportSchedulerAuthServiceConfig, useClass: ReportSchedulerAuthServiceConfigMock },
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('can instantiate service when inject service',
    inject([ReportSchedulerAuthService], (service: ReportSchedulerAuthService) => {
      expect(service instanceof ReportSchedulerAuthService).toBe(true);
    }));

  it('service config should be instanceof ReportSchedulerAuthServiceConfigMock',
    inject([ReportSchedulerAuthService], (service: ReportSchedulerAuthService) => {
      expect(service.config instanceof ReportSchedulerAuthServiceConfigMock).toBe(true);
    }));

  it('service config host should be "//mock.rentdynamics.com"',
    inject([ReportSchedulerAuthService], (service: ReportSchedulerAuthService) => {
      expect(service.config.host).toBe('//mock.rentdynamics.com');
    }));

  it('getHost should return //mock.rentdynamics.com from provided config',
    inject([ReportSchedulerAuthService], (service: ReportSchedulerAuthService) => {
      //Arrange

      //Act
      let host = service.getHost();
      //Assert
      expect(host).toEqual('//mock.rentdynamics.com');
    }));
});
