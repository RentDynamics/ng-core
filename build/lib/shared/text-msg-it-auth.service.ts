import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './shared/auth.service';
import { TextMsgItAuthServiceConfig } from './text-msg-it-auth-service-config';


@Injectable()
export class TextMsgItAuthService extends AuthService {

    constructor(config: TextMsgItAuthServiceConfig, http: Http) {
        super(config, http);
    }

}
