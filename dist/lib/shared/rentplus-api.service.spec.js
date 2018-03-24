/* tslint:disable:no-unused-variable */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core/testing", "@angular/http/testing", "@angular/http", "rxjs/add/observable/of", "rxjs/add/operator/catch", "rxjs/add/operator/do", "rxjs/add/operator/toPromise", "./rentplus-api.service", "./rentplus-auth.service", "./rentplus-auth-service-config", "./core-api.service", "./core-auth.service", "./core-auth-service-config"], factory);
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
    var rentplus_api_service_1 = require("./rentplus-api.service");
    var rentplus_auth_service_1 = require("./rentplus-auth.service");
    var rentplus_auth_service_config_1 = require("./rentplus-auth-service-config");
    var core_api_service_1 = require("./core-api.service");
    var core_auth_service_1 = require("./core-auth.service");
    var core_auth_service_config_1 = require("./core-auth-service-config");
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
    });
});
//# sourceMappingURL=rentplus-api.service.spec.js.map