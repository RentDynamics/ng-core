import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, URLSearchParams, Response } from '@angular/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

import { extend } from '../../helpers';
import { AuthService } from './auth.service';


@Injectable()
export class ApiService {

  constructor(public authService: AuthService, public http: Http) { }

  get(endpoint: string, options: RequestOptionsArgs = {}): Observable<any> {
    let url = this.getHost() + endpoint;
    let headers = this.authService.getAuthHeaders(endpoint);

    return this.http.get(url, extend({
      headers: headers
    }, options));
  }

  put(endpoint: string, body: any, options: RequestOptionsArgs = {}): Observable<any> {
    let url = this.getHost() + endpoint;
    let headers = this.authService.getAuthHeaders(endpoint, body);

    return this.http.put(url, body, extend({
      headers: headers
    }, options));
  }

  post(endpoint: string, body: any, options: RequestOptionsArgs = {}): Observable<any> {
    let url = this.getHost() + endpoint;
    let headers = this.authService.getAuthHeaders(endpoint, body);

    return this.http.post(url, body, extend({
      headers: headers
    }, options));
  }

  postWithoutAuth(endpoint: string, body: any, options: RequestOptionsArgs = {}): Observable<any> {
    let url = this.getHost() + endpoint;
    let headers = this.authService.getAuthHeadersWithoutAuth(endpoint, body);

    return this.http.post(url, body, extend({
      headers: headers
    }, options));
  }

  delete(endpoint: string, options: RequestOptionsArgs = {}): Observable<any> {
    let url = this.getHost() + endpoint;
    let headers = this.authService.getAuthHeaders(endpoint);

    return this.http.delete(url, extend({
      headers: headers
    }, options));
  }

  errorHandler(error) {
    /* todo: make this a lot better (abstract out to @rd/core exception-handler.service or something) */
    let logError = (error && error.json ? error.json().error_message : error);
    console.error('errorHandler()', logError);
  }

  getHost() {
    return this.authService.getHost();
  }

}
