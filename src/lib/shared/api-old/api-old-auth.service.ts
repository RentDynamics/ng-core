import { EventEmitter, Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { CookieService } from 'angular2-cookie/core';

import { AuthService, CoreApiService, CoreAuthServiceConfig } from '@rd/core';

import { CredentialsModel, SessionRequest } from '../auth';
import { ApiOldAuthServiceConfig } from './api-old-auth-service-config';

export interface AuthServiceLogin {
  login(user: CredentialsModel): Promise<void>;
}

@Injectable()
export class ApiOldAuthService extends AuthService implements AuthServiceLogin {
  afterLogin: EventEmitter<any> = new EventEmitter<any>();
  config: ApiOldAuthServiceConfig;

  get userEndpoint(): string { return this.config.userId ? `/users/${this.config.userId}?include=role` : null; };

  constructor(authSvcConfig: ApiOldAuthServiceConfig, http: Http, protected cookieSvc: CookieService) {
    super(authSvcConfig, http);
    this.config = authSvcConfig;
  }

  isAuthenticated(){
    return window.sessionStorage.getItem('rdUserId') && window.sessionStorage.getItem('rdUserAuthToken') ? true : false;
  }

  login(user: CredentialsModel) {
    this.config.userId = user.userId;
    this.config.authToken = user.authToken;
    return this.http.post(`${this.config.host}/api/v1/Account/Login`, { UserName: user.username, Password: user.password, ResetPassword: user.resetPassword, NewPassword: user.newPassword }, {withCredentials: true}).toPromise().then((result)=> {
      console.log('login http POST() result', result);
      /* todo: set/get cookie??? */
    }, (error) => {
      console.log(error);
    });
  }

  logout(){
    return this.http.post(`${this.config.host}/api/v1/Account/LogOff`, {}, {withCredentials: true}).toPromise().then((result) => {
      super.logout();
    });
  }

  resetPassword(resetPasswordToken: string, newPassword: string) {
    return this.http.post(`${this.config.host}/api/v1/Account/ResetPassword`, { ResetPasswordToken: resetPasswordToken, NewPassword: newPassword }, {withCredentials: true});
  }

}
