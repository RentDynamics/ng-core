import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthServiceConfig } from '../shared/auth-service-config';
import { CoreAuthServiceConfig } from '../core-auth-service-config';

import { CallroutingApiService } from "./callrouting-api.service";
import { CallroutingAuthService } from "./callrouting-auth.service";

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    /* https://github.com/salemdar/angular2-cookie#options */
    AuthServiceConfig,
    CoreAuthServiceConfig,
    CallroutingApiService,
    CallroutingAuthService
  ]
})
export class CallroutingModule { }
