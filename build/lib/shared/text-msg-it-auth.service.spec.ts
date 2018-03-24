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

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { TextMsgItAuthService } from './text-msg-it-auth.service';
import { TextMsgItAuthServiceConfig } from './text-msg-it-auth-service-config';

class TextMsgItAuthServiceConfigMock implements TextMsgItAuthServiceConfig {
  apiKey: string = '';
  authToken: string = '';
  host: string = '//mock.rentdynamics.com';
  secretKey: string = '';
  userId: string = '';
}

describe('Service: TextMsgItAuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        TextMsgItAuthService,
        { provide: TextMsgItAuthServiceConfig, useClass: TextMsgItAuthServiceConfigMock },
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('can instantiate service when inject service',
    inject([TextMsgItAuthService], (service: TextMsgItAuthService) => {
      expect(service instanceof TextMsgItAuthService).toBe(true);
    }));

  it('service config should be instanceof TextMsgItAuthServiceConfigMock',
    inject([TextMsgItAuthService], (service: TextMsgItAuthService) => {
      expect(service.config instanceof TextMsgItAuthServiceConfigMock).toBe(true);
    }));

  it('service config host should be "//mock.rentdynamics.com"',
    inject([TextMsgItAuthService], (service: TextMsgItAuthService) => {
      expect(service.config.host).toBe('//mock.rentdynamics.com');
    }));

  it('getHost should return //mock.rentdynamics.com from provided config',
    inject([TextMsgItAuthService], (service: TextMsgItAuthService) => {
      //Arrange

      //Act
      let host = service.getHost();
      //Assert
      expect(host).toEqual('//mock.rentdynamics.com');
    }));
});
