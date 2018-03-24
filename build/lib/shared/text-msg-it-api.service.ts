import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, URLSearchParams, Response } from '@angular/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs/Rx';

import { ApiService } from './shared/api.service';
import { TextMsgItAuthService } from './text-msg-it-auth.service';


@Injectable()
export class TextMsgItApiService extends ApiService {

  constructor(authService: TextMsgItAuthService, http: Http) {  
    super(authService, http);
  }

}
