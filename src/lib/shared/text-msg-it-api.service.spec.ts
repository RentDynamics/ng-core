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
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { AuthService } from './shared/auth.service';
import { AuthServiceConfig } from './shared/auth-service-config';
import { TextMsgItApiService } from './text-msg-it-api.service';
import { TextMsgItAuthService } from './text-msg-it-auth.service';
import { TextMsgItAuthServiceConfig } from './text-msg-it-auth-service-config';
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

class TextMsgItAuthServiceConfigMock implements AuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//textmsgit.rentdynamics.com';
  secretKey: string = '';
  userId: string = '';
}

describe('Service: TextMsgItApiService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        TextMsgItApiService,
        TextMsgItAuthService,
        AuthService,
        { provide: AuthServiceConfig, useClass: AuthServiceConfigMock },
        { provide: TextMsgItAuthServiceConfig, useClass: TextMsgItAuthServiceConfigMock },
        CoreApiService,
        CoreAuthService,
        { provide: CoreAuthServiceConfig, useClass: CoreAuthServiceConfigMock },
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('can instantiate service when inject service',
    inject([TextMsgItApiService], (service: TextMsgItApiService) => {
      expect(service instanceof TextMsgItApiService).toBe(true);
    }));

  it('TextMsgItApiService getHost() should return "//textmsgit.rentdynamics.com"',
    inject([TextMsgItApiService], (service: TextMsgItApiService) => {
      expect(service.getHost()).toBe('//textmsgit.rentdynamics.com');
    }));

  it('CoreApiService getHost() should return "//core.rentdynamics.com"',
    inject([CoreApiService], (service: CoreApiService) => {
      expect(service.getHost()).toBe('//core.rentdynamics.com');
    }));

  it('CoreAuthServiceConfig host should be "//core.rentdynamics.com"',
    inject([CoreAuthServiceConfig], (config: CoreAuthServiceConfig) => {
      expect(config.host).toBe('//core.rentdynamics.com');
    }));

  it('TextMsgItAuthServiceConfig host should be "//textmsgit.rentdynamics.com"',
    inject([TextMsgItAuthServiceConfig], (config: TextMsgItAuthServiceConfig) => {
      expect(config.host).toBe('//textmsgit.rentdynamics.com');
    }));


  it('TextMsgItAuthServiceConfig authToken changes should propegate across all services',
    inject([TextMsgItApiService, TextMsgItAuthService, TextMsgItAuthServiceConfig], (apiSvc: TextMsgItApiService, authSvc: TextMsgItAuthService, config: TextMsgItAuthServiceConfig) => {
      //Arrange
      config.authToken = '1s1D2g2E3w3e';
      //Act
      let authToken = authSvc.authToken;
      //Assert
      expect(config.authToken).toEqual(authToken);
    }));

  describe('mock backend', () => {
    let backend: MockBackend;
    let service: TextMsgItApiService;
    let fakeResult: any[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthService], (http: Http, be: MockBackend, authSvc: AuthService) => {
      backend = be;
      service = new TextMsgItApiService(authSvc, http);
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

      service.put('/units', {}).do(results => {
        expect(results.data.length).toBe(fakeResult.length,
          'should have expected number of results');
      })
        .toPromise();
    })));

    it('should be OK returning no results', async(inject([], () => {
      let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.post('/units', {}).do(results => {
        expect(results.data.length).toBe(0, 'should have no results');
      })
        .toPromise();
    })));

  });
});