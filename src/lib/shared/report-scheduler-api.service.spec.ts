/* tslint:disable:no-unused-variable */


import {tap} from 'rxjs/operators';
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

import { AuthService } from './shared/auth.service';
import { AuthServiceConfig } from './shared/auth-service-config';
import { ReportSchedulerApiService } from './report-scheduler-api.service';
import { ReportSchedulerAuthService } from './report-scheduler-auth.service';
import { ReportSchedulerAuthServiceConfig } from './report-scheduler-auth-service-config';
import { CoreApiService } from './core-api.service';
import { CoreAuthService } from './core-auth.service';
import { CoreAuthServiceConfig } from './core-auth-service-config';

class AuthServiceConfigMock implements AuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//mock.rentdynamics.com';
  secretKey: string = '';
  userId: string = '';
}

class CoreAuthServiceConfigMock implements AuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//core.rentdynamics.com';
  secretKey: string = '';
  userId: string = '';
}

class ReportSchedulerAuthServiceConfigMock implements AuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//report-scheduler-api.rentdynamics.com';
  secretKey: string = '';
  userId: string = '';
}

describe('Service: ReportSchedulerApiService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
          ReportSchedulerApiService,
        ReportSchedulerAuthService,
        AuthService,
        { provide: AuthServiceConfig, useClass: AuthServiceConfigMock },
        { provide: ReportSchedulerAuthServiceConfig, useClass: ReportSchedulerAuthServiceConfigMock },
        CoreApiService,
        CoreAuthService,
        { provide: CoreAuthServiceConfig, useClass: CoreAuthServiceConfigMock },
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('can instantiate service when inject service',
    inject([ReportSchedulerApiService], (service: ReportSchedulerApiService) => {
      expect(service instanceof ReportSchedulerApiService).toBe(true);
    }));

  it('ReportSchedulerApiService getHost() should return "//report-scheduler-api.rentdynamics.com"',
    inject([ReportSchedulerApiService], (service: ReportSchedulerApiService) => {
      expect(service.getHost()).toBe('//report-scheduler-api.rentdynamics.com');
    }));

  it('CoreApiService getHost() should return "//core.rentdynamics.com"',
    inject([CoreApiService], (service: CoreApiService) => {
      expect(service.getHost()).toBe('//core.rentdynamics.com');
    }));

  it('CoreAuthServiceConfig host should be "//core.rentdynamics.com"',
    inject([CoreAuthServiceConfig], (config: CoreAuthServiceConfig) => {
      expect(config.host).toBe('//core.rentdynamics.com');
    }));

  it('ReportSchedulerAuthServiceConfig host should be "//report-scheduler-api.rentdynamics.com"',
    inject([ReportSchedulerAuthServiceConfig], (config: ReportSchedulerAuthServiceConfig) => {
      expect(config.host).toBe('//report-scheduler-api.rentdynamics.com');
    }));


  it('ReportSchedulerAuthServiceConfig authToken changes should propegate across all services',
    inject([ReportSchedulerApiService, ReportSchedulerAuthService, ReportSchedulerAuthServiceConfig],
        (apiSvc: ReportSchedulerApiService, authSvc: ReportSchedulerAuthService, config: ReportSchedulerAuthServiceConfig) => {
      //Arrange
      config.authToken = '1s1D2g2E3w3e';
      //Act
      let authToken = authSvc.authToken;
      //Assert
      expect(config.authToken).toEqual(authToken);
    }));

  describe('mock backend', () => {
    let backend: MockBackend;
    let service: ReportSchedulerApiService;
    let fakeResult: any[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthService], (http: Http, be: MockBackend, authSvc: AuthService) => {
      backend = be;
      service = new ReportSchedulerApiService(authSvc, http);
      fakeResult = [{ id: 1 }, { id: 2 }];
      let options = new ResponseOptions({ status: 200, body: { data: fakeResult } });
      response = new Response(options);
    }));

    it('should have expected fake results (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.get('/units').toPromise()
        // .then(() => Promise.reject('deliberate'))
        .then(results => {
          expect(results.data.length).toBe(fakeResult.length,
            'should have expected no. of results');
        });
    })));

    it('should have expected fake results (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.put('/units', {}).pipe(tap(results => {
        expect(results.data.length).toBe(fakeResult.length,
          'should have expected number of results');
      }))
        .toPromise();
    })));

    it('should be OK returning no results', async(inject([], () => {
      let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.post('/units', {}).pipe(tap(results => {
        expect(results.data.length).toBe(0, 'should have no results');
      }))
        .toPromise();
    })));

  });

});