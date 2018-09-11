/* tslint:disable:no-unused-variable */
import {
  inject, TestBed
} from '@angular/core/testing';
import { Router } from '@angular/router';

import { CoreAuthService } from '../../shared/core-auth.service';
import { CoreAuthGuard } from './auth.guard';

let guard: CoreAuthGuard;

describe('CoreAuthGuard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        CoreAuthGuard,
        { provide: CoreAuthService, useValue: { isAuthenticated: () => { return true; } } },
        { provide: Router, useValue: {navigate: () => {}} }
      ]
    });
    guard = TestBed.get(CoreAuthGuard, null);
  });

  it('should create an instance', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true on canActivate', inject([Router, CoreAuthService], (router: Router, coreAuthSvc: CoreAuthService) => {
    // Arrange
    spyOn(coreAuthSvc, 'isAuthenticated').and.returnValue(true);
    // Act
    let result = guard.canActivate();
    // Assert
    expect(result).toBeTruthy();
  }));

  it('should return false on canActivate', inject([Router, CoreAuthService], (router: Router, coreAuthSvc: CoreAuthService) => {
    // Arrange
    spyOn(coreAuthSvc, 'isAuthenticated').and.returnValue(false);
    let spy = spyOn(router, 'navigate');
    // Act
    let result = guard.canActivate();
    // Assert
    expect(result).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  }));

});