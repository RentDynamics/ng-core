import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {of as observableOf, from as observableFrom} from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreAuthService } from '../../shared/core-auth.service';
import { CoreLoginComponent } from './core-login.component';

let component: CoreLoginComponent;
let fixture: ComponentFixture<CoreLoginComponent>;

describe('CoreLoginComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      providers: [
        { provide: CoreAuthService, useValue: {login: () => {observableFrom([{id: 1}]).toPromise()} } },
        { provide: Router, useValue: {navigate: (res) => { return true; }, navigateByUrl: () => {return true; }} },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: '' }} }
      ],
      declarations: [ CoreLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {

    it('should call navigate on success', inject([CoreAuthService, Router], (authSvc: CoreAuthService, router: Router) => {
      // Arrange
      component.username = 'Testing';
      component.password = 'p@$$word';
      component.returnUrl = null;
      let authSpy = spyOn(authSvc, 'login').and.returnValue(observableOf([{id: 1}]).toPromise());
      let routerSpy = spyOn(router, 'navigate');
      // Act
      component.login();
      // Assert
      authSpy.calls.mostRecent().returnValue.then(() => {
        fixture.detectChanges();
        expect(routerSpy).toHaveBeenCalled();  
      });
    }));

    it('should call navigateByUrl on success with returnUrl', inject([CoreAuthService, Router], (authSvc: CoreAuthService, router: Router) => {
      // Arrange
      component.username = 'Testing';
      component.password = 'p@$$word';
      component.returnUrl = 'something';
      let authSpy = spyOn(authSvc, 'login').and.returnValue(observableFrom([{id: 1}]).toPromise());
      let routerSpy = spyOn(router, 'navigateByUrl');
      // Act
      component.login();
      // Assert
      authSpy.calls.mostRecent().returnValue.then(() => {
        fixture.detectChanges();
        expect(routerSpy).toHaveBeenCalled();
      });
    }));

  });

});
