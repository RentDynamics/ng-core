import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreLogoutComponent } from './core-logout.component';
import { Router } from '@angular/router';

describe('CoreCoreLogoutComponent', () => {
  let component: CoreLogoutComponent;
  let fixture: ComponentFixture<CoreLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreLogoutComponent ],
      providers: [{ provide: Router, useValue: {
        navigateByUrl: () => { }
      } }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
