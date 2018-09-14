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

describe('Storage', () => {
  let zango: zangodb.Db = null;
  let storage: Storage = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: CoreApiService, useValue: {}},
        {provide: Http, useClass: MockBackend},

      ],
      imports: [
        StorageModule.forRoot({
          name: '__my_test_db',
          storeName: '__my_test_store',
          driverOrder: ['indexeddb', 'websql']
        }),
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
  });

  beforeEach(inject([Storage], (stor: Storage) => {
    storage = stor;
    zango = new zangodb.Db('mydb', 1, { people: ['age'] });
  }));

  it('should ...', () => {
    expect(storage).toBeTruthy();
  });

  it('should emit one value upon ready', (done) => {
    storage.ready().subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });

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

  it('should set and get value correctly', (done) => {
    const key = 'community_info_1';
    const value = {id: 1, communityGroupId: 1};
    let level1 = null;
    let level2 = null;
    let level3 = null;
    storage.ready().subscribe((db) => {
      level1 = db;

      storage.set(key, value).subscribe((set_result) => {
        level2 = set_result;
        storage.get(key).subscribe((get_result) => {
          level3 = get_result;
          expect(level1).toBeTruthy();
          expect(level2).toBeTruthy();
          expect(level3).toBeTruthy();
          expect(get_result).toEqual(value);
          done();
        }, (get_err) => {
          fail(get_err);
        });
      }, (set_err) => {
        fail(set_err);
      }, () => {
      });
    });

  });

  it('should set and get nested values correctly (advanced)', (done) => {
    let level1 = null;
    let level2 = null;
    let level3 = null;
    storage.ready().subscribe((db) => {
      level1 = db;

      combineLatest(
        storage.set('pricing_1', {price: 500}),
        storage.set('info_1', {communityPhone: '4352016055'}),
        storage.set('map_1', {coordinates: [41.7192251, -111.8359035]}),
        storage.set('pricing_2', {price: 2500}),
        storage.set('info_2', {communityPhone: '4352216255'}),
        storage.set('map_2', {coordinates: [42.7192251, -112.8359035]}),
      ).pipe(
        switchMap((bulk_set_result) => {
          return storage.set('community_info_keys_1', ['pricing_1', 'info_1', 'map_1']);
        })
      )
        .subscribe((set_result) => {
          level2 = set_result;
          // done();
          storage.get('community_info_keys_1').pipe(
            flatMap((keys) => {
              return keys;
            }),
            mergeMap((k: string) => {
              return storage.get(k);
            }),
            toArray()
          ).subscribe((get_result: any[]) => {
            level3 = get_result;
            expect(level1).toBeTruthy();
            expect(level2).toBeTruthy();
            expect(level3).toBeTruthy();
            expect(get_result).toEqual([{price: 500}, {communityPhone: '4352016055'}, {coordinates: [41.7192251, -111.8359035]}]);
            done();
          }, (get_err) => {
            fail(get_err);
          });
        }, (set_err) => {
          fail(set_err);
        }, () => {
        });
    });
  });

  afterEach((done) => {
    Promise.all([zango.drop(), storage.drop().toPromise()]).then(() => {
      done();
    });
  });
});
