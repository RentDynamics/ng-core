
import {of as observableOf, Observable} from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreAuthService, CoreApiService, ApiOldAuthService } from '../shared';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        {
          provide: CoreAuthService, useValue: {
          login: function () {
            return new Promise((pass, fail) => {
              pass({authToken: 'anlkjsdnflkj'});
            });
          }
        }
        },
        { provide: ApiOldAuthService, useValue: {get: function () {
              return observableOf([]);
            }, post: function () { return observableOf([]); }} },
        { provide: CoreApiService, useValue: {get: function () {
              return observableOf({});
            }} },
        { provide: Router, useValue: {} },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} } } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
