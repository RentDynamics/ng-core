/* tslint:disable:no-unused-variable */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed, inject } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import {of as observableOf} from 'rxjs';

import { CoreApiService } from '../../shared/core-api.service';
import { CoreSubmitNewPasswordComponent } from './core-submit-new-password.component';

let fixture;
let component: CoreSubmitNewPasswordComponent;

describe('Component: CoreSubmitNewPassword', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        CoreSubmitNewPasswordComponent
      ],
      providers: [
        { provide: CoreApiService, useValue: {postWithoutAuth: () => { return observableOf([]); } } },
        { provide: Router, useValue: { navigateByUrl: () => {} } },
        { provide: ActivatedRoute, useValue: {
            snapshot: {
              params: {token: '123'}
            }
          }
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(CoreSubmitNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should call set Token on ngOnInit', inject([ActivatedRoute], (route: ActivatedRoute) => {
    // Arrange
    spyOn(route, 'snapshot').and.callThrough();
    // Act
    component.ngOnInit();
    // Assert
    expect(component.token).toEqual('123');
  }));

  it('should check if token is still valid on checkToken', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    component.token = '123';
    spyOn(coreApiSvc, 'postWithoutAuth').and.callThrough();
    // Act
    component.checkToken();
    // Assert
    expect(coreApiSvc.postWithoutAuth).toHaveBeenCalled();
    expect(coreApiSvc.postWithoutAuth).toHaveBeenCalledWith('/auth/check_password_reset_link', jasmine.any(Object));
  }));

  it('should call hashPassword on changePassword', inject([], () => {
    // Arrange
    component.token = '123';
    component.newPassword = 'myP@$$word';
    spyOn(component, 'hashPassword');
    // Act
    component.changePassword();
    // Assert
    expect(component.hashPassword).toHaveBeenCalled();
  }));

  it('should return a jsSHA of your given password on hashPassword', () => {
    // Arrange
    let password = 'myP@$$word';
    // Act
    let sha = component.hashPassword(password);
    // Assert
    expect(sha).toEqual('8b04aa3805025163f6b0366a0873a5386a75b0a3');
  });

  it('should call CoreApiService.postWithoutAuth on changePassword', inject([CoreApiService], (coreApiSvc: CoreApiService) => {
    // Arrange
    component.token = '123';
    spyOn(coreApiSvc, 'postWithoutAuth').and.callThrough();
    // Act
    component.changePassword();
    // Assert
    expect(coreApiSvc.postWithoutAuth).toHaveBeenCalled();
    expect(coreApiSvc.postWithoutAuth).toHaveBeenCalledWith('/auth/submit_new_password', jasmine.any(Object));
  }));

});