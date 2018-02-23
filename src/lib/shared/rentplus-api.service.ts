import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, URLSearchParams, Response } from '@angular/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs/Rx';

import { ApiService } from './shared/api.service';
import { RentplusAuthService } from './rentplus-auth.service';


@Injectable()
export class RentplusApiService extends ApiService {

  constructor(authService: RentplusAuthService, http: Http) {  
    super(authService, http);
  }

}
