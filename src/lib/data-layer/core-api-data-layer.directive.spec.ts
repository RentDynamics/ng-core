/* tslint:disable:no-unused-variable */
import {ElementRef, Inject, ChangeDetectorRef, NO_ERRORS_SCHEMA} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs';

import {
  async, inject
} from '@angular/core/testing';

import { CoreApiService } from '../shared/core-api.service';

// import { RdAngularCoreModule } from '../core.module';
import { CoreApiDataLayerDirective } from './core-api-data-layer.directive';

describe('Directive: CoreApiDataLayer', () => {
  // simple style
  beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [CoreApiDataLayerDirective],
      imports: [
      ],
      providers: [
        { provide: CoreApiService, useValue: {} }
      ],
        schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should create an instance', inject([CoreApiService], (coreApiSvc) => {
    let directive = new CoreApiDataLayerDirective(coreApiSvc);
    expect(directive).toBeTruthy();
  }));
});
