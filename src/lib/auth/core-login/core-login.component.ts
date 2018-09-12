import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {of as observableOf, Observable} from 'rxjs';

import { CoreAuthService } from '../../shared/core-auth.service';

@Component({
  selector: 'rd-core-login',
  templateUrl: './core-login.component.html',
  styleUrls: ['./core-login.component.css']
})
export class CoreLoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  returnUrl: string;
  navigateTo: string = '/';

  constructor(public authSvc: CoreAuthService, public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  login() {
    const user = { username: this.username, password: this.password };
    this.authSvc.login(user).then(() => {
      this.afterLogin().subscribe((res) => {
        if (this.returnUrl) {
          return this.router.navigateByUrl(this.returnUrl);
        }
        return this.router.navigate([this.navigateTo]);
      });
    });
  }

  afterLogin(): Observable<any> {
    // This function is to be be overwritten, if/when needed
    return observableOf([]);
  }

}
