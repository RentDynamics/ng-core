import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';

import { AuthService } from './shared/auth.service';
import { CoreAuthServiceConfig } from './core-auth-service-config';
import * as _jsSHA from 'jssha';

declare var jsSHA: _jsSHA.jsSHA;

@Injectable()
export class CoreAuthService extends AuthService {

    constructor(config: CoreAuthServiceConfig, http: Http) {
        super(config, http);
    }

}
