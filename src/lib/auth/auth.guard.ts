import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { CoreAuthService } from '../shared';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private coreAuthSvc: CoreAuthService, private router: Router) {}

  canActivate() {
    let authenticated = this.coreAuthSvc.isAuthenticated();
    if (authenticated) {
      return true;
    } else {
      const pathname = location.pathname;
      const routerExtras = pathname && pathname !== '/' ? { queryParams: { returnUrl:  pathname } } : {};
      this.router.navigate([`/auth/login`], routerExtras);
      return false;
    }
  }

}
