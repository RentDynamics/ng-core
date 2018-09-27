import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreAuthGuard } from './guard/auth.guard';
import { CoreForgotPasswordComponent } from './core-forgot-password/core-forgot-password.component';
import { CoreLoginComponent } from './core-login/core-login.component';
import { CoreSubmitNewPasswordComponent } from './core-submit-new-password/core-submit-new-password.component';
import { CoreLogoutComponent } from './core-logout/core-logout.component';
import { CoreLogoutResolve } from './core-logout/core-logout.resolve';
import { CoreAuthRoutingModule } from './core-auth-routing.module';


@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    // CoreAuthRoutingModule
  ],
  providers: [
    CoreAuthGuard,
    CoreLogoutResolve
  ],
  declarations: [
    CoreLoginComponent,
    CoreForgotPasswordComponent,
    CoreSubmitNewPasswordComponent,
    CoreLogoutComponent
  ],
  exports: [
    CoreLoginComponent,
    CoreForgotPasswordComponent,
    CoreSubmitNewPasswordComponent,
    CoreLogoutComponent,
    // FormsModule,
    CoreAuthRoutingModule
  ]
})
export class CoreAuthModule {}
