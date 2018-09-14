/* tslint:disable:no-unused-variable */
import {TestBed, async, inject, fakeAsync, tick, flush} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {combineLatest, Observable, Observer, of} from 'rxjs';

import {CoreApiService} from '../shared';

import {provideStorage, StorageConfigToken, Storage, StorageConfig} from './storage';
import {StorageModule} from './storage.module';
import {catchError, flatMap, map, mergeMap, switchMap, tap, toArray} from 'rxjs/operators';

import { IndexedDBDatabase, LocalStorage, localStorageProviders } from '@ngx-pwa/local-storage';

// global.indexedDB = require('fake-indexeddb');
// global.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');

describe('Storage @ngx-pwa/local-storage', () => {
  let localStorage: LocalStorage = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: CoreApiService, useValue: {}},
        {provide: Http, useClass: MockBackend},
        localStorageProviders({}),
        // LocalStorage
      ],
      imports: [
        // StorageModule.forRoot({
        //   name: '__my_test_db',
        //   storeName: '__my_test_store',
        //   driverOrder: ['indexeddb', 'websql']
        // }),
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
  });

  beforeEach(inject([LocalStorage], (_localStorage) => {
    // storage = stor;
    localStorage = _localStorage;
  }));

  it('@ngx-pwa/local-storage!!', (done) => {

    localStorage.setItem('test1', {id: 1}).subscribe((rr) => {
      console.log(rr);
      expect(rr).toBeTruthy();
      done();
    });

  });

  afterEach((done) => {
    done();
    // Promise.all([pouch.destroy()]).then(() => {
    //   done();
    // });
  });
});
