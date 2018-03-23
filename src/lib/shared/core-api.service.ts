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

  get(endpoint: string, options: RequestOptionsArgs = {}, responseType: string = 'json'): Observable<any> {
    return super.get(endpoint, options).map((response: Response) => {
      return response[responseType]();
    });
  }

  put(endpoint: string, body: any, options: RequestOptionsArgs = {}, responseType: string = 'json'): Observable<any> {
    return super.put(endpoint, body, options).map((response: Response) => {
      return response[responseType]();
    });
  }

  post(endpoint: string, body: any, options: RequestOptionsArgs = {}, responseType: string = 'json'): Observable<any> {
    return super.post(endpoint, body, options).map((response: Response) => {
      return response[responseType]();
    });
  }

}
