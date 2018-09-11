/* tslint:disable:no-unused-variable */

import {from as observableFrom} from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import {of as observableOf} from 'rxjs';

import { CoreAuthService } from '../../shared/core-auth.service';

import { CoreForgotPasswordComponent } from './core-forgot-password.component';
import { Router } from '@angular/router';


let fixture;
let component: CoreForgotPasswordComponent;

describe('Component: CoreForgotPasswordComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        CoreForgotPasswordComponent
      ],
      providers: [
        { provide: CoreAuthService, useValue: {forgotPassword: () => { return observableOf([]); } } },
        { provide: Router, useValue: {navigate: (res) => { return true; }, navigateByUrl: () => {return true; }} }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(CoreForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should make a request to AuthService.forgotPassword on forgotPassword', inject([CoreAuthService], (authSvc: CoreAuthService) => {
    // Arrange
    spyOn(component, 'sendEmail').and.returnValue(null);
    spyOn(authSvc, 'forgotPassword').and.callThrough();
    component.username = 'testing@testing.com';
    // Act
    component.forgotPassword();
    // Assert
    expect(authSvc.forgotPassword).toHaveBeenCalled();
    expect(authSvc.forgotPassword).toHaveBeenCalledWith('testing@testing.com');
  }));

  it('should generate an email on forgotPassword', inject([CoreAuthService], (authSvc: CoreAuthService) => {
    // Arrange
    let token = 'abcdefghijklmnopqrstuvwxyz1234567890';
    spyOn(authSvc, 'forgotPassword').and.returnValue( observableFrom([{reset_password_token: token}]) );
    spyOn(component, 'sendEmail').and.returnValue(null);
    component.username = 'testing@testing.com';
    // Act
    component.forgotPassword();
    // Assert
    expect(component.sendEmail).toHaveBeenCalled();
    expect(component.sendEmail).toHaveBeenCalledWith(component.username, token);
  }));

  it(`should return an error if username isn't an email && email in the system isn't an email`, inject([CoreAuthService], (authSvc: CoreAuthService) => {
    // Arrange
    spyOn(component, 'sendEmail').and.returnValue(null);
    spyOn(authSvc, 'forgotPassword').and.returnValue( observableFrom([ {user_email: 'not-a-real-email-address'} ]) );
    component.username = 'myUsername';
    // Act
    component.forgotPassword();
    // Assert
    expect(component.errorMessage).toBeTruthy();
    expect(component.errorMessage).toEqual('You do not have a valid email address in our system.');
  }));

  it('should return true if email is valid on isValidEmail', () => {
    // Arrange
    spyOn(component, 'sendEmail').and.returnValue(null);
    let email = 'test@me.com';
    // Act
    let response = component.isEmailAddress(email);
    // Assert
    expect(response).toEqual(true);
  });

  it('should return false if email is NOT valid on isValidEmail', () => {
    // Arrange
    spyOn(component, 'sendEmail').and.returnValue(null);
    let email = 'myUsername';
    // Act
    let response = component.isEmailAddress(email);
    // Assert
    expect(response).toEqual(false);
  });

});