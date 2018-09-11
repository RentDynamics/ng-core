import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreApiService } from '../../shared/core-api.service';

@Component({
  selector: 'rd-core-submit-new-password',
  templateUrl: './core-submit-new-password.component.html',
  styleUrls: ['./core-submit-new-password.component.css']
})
export class CoreSubmitNewPasswordComponent implements OnInit {

  newPassword: string = '';
  confirmPassword: string = '';
  isValidToken: boolean = true;
  errorMessage: string = null;
  token: string;

  constructor(private coreApiSvc: CoreApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.token = this.getToken();
    this.checkToken();
  }

  getToken() {
    return this.route.snapshot.params['token'];
  }

  checkToken() {
    let endpoint = '/auth/check_password_reset_link';
    let data = {
      reset_token: this.token
    };
    this.coreApiSvc.postWithoutAuth(endpoint, data)
      .subscribe(
        () => {
          // The token is still valid
        },
        (error) => {
          // The token isn't valid anymore
          this.isValidToken = false;
          this.errorMessage = error.json().error_message;
        }
      );
  }

  hashPassword(password: string) {
    var shaObj = new jsSHA('SHA-1', 'TEXT');
    shaObj.update(password);
    shaObj = shaObj.getHash('HEX');
    return shaObj;
  }

  changePassword() {
    let endpoint = '/auth/submit_new_password';
    let jsShaPassword = this.hashPassword(this.newPassword);
    let data = {
      reset_token: this.token,
      password: jsShaPassword
    };
    this.coreApiSvc.postWithoutAuth(endpoint, data)
      .subscribe(
        (result) => {
          this.router.navigateByUrl('/auth/password-update-success');
        },
        (error) => {
          this.errorMessage = error.json().error_message;
        }
      );
  }

}
