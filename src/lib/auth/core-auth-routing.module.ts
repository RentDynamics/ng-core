import { NgModule }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreLoginComponent } from './core-login/core-login.component';
import { CoreForgotPasswordComponent } from './core-forgot-password/core-forgot-password.component';
import { CoreSubmitNewPasswordComponent } from './core-submit-new-password/core-submit-new-password.component';
import { CoreAuthGuard } from './guard/auth.guard';
import { CoreLogoutComponent } from './core-logout/core-logout.component';
import { CoreLogoutResolve } from './core-logout/core-logout.resolve';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: CoreLoginComponent },
  { path: 'forgot-password', component: CoreForgotPasswordComponent },
  { path: 'submit-new-password/:token', component: CoreSubmitNewPasswordComponent },
  { path: 'logoff', canActivate: [CoreAuthGuard], component: CoreLogoutComponent, resolve: { logout: CoreLogoutResolve } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreAuthRoutingModule { }
