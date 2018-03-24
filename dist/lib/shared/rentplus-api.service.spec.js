/* tslint:disable:no-unused-variable */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core/testing", "@angular/http/testing", "@angular/http", "rxjs/add/observable/of", "rxjs/add/operator/catch", "rxjs/add/operator/do", "rxjs/add/operator/toPromise", "./shared/auth.service", "./shared/auth-service-config", "./rentplus-api.service", "./rentplus-auth.service", "./rentplus-auth-service-config", "./core-api.service", "./core-auth.service", "./core-auth-service-config"], factory);
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
    var auth_service_config_1 = require("./shared/auth-service-config");
    var rentplus_api_service_1 = require("./rentplus-api.service");
    var rentplus_auth_service_1 = require("./rentplus-auth.service");
    var rentplus_auth_service_config_1 = require("./rentplus-auth-service-config");
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
            this.host = '//core.rentdynamics.com';
            this.secretKey = '';
            this.userId = '';
        }
        return CoreAuthServiceConfigMock;
    }());
    var RentplusAuthServiceConfigMock = (function () {
        function RentplusAuthServiceConfigMock() {
            this.apiKey = '';
            this.authToken = '';
            this.host = '//api.rentplus.com';
            this.secretKey = '';
            this.userId = '';
        }
        return RentplusAuthServiceConfigMock;
    }());
    describe('Service: RentplusApiService', function () {
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({
                imports: [http_1.HttpModule],
                providers: [
                    rentplus_api_service_1.RentplusApiService,
                    rentplus_auth_service_1.RentplusAuthService,
                    auth_service_1.AuthService,
                    { provide: auth_service_config_1.AuthServiceConfig, useClass: AuthServiceConfigMock },
                    { provide: rentplus_auth_service_config_1.RentplusAuthServiceConfig, useClass: RentplusAuthServiceConfigMock },
                    core_api_service_1.CoreApiService,
                    core_auth_service_1.CoreAuthService,
                    { provide: core_auth_service_config_1.CoreAuthServiceConfig, useClass: CoreAuthServiceConfigMock },
                    { provide: http_1.XHRBackend, useClass: testing_2.MockBackend },
                ]
            });
        });
        it('can instantiate service when inject service', testing_1.inject([rentplus_api_service_1.RentplusApiService], function (service) {
            expect(service instanceof rentplus_api_service_1.RentplusApiService).toBe(true);
        }));
        it('RentplusApiService getHost() should return "//api.rentplus.com"', testing_1.inject([rentplus_api_service_1.RentplusApiService], function (service) {
            expect(service.getHost()).toBe('//api.rentplus.com');
        }));
        it('CoreApiService getHost() should return "//core.rentdynamics.com"', testing_1.inject([core_api_service_1.CoreApiService], function (service) {
            expect(service.getHost()).toBe('//core.rentdynamics.com');
        }));
        it('CoreAuthServiceConfig host should be "//core.rentdynamics.com"', testing_1.inject([core_auth_service_config_1.CoreAuthServiceConfig], function (config) {
            expect(config.host).toBe('//core.rentdynamics.com');
        }));
        it('RentplusAuthServiceConfig host should be "//api.rentplus.com"', testing_1.inject([rentplus_auth_service_config_1.RentplusAuthServiceConfig], function (config) {
            expect(config.host).toBe('//api.rentplus.com');
        }));
        it('RentplusAuthServiceConfig authToken changes should propegate across all services', testing_1.inject([rentplus_api_service_1.RentplusApiService, rentplus_auth_service_1.RentplusAuthService, rentplus_auth_service_config_1.RentplusAuthServiceConfig], function (apiSvc, authSvc, config) {
            //Arrange
            config.authToken = '1s1D2g2E3w3e';
            //Act
            var authToken = authSvc.authToken;
            //Assert
            expect(config.authToken).toEqual(authToken);
        }));
        describe('mock backend', function () {
            var backend;
            var service;
            var fakeResult;
            var response;
            beforeEach(testing_1.inject([http_1.Http, http_1.XHRBackend, auth_service_1.AuthService], function (http, be, authSvc) {
                backend = be;
                service = new rentplus_api_service_1.RentplusApiService(authSvc, http);
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
//# sourceMappingURL=rentplus-api.service.spec.js.map