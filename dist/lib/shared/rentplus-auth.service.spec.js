/* tslint:disable:no-unused-variable */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core/testing", "@angular/http/testing", "@angular/http", "rxjs/add/observable/of", "rxjs/add/operator/catch", "rxjs/add/operator/do", "rxjs/add/operator/toPromise", "./rentplus-auth.service", "./rentplus-auth-service-config"], factory);
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
    var rentplus_auth_service_1 = require("./rentplus-auth.service");
    var rentplus_auth_service_config_1 = require("./rentplus-auth-service-config");
    var RentplusAuthServiceConfigMock = (function () {
        function RentplusAuthServiceConfigMock() {
            this.apiKey = '';
            this.authToken = '';
            this.host = '//mock.rentdynamics.com';
            this.secretKey = '';
            this.userId = '';
        }
        return RentplusAuthServiceConfigMock;
    }());
    describe('Service: RentplusAuthService', function () {
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({
                imports: [http_1.HttpModule],
                providers: [
                    rentplus_auth_service_1.RentplusAuthService,
                    { provide: rentplus_auth_service_config_1.RentplusAuthServiceConfig, useClass: RentplusAuthServiceConfigMock },
                    { provide: http_1.XHRBackend, useClass: testing_2.MockBackend },
                ]
            });
        });
        it('can instantiate service when inject service', testing_1.inject([rentplus_auth_service_1.RentplusAuthService], function (service) {
            expect(service instanceof rentplus_auth_service_1.RentplusAuthService).toBe(true);
        }));
        it('service config should be instanceof RentplusAuthServiceConfigMock', testing_1.inject([rentplus_auth_service_1.RentplusAuthService], function (service) {
            expect(service.config instanceof RentplusAuthServiceConfigMock).toBe(true);
        }));
        it('service config host should be "//mock.rentdynamics.com"', testing_1.inject([rentplus_auth_service_1.RentplusAuthService], function (service) {
            expect(service.config.host).toBe('//mock.rentdynamics.com');
        }));
        it('getHost should return //mock.rentdynamics.com from provided config', testing_1.inject([rentplus_auth_service_1.RentplusAuthService], function (service) {
            //Arrange
            //Act
            var host = service.getHost();
            //Assert
            expect(host).toEqual('//mock.rentdynamics.com');
        }));
    });
});
//# sourceMappingURL=rentplus-auth.service.spec.js.map