import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthServiceConfig, CoreAuthServiceConfig } from '@rd/core';

import { ApiOldApiService } from './api-old-api.service';
import { ApiOldAuthService } from './api-old-auth.service';
import { CookieService, CookieOptions, CookieOptionsArgs } from 'angular2-cookie/core';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    /* https://github.com/salemdar/angular2-cookie#options */
    CookieService,
    { provide: CookieOptions, useValue: { } },
    AuthServiceConfig, 
    CoreAuthServiceConfig,
    ApiOldApiService,
    ApiOldAuthService
  ]
})
export class ApiOldModule { }
