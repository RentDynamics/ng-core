
import {takeUntil} from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreAuthService, CoreApiService, ApiOldAuthService } from '../shared';

import { Subject } from 'rxjs';

@Component({
  selector: 'admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  username = '';
  password = '';
  errorMessage = '';
  private returnUrl: string;
  private unsubscribe: Subject<{}> = new Subject();
  private loading = false;

  constructor(private authSvc: CoreAuthService, private coreApiSvc: CoreApiService, private apiOldAuthSvc: ApiOldAuthService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  afterLogin() {

  }

  onLogin() {
    this.loading = true;
    const user = { username: this.username, password: this.password };
    this.authSvc.login(user).then((response) => {
      const userEndpoint = `/users/${this.authSvc.userId}?include=role`;
      this.coreApiSvc.get(userEndpoint).pipe(takeUntil(this.unsubscribe)).subscribe((coreApiResult) => {

        this.apiOldAuthSvc.login({ username: this.username, password: this.password }).then((apiOldResult) => {
          if (coreApiResult.role.id === 1) {
            this.loading = false;
            if(this.returnUrl){
              return this.router.navigateByUrl(this.returnUrl);
            }
            return this.router.navigate(['/']);
          } else {
            this.loginFailure();
          }
        }, (apiOldErr: Error) => {
          this.loginFailure(apiOldErr.message ? apiOldErr.message : apiOldErr.toString());
        });
      }, (coreApiErr: Error) => {
        this.loginFailure(coreApiErr.message ? coreApiErr.message : coreApiErr.toString());
      });

    })
      .catch((error) => {
        this.password = '';
        this.loading = false;
        this.errorMessage = error.json().error_message;
      });
  }

  loginFailure(msg: string = 'You are not authorized to access this app!'){
    this.authSvc.logout();
    this.password = '';
    this.loading = false;
    this.errorMessage = msg;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
