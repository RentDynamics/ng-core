import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoreAuthService } from '../../shared/core-auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'rd-core-forgot-password',
  templateUrl: './core-forgot-password.component.html',
  styleUrls: ['./core-forgot-password.component.css']
})
export class CoreForgotPasswordComponent implements OnInit {

  username: string = '';
  errorMessage: string = null;

  navigateToUrl: string = '/auth/login';

  constructor(public authSvc: CoreAuthService, public router: Router) { }

  ngOnInit(): void {
  }

  forgotPassword(): void {
    this.authSvc.forgotPassword(this.username)
      .subscribe(
        (result) => {
          // Check if this.username is an email OR if result.user_email is an email
          let usernameIsEmail = this.isEmailAddress(this.username);
          let email = usernameIsEmail ? this.username : result.user_email;
          if (this.isEmailAddress(email)) {
            let token = result.reset_password_token;
            this.sendEmail(email, token).subscribe((res) => {
              this.router.navigateByUrl(this.navigateToUrl);
            });
          } else {
            this.errorMessage = 'You do not have a valid email address in our system.';
          }
        },
        (error) => {
          if (error.json && error.json()) {
            this.errorMessage = error.json().error_message;
          } else {
            this.errorMessage = error.message;
          }
        }
      );
  }

  sendEmail(email: string, token: string): Observable<any> {
    throw Error('CoreForgotPasswordComponent.sendEmail not implemented');
  }

  isEmailAddress(email: string): boolean {
    return email.indexOf('@') >= 0;
  }

}
