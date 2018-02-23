/* tslint:disable:no-unused-variable */

import {
  async, inject, TestBed
} from '@angular/core/testing';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions, URLSearchParams
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { ApiService } from './api.service';
import { AuthServiceConfig } from './auth-service-config';
import { AuthService } from './auth.service';


class AuthServiceConfigMock implements AuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//mock.rentdynamics.com';
  secretKey: string = '';
  userId: string = '';
}

describe('Service: ApiService', () => {
  let spy = {
    authSvc: {
      getAuthHeaders: null,
      getAuthHeadersWithoutAuth: null
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ApiService,
        AuthService,
        { provide: AuthServiceConfig, useClass: AuthServiceConfigMock },
        { provide: XHRBackend, useClass: MockBackend },
        // {
        //   provide: AuthService, useValue: {
        //     getAuthHeaders: () => {
        //       return '';
        //     },
        //     getAuthHeadersWithoutAuth: () => {
        //       return '';
        //     }
        //   }
        // }
      ]
    });
  });

  beforeEach(inject([AuthService], (authSvc: AuthService) => {
    spy.authSvc.getAuthHeaders = spyOn(authSvc, 'getAuthHeaders').and.callFake(() => '');
    spy.authSvc.getAuthHeadersWithoutAuth = spyOn(authSvc, 'getAuthHeadersWithoutAuth').and.callFake(() => '');
  }));

  it('can instantiate service when inject service',
    inject([ApiService], (service: ApiService) => {
      expect(service instanceof ApiService).toBe(true);
    }));


  it('can instantiate service with "new"', inject([Http, AuthService], (http: Http, authSvc: AuthService) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new ApiService(authSvc, http);
    expect(service instanceof ApiService).toBe(true, 'new service should be ok');
  }));


  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

  it('should should make a call to AuthService.getAuthHeadersWithoutAuth on postWithoutAuth',
    inject([Http, AuthService], (http: Http, authSvc: AuthService) => {
      // Arrange
      let service = new ApiService(authSvc, http);
      let endpoint = '/endpoint';
      let data = { id: 1 };
      // Act
      service.postWithoutAuth(endpoint, data);
      // Assert
      expect(spy.authSvc.getAuthHeadersWithoutAuth).toHaveBeenCalled();
    }));

  xit('post with search params should invoke getAuthHeaders with query string',
    inject([Http, AuthService], (http: Http, authSvc: AuthService) => {
      // Arrange
      let service = new ApiService(authSvc, http);
      let endpoint = '/endpoint';
      let body = { id: -1 };
      let query_params = new URLSearchParams(JSON.stringify({
        communityId: 1,
        personId: 2
      }))
      // Act
      service.post(endpoint, body, { search: query_params });
      // Assert
      expect(spy.authSvc.getAuthHeaders).toHaveBeenCalled();
      expect(spy.authSvc.getAuthHeaders).toHaveBeenCalledWith('/endpoint?%7B%22communityId%22:1,%22personId%22:2%7D=', { id: -1 });
    }));

  it('post without search params should invoke getAuthHeaders without query string',
    inject([Http, AuthService], (http: Http, authSvc: AuthService) => {
      // Arrange
      let service = new ApiService(authSvc, http);
      let endpoint = '/endpoint';
      let body = { id: -1 };
      // Act
      service.post(endpoint, body);
      // Assert
      expect(spy.authSvc.getAuthHeaders).toHaveBeenCalled();
      expect(spy.authSvc.getAuthHeaders).toHaveBeenCalledWith('/endpoint', { id: -1 });
    }));

  xit('post with search params should invoke http post with query string',
    inject([Http, AuthService], (http: Http, authSvc: AuthService) => {
      // Arrange
      let service = new ApiService(authSvc, http);
      let endpoint = '/endpoint';
      let body = { id: -1 };
      let query_params = new URLSearchParams(JSON.stringify({
        communityId: 1,
        personId: 2
      }))
      let spyHttpPost = spyOn(http, 'post').and.callFake(() => Observable.of([]))
      // Act
      service.post(endpoint, body, { search: query_params });
      // Assert
      expect(spyHttpPost).toHaveBeenCalled();
      expect(spyHttpPost).toHaveBeenCalledWith(
        '//mock.rentdynamics.com/endpoint', 
        { id: -1 }, 
        { headers: '', search: query_params }
      );
    }));

  describe('mock backend', () => {
    let backend: MockBackend;
    let service: ApiService;
    let fakeResult: any[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthService], (http: Http, be: MockBackend, authSvc: AuthService) => {
      backend = be;
      service = new ApiService(authSvc, http);
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

      service.get('/units')
        .do(results => {
          expect(results.data.length).toBe(fakeResult.length,
            'should have expected number of results');
        })
        .toPromise();
    })));


    it('should be OK returning no results', async(inject([], () => {
      let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.get('/units')
        .do(results => {
          expect(results.data.length).toBe(0, 'should have no results');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      // let resp = new Response(new ResponseOptions({ status: 404 }));
      // backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      // service.get('/units')
      //   .do(results => {
      //     fail('should not respond with results');
      //   })
      //   .catch(err => {
      //     console.log('err', err)
      //     expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
      //     return Observable.of(null); // failure is the expected test result
      //   })
      //   .toPromise();
    })));
  });
});