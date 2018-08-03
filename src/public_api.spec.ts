/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable, Observer } from 'rxjs';

import { ReportingApiService, ReportingAuthService, ReportingAuthServiceConfig } from './public_api';

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
        expect(ReportingApiService).toBeTruthy();
    }));
    it('should export ReportingAuthService', inject([], () => {
        expect(ReportingAuthService).toBeTruthy();
    }));
    it('should export ReportingAuthServiceConfig', inject([], () => {
        expect(ReportingAuthServiceConfig).toBeTruthy();
    }));
});
