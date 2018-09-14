// /* tslint:disable:no-unused-variable */
// import {TestBed, async, inject, fakeAsync, tick, flush} from '@angular/core/testing';
// import {NO_ERRORS_SCHEMA} from '@angular/core';
// import {Http} from '@angular/http';
// import {MockBackend} from '@angular/http/testing';
// import {combineLatest, Observable, Observer} from 'rxjs';
//
// import {CoreApiService} from '../shared';
//
// import {provideStorage, StorageConfigToken, Storage, StorageConfig} from './storage';
// import {StorageModule} from './storage.module';
// import {flatMap, map, mergeMap, switchMap, tap, toArray} from 'rxjs/operators';
//
// import PouchDB from 'pouchdb';
//
// // global.indexedDB = require('fake-indexeddb');
// // global.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');
//
// describe('Storage Pouch', () => {
//   let pouch: PouchDB.Database = null;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         {provide: CoreApiService, useValue: {}},
//         {provide: Http, useClass: MockBackend},
//
//       ],
//       imports: [
//         // StorageModule.forRoot({
//         //   name: '__my_test_db',
//         //   storeName: '__my_test_store',
//         //   driverOrder: ['indexeddb', 'websql']
//         // }),
//       ],
//       schemas: [
//         NO_ERRORS_SCHEMA
//       ]
//     });
//   });
//
//   beforeEach(inject([], () => {
//     // storage = stor;
//     pouch = new PouchDB('dbname2');
//   }));
//
//   it('pouchdb!!', (done) => {
//
//     const docs = [
//       { name: 'Frank', age: 20 },
//       { name: 'Thomas', age: 33 },
//       { name: 'Todd', age: 33 },
//       { name: 'John', age: 28 },
//       { name: 'Peter', age: 33 },
//       { name: 'George', age: 28 }
//     ];
//
//     pouch.bulkDocs(docs).then((result) => {
//       pouch.allDocs({limit: 3}).then((results) => {
//         console.log(results);
//         done();
//       }, (err) => {
//         fail(err);
//       });
//     }, (err) => {
//       fail(err);
//     });
//
//   });
//
//   afterEach((done) => {
//     done();
//     // Promise.all([pouch.destroy()]).then(() => {
//     //   done();
//     // });
//   });
// });
