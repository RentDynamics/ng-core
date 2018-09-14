/* tslint:disable:no-unused-variable */
import {TestBed, async, inject, fakeAsync, tick, flush} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {combineLatest, Observable, Observer} from 'rxjs';

import {CoreApiService} from '../shared';

import {provideStorage, StorageConfigToken, Storage, StorageConfig} from './storage';
import {StorageModule} from './storage.module';
import {flatMap, map, mergeMap, switchMap, tap, toArray} from 'rxjs/operators';

import * as zangodb from 'zangodb';

// global.indexedDB = require('fake-indexeddb');
// global.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');

describe('Storage Zango', () => {
  let zango: zangodb.Db = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: CoreApiService, useValue: {}},
        {provide: Http, useClass: MockBackend},

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

  beforeEach(inject([], () => {
    // storage = stor;
    zango = new zangodb.Db('mydb', 1, { people: ['age'] });
  }));

  it('zangodb!!', (done) => {
    const people = zango.collection('people');

    const docs = [
      { name: 'Frank', age: 20 },
      { name: 'Thomas', age: 33 },
      { name: 'Todd', age: 33 },
      { name: 'John', age: 28 },
      { name: 'Peter', age: 33 },
      { name: 'George', age: 28 }
    ];

    people.insert(docs).then(() => {
      return people.find({
        name: { $ne: 'John' },
        age: { $gt: 20 }
      }).group({
        _id: { age: '$age' },
        count: { $sum: 1 }
      }).project({
        _id: 0,
        age: '$_id.age'
      }).sort({
        age: -1
      }).toArray().then((results) => {
        console.log('results:', results);
        expect(results.length).toBe(2);
        expect(results).toEqual([{count: 3, age: 33}, {count: 1, age: 28}]);
        done();
      });
    }).catch(error => console.error(error));
  });

  afterEach((done) => {
    Promise.all([zango.drop()]).then(() => {
      done();
    });
  });
});
