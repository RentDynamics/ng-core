import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

export const loginRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
