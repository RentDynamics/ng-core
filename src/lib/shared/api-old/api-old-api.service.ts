import { Observable} from "rxjs/internal/Observable";
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';

import { ApiService, extend } from '../../index';
import { ApiOldAuthService } from './api-old-auth.service';

@Injectable()
export class ApiOldApiService extends ApiService {

  constructor(apiOldAuthSvcConfig: ApiOldAuthService, http: Http) { 
    super(apiOldAuthSvcConfig, http);
  }

  get(endpoint: string, options: RequestOptionsArgs = {}, responseType: string = 'json'){
    return super.get(endpoint, extend({ withCredentials: true }, options)).pipe(map((response: Response) => {
      return response[responseType]();
    }));
  }

  put(endpoint: string, body: any, options: RequestOptionsArgs = {}, responseType: string = 'json'){
    return super.put(endpoint, body, extend({ withCredentials: true }, options)).pipe(map((response: Response) => {
      return response[responseType]();
    }));
  }

  post(endpoint: string, body: any, options: RequestOptionsArgs = {}, responseType: string = 'json'){
    return super.post(endpoint, body, extend({ withCredentials: true }, options)).pipe(map((response: Response) => {
      return response[responseType]();
    }));
  }

  postWithoutResponse(endpoint: string, body: any, options: RequestOptionsArgs = {}){
    return super.post(endpoint, body, extend({ withCredentials: true }, options));
  }

  delete(endpoint: string, options: RequestOptionsArgs = {}, responseType: string = 'json'){
    return super.delete(endpoint, extend({ withCredentials: true }, options)).pipe(map((response: Response) => {
      return response[responseType]();
    }));
  }
}
