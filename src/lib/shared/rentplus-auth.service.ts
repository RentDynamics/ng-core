import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './shared/auth.service';
import { RentplusAuthServiceConfig } from './rentplus-auth-service-config';

declare var jsSHA: jsSHA.jsSHA;

@Injectable()
export class RentplusAuthService extends AuthService {

    constructor(config: RentplusAuthServiceConfig, http: Http) {
        super(config, http);
    }

}
