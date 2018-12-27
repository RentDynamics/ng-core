/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable, Observer } from 'rxjs';

import * as PUBLIC_API from './public_api';
var PublicApi = Object.assign({}, PUBLIC_API);


describe('public_api exports', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: Http, useClass: MockBackend },
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        });
    });

    it('should export ReportingApiService', inject([], () => {
      expect(PublicApi.ReportingApiService).toBeTruthy();
    }));
    it('should export ReportingAuthService', inject([], () => {
        expect(PublicApi.ReportingAuthService).toBeTruthy();
    }));
    it('should export ReportingAuthServiceConfig', inject([], () => {
        expect(PublicApi.ReportingAuthServiceConfig).toBeTruthy();
    }));

    it('should export CallroutingApiService', inject([], () => {
        expect(PublicApi.CallroutingApiService).toBeTruthy();
    }));
    it('should export CallroutingAuthService', inject([], () => {
        expect(PublicApi.CallroutingAuthService).toBeTruthy();
    }));
    it('should export CallroutingAuthServiceConfig', inject([], () => {
        expect(PublicApi.CallroutingAuthServiceConfig).toBeTruthy();
    }));
  
});
