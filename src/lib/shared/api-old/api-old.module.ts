import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthServiceConfig } from '../shared/auth-service-config';
import { CoreAuthServiceConfig } from '../core-auth-service-config';

import { ApiOldApiService } from './api-old-api.service';
import { ApiOldAuthService } from './api-old-auth.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    /* https://github.com/salemdar/angular2-cookie#options */
    AuthServiceConfig,
    CoreAuthServiceConfig,
    ApiOldApiService,
    ApiOldAuthService
  ]
})
export class ApiOldModule { }
