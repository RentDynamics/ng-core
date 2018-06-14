import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { ReportSchedulerAuthServiceConfig } from './report-scheduler-auth-service-config';

declare var jsSHA: jsSHA.jsSHA;

@Injectable()
export class ReportSchedulerAuthService extends AuthService {

    constructor(config: ReportSchedulerAuthServiceConfig, http: Http) {
        super(config, http);
    }

}
