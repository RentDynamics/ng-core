import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, URLSearchParams, Response } from '@angular/http';
import { BehaviorSubject, Observable, ReplaySubject, of } from 'rxjs';

import { extend } from '../../helpers';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';


@Injectable()
export class ApiService {

  constructor(public authService: AuthService, public http: Http) { }

  get(endpoint: string, options: RequestOptionsArgs = {}): Observable<any> {
    endpoint = this.getSvcRoute() + endpoint;
    let url = this.getHost() + endpoint;

    return of({}).pipe(
      map(() => this.authService.getAuthHeaders(endpoint)),
      switchMap(headers => this.http.get(url, extend({
        headers: headers
      }, options)))
    );
  }

  put(endpoint: string, body: any, options: RequestOptionsArgs = {}): Observable<any> {
    endpoint = this.getSvcRoute() + endpoint;
    let url = this.getHost() + endpoint;

    return of({}).pipe(
      map(() => this.authService.getAuthHeaders(endpoint, body)),
      switchMap(headers => this.http.put(url, body, extend({
        headers: headers
      }, options)))
    );
  }

  post(endpoint: string, body: any, options: RequestOptionsArgs = {}): Observable<any> {
    endpoint = this.getSvcRoute() + endpoint;
    let url = this.getHost() + endpoint;

    return of({}).pipe(
      map(() => this.authService.getAuthHeaders(endpoint, body)),
      switchMap(headers => this.http.post(url, body, extend({
        headers: headers
      }, options)))
    );
  }

  postWithoutAuth(endpoint: string, body: any, options: RequestOptionsArgs = {}): Observable<any> {
    endpoint = this.getSvcRoute() + endpoint;
    let url = this.getHost() + endpoint;

    return of({}).pipe(
      map(() => this.authService.getAuthHeadersWithoutAuth(endpoint, body)),
      switchMap(headers => this.http.post(url, body, extend({
        headers: headers
      }, options)))
    );
  }

  delete(endpoint: string, options: RequestOptionsArgs = {}): Observable<any> {
    endpoint = this.getSvcRoute() + endpoint;
    let url = this.getHost() + endpoint;

    return of({}).pipe(
      map(() => this.authService.getAuthHeaders(endpoint)),
      switchMap(headers => this.http.delete(url, extend({
        headers: headers
      }, options)))
    );
  }

  errorHandler(error) {
    /* todo: make this a lot better (abstract out to @rd/core exception-handler.service or something) */
    let logError = (error && error.json ? error.json().error_message : error);
    console.error('errorHandler()', logError);
  }

  getHost() {
    return this.authService.getHost();
  }

  getSvcRoute() {
    return this.authService.getSvcRoute();
  }
}
