/* tslint:disable:no-unused-variable */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core/testing", "@angular/http/testing", "@angular/http", "rxjs/Observable", "rxjs/add/observable/of", "rxjs/add/operator/catch", "rxjs/add/operator/do", "rxjs/add/operator/toPromise", "./auth.service", "./auth-service-config"], factory);
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
    var auth_service_1 = require("./auth.service");
    var auth_service_config_1 = require("./auth-service-config");
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
    describe('Service: AuthService', function () {
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({
                imports: [http_1.HttpModule],
                providers: [
                    auth_service_1.AuthService,
                    { provide: auth_service_config_1.AuthServiceConfig, useClass: AuthServiceConfigMock },
                    { provide: http_1.XHRBackend, useClass: testing_2.MockBackend },
                ]
            });
        });
        it('can instantiate service when inject service', testing_1.inject([auth_service_1.AuthService], function (service) {
            expect(service instanceof auth_service_1.AuthService).toBe(true);
        }));
        it('formatPayload should alphabetize items in dictionary', testing_1.inject([auth_service_1.AuthService], function (service) {
            // Arrange
            var payload = {
                orange: 1,
                blue: 2
            };
            // Act
            var formattedPayload = service.formatPayload(payload);
            // Assert
            expect(Object.keys(formattedPayload)[0]).toEqual('blue');
        }));
        it('formatPayload should alphabetize nested items', testing_1.inject([auth_service_1.AuthService], function (service) {
            // Arrange
            var payload = {
                orange: 1,
                blue: {
                    red: 21,
                    pink: 22
                }
            };
            // Act
            var formattedPayload = service.formatPayload(payload);
            // Assert
            expect(Object.keys(formattedPayload['blue'])[0]).toEqual('pink');
        }));
        it('formatPayload should alphabetize keys even when their values are null', testing_1.inject([auth_service_1.AuthService], function (service) {
            // Arrange
            var payload = {
                orange: null,
                blue: null
            };
            // Act
            var formattedPayload = service.formatPayload(payload);
            // Assert
            expect(Object.keys(formattedPayload)[0]).toEqual('blue');
        }));
        it('formatPayload should remove spaces from formatted items', testing_1.inject([auth_service_1.AuthService], function (service) {
            // Arrange
            var payload = {
                orange: 1,
                blue: {
                    red: "a  f  g",
                    pink: "b  t  g"
                }
            };
            // Act
            var formattedPayload = service.formatPayload(payload);
            // Assert
            expect(formattedPayload['blue']['pink']).toEqual('btg');
        }));
        it('formatPayload should pass with Array inside of object', testing_1.inject([auth_service_1.AuthService], function (service) {
            // Arrange
            var payload = {
                orange: 5,
                blue: [
                    {
                        red: 6,
                        pink: 7
                    },
                    {
                        green: 3,
                        blue: 4
                    }
                ]
            };
            // Act
            var formattedPayload = service.formatPayload(payload);
            // Assert
            expect(Object.keys(formattedPayload['blue'][0])[0]).toEqual('pink');
        }));
        it('getNonce should return hash of timestamp, url, payload and secret key', testing_1.inject([auth_service_1.AuthService], function (service) {
            // Arrange
            var payload = {
                orange: 1,
                blue: {
                    red: "a  f  g",
                    pink: "b  t  g"
                }
            };
            var formattedPayload = JSON.stringify(service.formatPayload(payload));
            var timestamp = Date.now();
            var url = '/someUrlolz';
            var nonce = timestamp + url + formattedPayload;
            var shaObj = new jsSHA('SHA-1', 'TEXT');
            shaObj.setHMACKey(service.secretKey, 'TEXT');
            shaObj.update(nonce);
            var hashedNonce = shaObj.getHMAC('HEX');
            // Act
            var authNonce = service.getNonce(timestamp, url, formattedPayload);
            // Assert
            expect(hashedNonce).toEqual(authNonce);
        }));
        it('getNonce should return hash of timestamp, url and secret key if no payload exists', testing_1.inject([auth_service_1.AuthService], function (service) {
            // Arrange
            var timestamp = Date.now();
            var url = '/someUrlolz';
            var nonce = timestamp + url;
            var shaObj = new jsSHA('SHA-1', 'TEXT');
            shaObj.setHMACKey(service.secretKey, 'TEXT');
            shaObj.update(nonce);
            var hashedNonce = shaObj.getHMAC('HEX');
            // Act
            var authNonce = service.getNonce(timestamp, url);
            // Assert
            expect(hashedNonce).toEqual(authNonce);
        }));
        it('getAuthHeaders returns authorization header', testing_1.inject([auth_service_1.AuthService], function (service) {
            //Arange
            var url = '/someUrlolz';
            //Act
            var auth = service.getAuthHeaders(url);
            //Assert
            expect(auth.get('Authorization')).toBeDefined();
        }));
        it('getAuthHeaders returns x-rd-api-key header', testing_1.inject([auth_service_1.AuthService], function (service) {
            //Arange
            var url = '/someUrlolz';
            //Act
            var auth = service.getAuthHeaders(url);
            //Assert
            expect(auth.get('x-rd-api-key')).toBeDefined();
        }));
        it('getAuthHeaders returns x-rd-api-nonce header', testing_1.inject([auth_service_1.AuthService], function (service) {
            //Arange
            var url = '/someUrlolz';
            //Act
            var auth = service.getAuthHeaders(url);
            //Assert
            expect(auth.get('x-rd-api-nonce')).toBeDefined();
        }));
        it('getAuthHeaders returns x-rd-timestamp header', testing_1.inject([auth_service_1.AuthService], function (service) {
            //Arange
            var url = '/someUrlolz';
            //Act
            var auth = service.getAuthHeaders(url);
            //Assert
            expect(auth.get('x-rd-timestamp')).toBeDefined();
        }));
        it('getAuthHeadersWithoutAuth returns x-rd-api-key header', testing_1.inject([auth_service_1.AuthService], function (service) {
            //Arange
            var url = '/someUrlolz';
            //Act
            var auth = service.getAuthHeadersWithoutAuth(url);
            //Assert
            expect(auth.get('x-rd-api-key')).toBeDefined();
        }));
        it('getAuthHeadersWithoutAuth returns x-rd-api-nonce header', testing_1.inject([auth_service_1.AuthService], function (service) {
            //Arange
            var url = '/someUrlolz';
            //Act
            var auth = service.getAuthHeadersWithoutAuth(url);
            //Assert
            expect(auth.get('x-rd-api-nonce')).toBeDefined();
        }));
        it('getAuthHeadersWithoutAuth returns x-rd-timestamp header', testing_1.inject([auth_service_1.AuthService], function (service) {
            //Arange
            var url = '/someUrlolz';
            //Act
            var auth = service.getAuthHeadersWithoutAuth(url);
            //Assert
            expect(auth.get('x-rd-timestamp')).toBeDefined();
        }));
        it('logout should delete authToken to make isAuthenticated return false', testing_1.inject([auth_service_1.AuthService, http_1.Http], function (service, http) {
            //Arrange
            //Act
            service.logout();
            //Assert
            expect(service.isAuthenticated()).toEqual(false);
        }));
        it('login should make a request to //mock.rentdynamics.com', testing_1.inject([auth_service_1.AuthService, http_1.Http], function (service, http) {
            //Arrange
            var user = {
                username: 'RdOverseer',
                password: 'ReNtDyn@m!c$'
            };
            spyOn(http, 'post').and.callThrough();
            //Act
            service.login(user);
            //Assert
            expect(http.post).toHaveBeenCalledWith('//mock.rentdynamics.com/auth/login', jasmine.any(Object));
        }));
        it('login should use JsSha to hide password and then POST it', testing_1.inject([auth_service_1.AuthService, http_1.Http], function (service, http) {
            //Arrange
            var user = {
                username: 'RdOverseer',
                password: 'ReNtDyn@m!c$'
            };
            spyOn(http, 'post').and.callThrough();
            //Act
            service.login(user);
            //Assert
            expect(http.post).toHaveBeenCalledWith('//mock.rentdynamics.com/auth/login', { username: 'RdOverseer', password: 'ad0f7b5edfa684baa520c74467da0703c8aa3f74' });
        }));
        it('ssoLogin should call http', testing_1.inject([auth_service_1.AuthService, http_1.Http], function (service, http) {
            //Arrange
            var token = 'l8H98pUtoi7glkUGiyfyu6fUYiT';
            spyOn(http, 'post').and.callThrough();
            //Act
            service.ssoLogin(token);
            //Assert
            expect(http.post).toHaveBeenCalledWith('//mock.rentdynamics.com/auth/sso_login', jasmine.any(Object), jasmine.any(Object));
        }));
        it('ssoLogin should return an observable that we can subscribe to', testing_1.inject([auth_service_1.AuthService, http_1.Http], function (service, http) {
            //Arrange
            var token = 'l8H98pUtoi7glkUGiyfyu6fUYiT';
            var returnedValue = '{"userId": 1234, "token": "klu79yg75UYG5UIG8TgvTR"}';
            spyOn(http, 'post').and.returnValue(Observable_1.Observable.from([returnedValue]));
            //Act
            service.ssoLogin(token).subscribe(function (result) {
                //Assert
                expect(result).toEqual(returnedValue);
            });
        }));
        it('forgotPassword should send a POST to //mock.rentdynamics.com/auth/reset_password', testing_1.inject([auth_service_1.AuthService, http_1.Http], function (service, http) {
            //Arrange
            var username = 'RdOverseer';
            spyOn(http, 'post').and.callThrough();
            //Act
            service.forgotPassword(username);
            //Assert
            expect(http.post).toHaveBeenCalledWith('//mock.rentdynamics.com/auth/reset_password', jasmine.any(Object), jasmine.any(Object));
        }));
        it('forgotPassword should send a POST to //mock.rentdynamics.com/auth/reset_password with an object of the username', testing_1.inject([auth_service_1.AuthService, http_1.Http], function (service, http) {
            //Arrange
            var username = 'RdOverseer';
            spyOn(http, 'post').and.callThrough();
            //Act
            service.forgotPassword(username);
            //Assert
            expect(http.post).toHaveBeenCalledWith('//mock.rentdynamics.com/auth/reset_password', { username: username }, jasmine.any(Object));
        }));
        it('forgotPassword should pass endpoint not url to getAuthHeadersWithoutAuth()', testing_1.inject([auth_service_1.AuthService, http_1.Http], function (service, http) {
            //Arrange
            var username = 'RdOverseer';
            var spy = spyOn(service, 'getAuthHeadersWithoutAuth').and.callThrough();
            //Act
            service.forgotPassword(username);
            //Assert
            expect(spy).toHaveBeenCalledWith('/auth/reset_password', jasmine.any(Object));
        }));
        it('getHost should return //mock.rentdynamics.com from provided config', testing_1.inject([auth_service_1.AuthService], function (service) {
            //Arrange
            //Act
            var host = service.getHost();
            //Assert
            expect(host).toEqual('//mock.rentdynamics.com');
        }));
    });
});
//# sourceMappingURL=auth.service.spec.js.map