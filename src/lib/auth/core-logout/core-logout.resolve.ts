import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Router } from "@angular/router";

import { AuthService } from '../../shared/shared/auth.service';

@Injectable()
export class CoreLogoutResolve implements Resolve<any> {

  constructor(public authSvc: AuthService, public router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    this.authSvc.logout();
    this.afterLogout(route);
    return Promise.resolve("continue so the AuthGuard can catch you");
  }

  afterLogout(route: ActivatedRouteSnapshot) {
    // You can override this will whatever you want
    // You also have access to the ActivatedRouteSnapshot if you want/need it
  }

}