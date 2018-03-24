/* tslint:disable:no-unused-variable */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core/testing", "@angular/http/testing", "@angular/http", "rxjs/add/observable/of", "rxjs/add/operator/catch", "rxjs/add/operator/do", "rxjs/add/operator/toPromise", "./shared/auth.service", "./shared/api.service", "./shared/auth-service-config", "./core-api.service", "./core-auth.service", "./core-auth-service-config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var testing_1 = require("@angular/core/testing");
    var testing_2 = require("@angular/http/testing");
    var http_1 = require("@angular/http");
    require("rxjs/add/observable/of");
    require("rxjs/add/operator/catch");
    require("rxjs/add/operator/do");
    require("rxjs/add/operator/toPromise");
    var auth_service_1 = require("./shared/auth.service");
    var api_service_1 = require("./shared/api.service");
    var auth_service_config_1 = require("./shared/auth-service-config");
    var core_api_service_1 = require("./core-api.service");
    var core_auth_service_1 = require("./core-auth.service");
    var core_auth_service_config_1 = require("./core-auth-service-config");
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
    var CoreAuthServiceConfigMock = (function () {
        function CoreAuthServiceConfigMock() {
            this.apiKey = '';
            this.authToken = '';
            this.host = '//mock.rentdynamics.com';
            this.secretKey = '';
            this.userId = '';
        }
        return CoreAuthServiceConfigMock;
    }());
    describe('Service: CoreApiService', function () {
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({
                imports: [http_1.HttpModule],
                providers: [
                    core_api_service_1.CoreApiService,
                    core_auth_service_1.CoreAuthService,
                    auth_service_1.AuthService,
                    { provide: auth_service_config_1.AuthServiceConfig, useClass: AuthServiceConfigMock },
                    { provide: core_auth_service_config_1.CoreAuthServiceConfig, useClass: CoreAuthServiceConfigMock },
                    { provide: http_1.XHRBackend, useClass: testing_2.MockBackend },
                ]
            });
        });
        it('can instantiate service when inject service', testing_1.inject([core_api_service_1.CoreApiService], function (service) {
            expect(service instanceof api_service_1.ApiService).toBe(true);
        }));
        describe('mock backend', function () {
            var backend;
            var service;
            var fakeResult;
            var response;
            beforeEach(testing_1.inject([http_1.Http, http_1.XHRBackend, auth_service_1.AuthService], function (http, be, authSvc) {
                backend = be;
                service = new core_api_service_1.CoreApiService(authSvc, http);
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
                service.put('/units', {}).do(function (results) {
                    expect(results.data.length).toBe(fakeResult.length, 'should have expected number of results');
                })
                    .toPromise();
            })));
            it('should be OK returning no results', testing_1.async(testing_1.inject([], function () {
                var resp = new http_1.Response(new http_1.ResponseOptions({ status: 200, body: { data: [] } }));
                backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
                service.post('/units', {}).do(function (results) {
                    expect(results.data.length).toBe(0, 'should have no results');
                })
                    .toPromise();
            })));
        });
    });
});
//# sourceMappingURL=core-api.service.spec.js.map