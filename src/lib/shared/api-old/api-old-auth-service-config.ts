import { EventEmitter, Injectable, Inject } from '@angular/core';
import { BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthServiceConfig, CoreAuthServiceConfig } from '../index';

@Injectable()
export class ApiOldAuthServiceConfig implements AuthServiceConfig {
  apiKey: string = 'bbd30373-2';
  authToken: string = '';
  secretKey: string = 'abbd7a3b-af84-432c-b';
  userId: string = '';
  session$?: EventEmitter<any> = new EventEmitter<any>();
  host: string;
  username?: string;
  password?: string;

  constructor() {}

  getUri(path: string){}
}