import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './shared/auth.service';
import { CoreAuthServiceConfig } from './core-auth-service-config';

declare var jsSHA: jsSHA.jsSHA;

@Injectable()
export class CoreAuthService extends AuthService {

    constructor(config: CoreAuthServiceConfig, http: Http) {
        super(config, http);
    }

}
