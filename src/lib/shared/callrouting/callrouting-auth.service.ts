import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { CallroutingAuthServiceConfig } from './callrouting-auth-service-config';

declare var jsSHA: jsSHA.jsSHA;

@Injectable()
export class CallroutingAuthService extends AuthService {

    constructor(config: CallroutingAuthServiceConfig, http: Http) {
        super(config, http);
    }

}
