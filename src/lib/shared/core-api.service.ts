import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, URLSearchParams, Response } from '@angular/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs/Rx';

import { ApiService } from './shared/api.service';
import { CoreAuthService } from './core-auth.service';


@Injectable()
export class CoreApiService extends ApiService {

  constructor(authService: CoreAuthService, http: Http) {  
    super(authService, http);
  }

}
