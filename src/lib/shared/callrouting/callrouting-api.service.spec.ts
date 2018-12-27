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

import { AuthService } from '../shared/auth.service';
import { AuthServiceConfig } from '../shared/auth-service-config';
import { CallroutingApiService } from './callrouting-api.service';
import { CallroutingAuthService } from './callrouting-auth.service';
import { CallroutingAuthServiceConfig } from './callrouting-auth-service-config';
import { CoreApiService } from '../core-api.service';
import { CoreAuthService } from '../core-auth.service';
import { CoreAuthServiceConfig } from '../core-auth-service-config';

class AuthServiceConfigMock implements AuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//mock.rentdynamics.com';
  secretKey: string = '';
  userId: string = '';
  serviceRoute: string = '';
}

class CoreAuthServiceConfigMock implements AuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//core.rentdynamics.com';
  secretKey: string = '';
  userId: string = '';
  serviceRoute: string = '';
}

class CallroutingAuthServiceConfigMock implements AuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//api.rentdynamics.com';
  serviceRoute: string = '/svc/reporting';
  secretKey: string = '';
  userId: string = '';
}

describe('Service: CallroutingApiService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
          CallroutingApiService,
        CallroutingAuthService,
        AuthService,
        { provide: AuthServiceConfig, useClass: AuthServiceConfigMock },
        { provide: CallroutingAuthServiceConfig, useClass: CallroutingAuthServiceConfigMock },
        CoreApiService,
        CoreAuthService,
        { provide: CoreAuthServiceConfig, useClass: CoreAuthServiceConfigMock },
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('can instantiate service when inject service',
    inject([CallroutingApiService], (service: CallroutingApiService) => {
      expect(service instanceof CallroutingApiService).toBe(true);
    }));

  it('CallroutingApiService getHost() should return "//api.rentdynamics.com"',
    inject([CallroutingApiService], (service: CallroutingApiService) => {
      expect(service.getHost()).toBe('//api.rentdynamics.com');
    }));

  it('CoreApiService getHost() should return "//core.rentdynamics.com"',
    inject([CoreApiService], (service: CoreApiService) => {
      expect(service.getHost()).toBe('//core.rentdynamics.com');
    }));

  it('CoreAuthServiceConfig host should be "//core.rentdynamics.com"',
    inject([CoreAuthServiceConfig], (config: CoreAuthServiceConfig) => {
      expect(config.host).toBe('//core.rentdynamics.com');
    }));

  it('CallroutingAuthServiceConfig host should be "//api.rentdynamics.com"',
    inject([CallroutingAuthServiceConfig], (config: CallroutingAuthServiceConfig) => {
      expect(config.host).toBe('//api.rentdynamics.com');
    }));

  it('CallroutingAuthServiceConfig authToken changes should propegate across all services',
    inject([CallroutingApiService, CallroutingAuthService, CallroutingAuthServiceConfig],
        (apiSvc: CallroutingApiService, authSvc: CallroutingAuthService, config: CallroutingAuthServiceConfig) => {
      //Arrange
      config.authToken = '1s1D2g2E3w3e';
      //Act
      let authToken = authSvc.authToken;
      //Assert
      expect(config.authToken).toEqual(authToken);
    }));

  describe('mock backend', () => {
    let backend: MockBackend;
    let service: CallroutingApiService;
    let fakeResult: any[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthService], (http: Http, be: MockBackend, authSvc: AuthService) => {
      backend = be;
      service = new CallroutingApiService(authSvc, http);
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
