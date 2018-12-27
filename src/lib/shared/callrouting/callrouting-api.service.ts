
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, URLSearchParams, Response } from '@angular/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

import { ApiService } from '../shared/api.service';
import { CallroutingAuthService } from './callrouting-auth.service';


@Injectable()
export class CallroutingApiService extends ApiService {

  constructor(authService: CallroutingAuthService, http: Http) {
    super(authService, http);
  }

  get(endpoint: string, options: RequestOptionsArgs = {}, responseType: string = 'json'): Observable<any> {
    return super.get(endpoint, options).pipe(map((response: Response) => {
      return response[responseType]();
    }));
  }

  put(endpoint: string, body: any, options: RequestOptionsArgs = {}, responseType: string = 'json'): Observable<any> {
    return super.put(endpoint, body, options).pipe(map((response: Response) => {
      return response[responseType]();
    }));
  }

  post(endpoint: string, body: any, options: RequestOptionsArgs = {}, responseType: string = 'json'): Observable<any> {
    return super.post(endpoint, body, options).pipe(map((response: Response) => {
      return response[responseType]();
    }));
  }

  postBlob(endpoint: string, body: any, options: RequestOptionsArgs = {}): Observable<any> {
    return super.post(endpoint, body, options);
  }

}
