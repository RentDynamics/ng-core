/* tslint:disable:no-unused-variable */
import { TestBed, async, inject, fakeAsync, tick, flush } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable, Observer } from 'rxjs';

import { CoreApiService } from '../shared';

import { provideStorage, StorageConfigToken, Storage, StorageConfig } from './storage';
import { StorageModule } from '.';

describe('Storage', () => {
    var storage: Storage;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: CoreApiService, useValue: {} },
                { provide: Http, useClass: MockBackend },

            ],
            imports: [
                StorageModule.forRoot({
                    name: '__my_test_db',
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
    }))

    it('should ...', () => {
        expect(storage).toBeTruthy();
    });

    it('storage.ready() should emit one value upon ready', (done) => {
        storage.ready().subscribe((result) => {
            expect(result).toBeTruthy()
            done();
        });
    });

    it('storage.set() should set value correctly', (done) => {
        const key = 'test1';
        const value = {id: 1};
        let level1 = null;
        let level2 = null;
        let level3 = null;
        storage.ready().subscribe((db) => {
            level1 = db;

            storage.set(key, value).subscribe((set_result) => {
                level2 = set_result;
                storage.get(key).subscribe((get_result) => {
                    level3 = get_result;
                  console.log(get_result);
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

    it('storage.set() should set the value in the indexeddb db', (done) => {
        const store = {id: 1}
        storage.set('test1', store).subscribe((result) => {
            expect(result).toBeTruthy();
            done();
        });
    });

    afterAll((done) => {
      storage.drop().subscribe((drop_result) => {
        done();
      });
    });
});
