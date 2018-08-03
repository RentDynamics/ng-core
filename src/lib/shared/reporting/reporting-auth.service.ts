import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { ReportingAuthServiceConfig } from './reporting-auth-service-config';

declare var jsSHA: jsSHA.jsSHA;

@Injectable()
export class ReportingAuthService extends AuthService {

    constructor(config: ReportingAuthServiceConfig, http: Http) {
        super(config, http);
    }

}
