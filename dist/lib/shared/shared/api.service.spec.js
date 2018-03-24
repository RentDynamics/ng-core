/* tslint:disable:no-unused-variable */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core/testing", "@angular/http/testing", "@angular/http", "rxjs/Observable", "rxjs/add/observable/of", "rxjs/add/operator/catch", "rxjs/add/operator/do", "rxjs/add/operator/toPromise", "./api.service", "./auth-service-config", "./auth.service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var testing_1 = require("@angular/core/testing");
    var testing_2 = require("@angular/http/testing");
    var http_1 = require("@angular/http");
    var Observable_1 = require("rxjs/Observable");
    require("rxjs/add/observable/of");
    require("rxjs/add/operator/catch");
    require("rxjs/add/operator/do");
    require("rxjs/add/operator/toPromise");
    var api_service_1 = require("./api.service");
    var auth_service_config_1 = require("./auth-service-config");
    var auth_service_1 = require("./auth.service");
    var AuthServiceConfigMock = (function () {
        function AuthServiceConfigMock() {
            this.apiKey = '';
            this.authToken = '';
            this.host = '//mock.rentdynamics.com';
            this.secretKey = '';
            this.userId = '';
        }
        return AuthServiceConfigMock;
    }());
    describe('Service: ApiService', function () {
        var spy = {
            authSvc: {
                getAuthHeaders: null,
                getAuthHeadersWithoutAuth: null
            }
        };
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({
                imports: [http_1.HttpModule],
                providers: [
                    api_service_1.ApiService,
                    auth_service_1.AuthService,
                    { provide: auth_service_config_1.AuthServiceConfig, useClass: AuthServiceConfigMock },
                    { provide: http_1.XHRBackend, useClass: testing_2.MockBackend },
                ]
            });
        });
        beforeEach(testing_1.inject([auth_service_1.AuthService], function (authSvc) {
            spy.authSvc.getAuthHeaders = spyOn(authSvc, 'getAuthHeaders').and.callFake(function () { return ''; });
            spy.authSvc.getAuthHeadersWithoutAuth = spyOn(authSvc, 'getAuthHeadersWithoutAuth').and.callFake(function () { return ''; });
        }));
        it('can instantiate service when inject service', testing_1.inject([api_service_1.ApiService], function (service) {
            expect(service instanceof api_service_1.ApiService).toBe(true);
        }));
        it('can instantiate service with "new"', testing_1.inject([http_1.Http, auth_service_1.AuthService], function (http, authSvc) {
            expect(http).not.toBeNull('http should be provided');
            var service = new api_service_1.ApiService(authSvc, http);
            expect(service instanceof api_service_1.ApiService).toBe(true, 'new service should be ok');
        }));
        it('can provide the mockBackend as XHRBackend', testing_1.inject([http_1.XHRBackend], function (backend) {
            expect(backend).not.toBeNull('backend should be provided');
        }));
        it('should should make a call to AuthService.getAuthHeadersWithoutAuth on postWithoutAuth', testing_1.inject([http_1.Http, auth_service_1.AuthService], function (http, authSvc) {
            // Arrange
            var service = new api_service_1.ApiService(authSvc, http);
            var endpoint = '/endpoint';
            var data = { id: 1 };
            // Act
            service.postWithoutAuth(endpoint, data);
            // Assert
            expect(spy.authSvc.getAuthHeadersWithoutAuth).toHaveBeenCalled();
        }));
        xit('post with search params should invoke getAuthHeaders with query string', testing_1.inject([http_1.Http, auth_service_1.AuthService], function (http, authSvc) {
            // Arrange
            var service = new api_service_1.ApiService(authSvc, http);
            var endpoint = '/endpoint';
            var body = { id: -1 };
            var query_params = new http_1.URLSearchParams(JSON.stringify({
                communityId: 1,
                personId: 2
            }));
            // Act
            service.post(endpoint, body, { search: query_params });
            // Assert
            expect(spy.authSvc.getAuthHeaders).toHaveBeenCalled();
            expect(spy.authSvc.getAuthHeaders).toHaveBeenCalledWith('/endpoint?%7B%22communityId%22:1,%22personId%22:2%7D=', { id: -1 });
        }));
        it('post without search params should invoke getAuthHeaders without query string', testing_1.inject([http_1.Http, auth_service_1.AuthService], function (http, authSvc) {
            // Arrange
            var service = new api_service_1.ApiService(authSvc, http);
            var endpoint = '/endpoint';
            var body = { id: -1 };
            // Act
            service.post(endpoint, body);
            // Assert
            expect(spy.authSvc.getAuthHeaders).toHaveBeenCalled();
            expect(spy.authSvc.getAuthHeaders).toHaveBeenCalledWith('/endpoint', { id: -1 });
        }));
        xit('post with search params should invoke http post with query string', testing_1.inject([http_1.Http, auth_service_1.AuthService], function (http, authSvc) {
            // Arrange
            var service = new api_service_1.ApiService(authSvc, http);
            var endpoint = '/endpoint';
            var body = { id: -1 };
            var query_params = new http_1.URLSearchParams(JSON.stringify({
                communityId: 1,
                personId: 2
            }));
            var spyHttpPost = spyOn(http, 'post').and.callFake(function () { return Observable_1.Observable.of([]); });
            // Act
            service.post(endpoint, body, { search: query_params });
            // Assert
            expect(spyHttpPost).toHaveBeenCalled();
            expect(spyHttpPost).toHaveBeenCalledWith('//mock.rentdynamics.com/endpoint', { id: -1 }, { headers: '', search: query_params });
        }));
        describe('mock backend', function () {
            var backend;
            var service;
            var fakeResult;
            var response;
            beforeEach(testing_1.inject([http_1.Http, http_1.XHRBackend, auth_service_1.AuthService], function (http, be, authSvc) {
                backend = be;
                service = new api_service_1.ApiService(authSvc, http);
                fakeResult = [{ id: 1 }, { id: 2 }];
                var options = new http_1.ResponseOptions({ status: 200, body: { data: fakeResult } });
                response = new http_1.Response(options);
            }));
            it('should have expected fake results (then)', testing_1.async(testing_1.inject([], function () {
                backend.connections.subscribe(function (c) { return c.mockRespond(response); });
                service.get('/units').toPromise()
                    .then(function (results) {
                    expect(results.data.length).toBe(fakeResult.length, 'should have expected no. of results');
                });
            })));
            it('should have expected fake results (Observable.do)', testing_1.async(testing_1.inject([], function () {
                backend.connections.subscribe(function (c) { return c.mockRespond(response); });
                service.get('/units')
                    .do(function (results) {
                    expect(results.data.length).toBe(fakeResult.length, 'should have expected number of results');
                })
                    .toPromise();
            })));
            it('should be OK returning no results', testing_1.async(testing_1.inject([], function () {
                var resp = new http_1.Response(new http_1.ResponseOptions({ status: 200, body: { data: [] } }));
                backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
                service.get('/units')
                    .do(function (results) {
                    expect(results.data.length).toBe(0, 'should have no results');
                })
                    .toPromise();
            })));
            it('should treat 404 as an Observable error', testing_1.async(testing_1.inject([], function () {
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
});
//# sourceMappingURL=api.service.spec.js.map