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

declare var jsSHA: jsSHA.jsSHA;

import { Observable, from as observableFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthServiceConfig } from './auth-service-config';

class AuthServiceConfigMock implements AuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//mock.rentdynamics.com';
  secretKey: string = '';
  userId: string = '';
}

describe('Service: AuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AuthService,
        { provide: AuthServiceConfig, useClass: AuthServiceConfigMock },
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('can instantiate service when inject service',
    inject([AuthService], (service: AuthService) => {
      expect(service instanceof AuthService).toBe(true);
    }));

  it('formatPayload should alphabetize items in dictionary',
    inject([AuthService], (service: AuthService) => {
      // Arrange
      let payload = {
        orange: 1,
        blue: 2
      };

      // Act
      let formattedPayload = service.formatPayload(payload);

      // Assert
      expect(Object.keys(formattedPayload)[0]).toEqual('blue');
    }));

  it('formatPayload should alphabetize nested items',
    inject([AuthService], (service: AuthService) => {
      // Arrange
      let payload = {
        orange: 1,
        blue: {
          red: 21,
          pink: 22
        }
      };

      // Act
      let formattedPayload = service.formatPayload(payload);

      // Assert
      expect(Object.keys(formattedPayload['blue'])[0]).toEqual('pink');
    }));

  it('formatPayload should alphabetize keys even when their values are null',
    inject([AuthService], (service: AuthService) => {
      // Arrange
      var payload = {
        orange: null,
        blue: null
      };
      // Act
      let formattedPayload = service.formatPayload(payload);
      // Assert
      expect(Object.keys(formattedPayload)[0]).toEqual('blue');
    }));

  it('formatPayload should remove spaces from formatted items',
    inject([AuthService], (service: AuthService) => {
      // Arrange
      let payload = {
        orange: 1,
        blue: {
          red: "a  f  g",
          pink: "b  t  g"
        }
      };

      // Act
      let formattedPayload = service.formatPayload(payload);

      // Assert
      expect(formattedPayload['blue']['pink']).toEqual('btg');

    }));

  it('formatPayload should pass with Array inside of object',
    inject([AuthService], (service: AuthService) => {
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
      let formattedPayload = service.formatPayload(payload);

      // Assert
      expect(Object.keys(formattedPayload['blue'][0])[0]).toEqual('pink');

    }));

    it('formatPayload should pass with Array of primitive values',
        inject([AuthService], (service: AuthService) => {
            // Arrange
            var payload = {
                orange: 5,
                blue: [1, 5, 2],
                communityId: 1909,
                transunionRentFilingNumber: "1909",
                transunionUtilityFilingNumber: null,
                transunionActive: true,
                transunionUtilityActive: false,
                experianActive: false,
                active: true,
                source: "source",
                backReport: true,
                utilityBillable: true,
                id: 686,
                utilityCollectTypeId: null,
                subscriptionTypeId: 2,
                filingStatusTypeId: 1
            };
            // Act
            let formattedPayload = service.formatPayload(payload);
            // Assert
            expect(formattedPayload['orange']).toEqual(5);
            expect(formattedPayload['blue'][0]).toEqual(1);
            expect(formattedPayload['blue'][1]).toEqual(5);
            expect(formattedPayload['blue'][2]).toEqual(2);
            expect(formattedPayload['communityId']).toEqual(1909);
            expect(formattedPayload['source']).toEqual("source");
            expect(formattedPayload['utilityCollectTypeId']).toEqual(null);
            expect(formattedPayload['transunionUtilityFilingNumber']).toEqual(null);
            expect(formattedPayload['active']).toEqual(true);
            expect(formattedPayload['backReport']).toEqual(true);
            expect(formattedPayload['utilityBillable']).toEqual(true);
            expect(formattedPayload['id']).toEqual(686);
            expect(formattedPayload['utilityCollectTypeId']).toEqual(null);
            expect(formattedPayload['subscriptionTypeId']).toEqual(2);
            expect(formattedPayload['filingStatusTypeId']).toEqual(1);

        }));

    it('getNonce should handle arrays of primitive values',
        inject([AuthService], function (service: AuthService) {
        // Arrange
        var payload = {
            orange: 5,
            blue: [1, 5, 2],
            communityId: 1909,
            transunionRentFilingNumber: "1909",
            transunionUtilityFilingNumber: null,
            transunionActive: true,
            transunionUtilityActive: false,
            experianActive: false,
            active: true,
            source: "source",
            backReport: true,
            utilityBillable: true,
            id: 686,
            utilityCollectTypeId: null,
            subscriptionTypeId: 2,
            filingStatusTypeId: 1
        };
        let formattedPayload = JSON.stringify(service.formatPayload(payload));

        let timestamp = Date.now();
        let url = '/someUrlolz';
        let nonce = timestamp + url + formattedPayload;
        var shaObj = new jsSHA('SHA-1', 'TEXT');
        shaObj.setHMACKey(service.secretKey, 'TEXT');
        shaObj.update(nonce);
        let hashedNonce = shaObj.getHMAC('HEX');

        // Act
        let authNonce = service.getNonce(timestamp, url, formattedPayload);

        // Assert
        expect(hashedNonce).toEqual(authNonce);
    }));

  it('getNonce should return hash of timestamp, url, payload and secret key',
    inject([AuthService], (service: AuthService) => {
      // Arrange
      let payload = {
        orange: 1,
        blue: {
          red: "a  f  g",
          pink: "b  t  g"
        }
      };
      let formattedPayload = JSON.stringify(service.formatPayload(payload));
      let timestamp = Date.now();
      let url = '/someUrlolz';
      let nonce = timestamp + url + formattedPayload;
      var shaObj = new jsSHA('SHA-1', 'TEXT');
      shaObj.setHMACKey(service.secretKey, 'TEXT');
      shaObj.update(nonce);
      let hashedNonce = shaObj.getHMAC('HEX');

      // Act
      let authNonce = service.getNonce(timestamp, url, formattedPayload);

      // Assert
      expect(hashedNonce).toEqual(authNonce);
    }));

  it('getNonce should return hash of timestamp, url and secret key if no payload exists',
    inject([AuthService], (service: AuthService) => {
      // Arrange
      let timestamp = Date.now();
      let url = '/someUrlolz';
      let nonce = timestamp + url;
      var shaObj = new jsSHA('SHA-1', 'TEXT');
      shaObj.setHMACKey(service.secretKey, 'TEXT');
      shaObj.update(nonce);
      let hashedNonce = shaObj.getHMAC('HEX');

      // Act
      let authNonce = service.getNonce(timestamp, url);

      // Assert
      expect(hashedNonce).toEqual(authNonce);
    }));

  it('getAuthHeaders returns authorization header',
    inject([AuthService], (service: AuthService) => {
      //Arange
      let url = '/someUrlolz';

      //Act
      let auth = service.getAuthHeaders(url);

      //Assert
      expect(auth.get('Authorization')).toBeDefined();
    }));

  it('getAuthHeaders returns x-rd-api-key header',
    inject([AuthService], (service: AuthService) => {
      //Arange
      let url = '/someUrlolz';

      //Act
      let auth = service.getAuthHeaders(url);

      //Assert
      expect(auth.get('x-rd-api-key')).toBeDefined();
    }));

  it('getAuthHeaders returns x-rd-api-nonce header',
    inject([AuthService], (service: AuthService) => {
      //Arange
      let url = '/someUrlolz';

      //Act
      let auth = service.getAuthHeaders(url);

      //Assert
      expect(auth.get('x-rd-api-nonce')).toBeDefined();
    }));

  it('getAuthHeaders returns x-rd-timestamp header',
    inject([AuthService], (service: AuthService) => {
      //Arange
      let url = '/someUrlolz';

      //Act
      let auth = service.getAuthHeaders(url);

      //Assert
      expect(auth.get('x-rd-timestamp')).toBeDefined();
    }));

  it('getAuthHeadersWithoutAuth returns x-rd-api-key header',
    inject([AuthService], (service: AuthService) => {
      //Arange
      let url = '/someUrlolz';
      //Act
      let auth = service.getAuthHeadersWithoutAuth(url);
      //Assert
      expect(auth.get('x-rd-api-key')).toBeDefined();
    }));

  it('getAuthHeadersWithoutAuth returns x-rd-api-nonce header',
    inject([AuthService], (service: AuthService) => {
      //Arange
      let url = '/someUrlolz';
      //Act
      let auth = service.getAuthHeadersWithoutAuth(url);
      //Assert
      expect(auth.get('x-rd-api-nonce')).toBeDefined();
    }));

  it('getAuthHeadersWithoutAuth returns x-rd-timestamp header',
    inject([AuthService], (service: AuthService) => {
      //Arange
      let url = '/someUrlolz';
      //Act
      let auth = service.getAuthHeadersWithoutAuth(url);
      //Assert
      expect(auth.get('x-rd-timestamp')).toBeDefined();
    }));

  it('logout should delete authToken to make isAuthenticated return false',
    inject([AuthService, Http], (service: AuthService, http) => {
      //Arrange
      //Act
      service.logout();
      //Assert
      expect(service.isAuthenticated()).toEqual(false);
    }));

  it('login should make a request to //mock.rentdynamics.com',
    inject([AuthService, Http], (service: AuthService, http) => {
      //Arrange
      let user = {
        username: 'RdOverseer',
        password: 'ReNtDyn@m!c$'
      };
      spyOn(http, 'post').and.callThrough();
      //Act
      service.login(user);
      //Assert
      expect(http.post).toHaveBeenCalledWith('//mock.rentdynamics.com/auth/login', jasmine.any(Object));
    }));

  it('login should use JsSha to hide password and then POST it',
    inject([AuthService, Http], (service: AuthService, http) => {
      //Arrange
      let user = {
        username: 'RdOverseer',
        password: 'ReNtDyn@m!c$'
      };
      spyOn(http, 'post').and.callThrough();
      //Act
      service.login(user);
      //Assert
      expect(http.post).toHaveBeenCalledWith('//mock.rentdynamics.com/auth/login', { username: 'RdOverseer', password: 'ad0f7b5edfa684baa520c74467da0703c8aa3f74' });
    }));

  it('ssoLogin should call http',
    inject([AuthService, Http], (service: AuthService, http) => {
      //Arrange
      let token = 'l8H98pUtoi7glkUGiyfyu6fUYiT';
      spyOn(http, 'post').and.callThrough();
      //Act
      service.ssoLogin(token);
      //Assert
      expect(http.post).toHaveBeenCalledWith('//mock.rentdynamics.com/auth/sso_login', jasmine.any(Object), jasmine.any(Object));
    }));

  it('ssoLogin should return an observable that we can subscribe to',
    inject([AuthService, Http], (service: AuthService, http) => {
      //Arrange
      let token = 'l8H98pUtoi7glkUGiyfyu6fUYiT';
      let returnedValue = '{"userId": 1234, "token": "klu79yg75UYG5UIG8TgvTR"}';
      spyOn(http, 'post').and.returnValue(observableFrom([returnedValue]));
      //Act
      service.ssoLogin(token).subscribe((result) => {
        //Assert
        expect(result).toEqual(returnedValue);
      });
    }));

  it('forgotPassword should send a POST to //mock.rentdynamics.com/auth/reset_password',
    inject([AuthService, Http], (service: AuthService, http) => {
      //Arrange
      let username = 'RdOverseer';
      spyOn(http, 'post').and.callThrough();
      //Act
      service.forgotPassword(username);
      //Assert
      expect(http.post).toHaveBeenCalledWith('//mock.rentdynamics.com/auth/reset_password', jasmine.any(Object), jasmine.any(Object));
    }));

  it('forgotPassword should send a POST to //mock.rentdynamics.com/auth/reset_password with an object of the username',
    inject([AuthService, Http], (service: AuthService, http) => {
      //Arrange
      let username = 'RdOverseer';
      spyOn(http, 'post').and.callThrough();
      //Act
      service.forgotPassword(username);
      //Assert
      expect(http.post).toHaveBeenCalledWith('//mock.rentdynamics.com/auth/reset_password', { username: username }, jasmine.any(Object));
    }));

  it('forgotPassword should pass endpoint not url to getAuthHeadersWithoutAuth()',
    inject([AuthService, Http], (service: AuthService, http) => {
      //Arrange
      let username = 'RdOverseer';
      let spy = spyOn(service, 'getAuthHeadersWithoutAuth').and.callThrough();
      //Act
      service.forgotPassword(username);
      //Assert
      expect(spy).toHaveBeenCalledWith('/auth/reset_password', jasmine.any(Object));
    }));

  it('getHost should return //mock.rentdynamics.com from provided config',
    inject([AuthService], (service: AuthService) => {
      //Arrange

      //Act
      let host = service.getHost();
      //Assert
      expect(host).toEqual('//mock.rentdynamics.com');
    }));

    it('getSvcRoute() should be ""',
        inject([AuthService], (service: AuthService) => {
            //Arrange

            //Act
            let route = service.getSvcRoute();
            //Assert
            expect(route).toEqual('');
        }));
});

class AuthServiceWithRouteConfigMock implements AuthServiceConfig {
    apiKey: string = '';
    authToken: string = '';
    host: string = '//mock.rentdynamics.com';
    serviceRoute: string = '/svc/report-scheduler';
    secretKey: string = '';
    userId: string = '';
}

describe('Service: AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                AuthService,
                { provide: AuthServiceConfig, useClass: AuthServiceWithRouteConfigMock },
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });
    });

it('getSvcRoute() should be "/svc/report-scheduler"',
    inject([AuthService], (service: AuthService) => {
        //Arrange

        //Act
        let route = service.getSvcRoute();
        //Assert
        expect(route).toEqual('/svc/report-scheduler');
    }));
});

