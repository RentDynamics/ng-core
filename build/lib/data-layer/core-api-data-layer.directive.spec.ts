/* tslint:disable:no-unused-variable */
import { ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import {
  async, inject
} from '@angular/core/testing';

import { CoreApiService } from '../shared/core-api.service';

import { RdAngularCoreModule } from '../core.module';
import { CoreApiDataLayerDirective } from './core-api-data-layer.directive';

describe('Directive: CoreApiDataLayer', () => {
  // simple style
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RdAngularCoreModule,
        HttpModule,
      ],
      providers: [
        { provide: CoreApiService, useValue: {} }
      ],
    });
  });

  it('should create an instance', inject([CoreApiService], (coreApiSvc) => {
    let directive = new CoreApiDataLayerDirective(coreApiSvc);
    expect(directive).toBeTruthy();
  }));
});
