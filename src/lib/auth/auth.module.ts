import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreAuthGuard } from './guard/auth.guard';
import { CoreForgotPasswordComponent } from './core-forgot-password/core-forgot-password.component';
import { CoreLoginComponent } from './core-login/core-login.component';
import { CoreSubmitNewPasswordComponent } from './core-submit-new-password/core-submit-new-password.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  imports: [ 
    CommonModule, 
  ],
  providers: [
    CoreAuthGuard
  ],
  declarations: [
    CoreLoginComponent,
    CoreForgotPasswordComponent,
    CoreSubmitNewPasswordComponent,
    LogoutComponent
  ],
  exports: [
    CoreLoginComponent,
    CoreForgotPasswordComponent,
    CoreSubmitNewPasswordComponent,
    LogoutComponent
  ]
})
export class RdAngularAuthModule {}
