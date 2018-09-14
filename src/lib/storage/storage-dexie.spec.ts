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

import Dexie from 'dexie';

export class MyAppDatabase extends Dexie {
  contacts: Dexie.Table<IContact, number>;
  emails: Dexie.Table<IEmailAddress, number>;
  phones: Dexie.Table<IPhoneNumber, number>;

  constructor() {
    super('MyAppDatabase');

    //
    // Define tables and indexes
    // (Here's where the implicit table props are dynamically created)
    //
    this.version(1).stores({
      contacts: '++id, first, last',
      emails: '++id, contactId, type, email',
      phones: '++id, contactId, type, phone',
    });
  }
}

// By defining the interface of table records,
// you get better type safety and code completion
export interface IContact {
  id?: number; // Primary key. Optional (autoincremented)
  first: string; // First name
  last: string; // Last name
}

export interface IEmailAddress {
  id?: number;
  contactId: number; // "Foreign key" to an IContact
  type: string; // Type of email such as "work", "home" etc...
  email: string; // The email address
}

export interface IPhoneNumber {
  id?: number;
  contactId: number;
  type: string;
  phone: string;
}

const db = new MyAppDatabase();


/* This is a 'physical' class that is mapped to
 * the contacts table. We can have methods on it that
 * we could call on retrieved database objects.
 */
export class Contact implements IContact {
  id: number;
  first: string;
  last: string;
  emails: IEmailAddress[];
  phones: IPhoneNumber[];

  constructor(first: string, last: string, id?:number) {
    this.first = first;
    this.last = last;
    if (id) this.id = id;
  }

  loadEmailsAndPhones() {
    return Promise.all([
      db.emails
        .where('contactId').equals(this.id)
        .toArray(emails => this.emails = emails),
      db.phones
        .where('contactId').equals(this.id)
        .toArray(phones => this.phones = phones)]
    )
      .then(x => this);
  }

  save() {
    return db.transaction('rw', db.contacts, db.emails, db.phones, () => {
      return Promise.all([
        // Save existing arrays
        Promise.all(this.emails.map(email => db.emails.put(email))),
        Promise.all(this.phones.map(phone => db.phones.put(phone)))
      ])
        .then(results => {
          // Remove items from DB that is was not saved here:
          var emailIds = results[0], // array of resulting primary keys
            phoneIds = results[1]; // array of resulting primary keys

          db.emails.where('contactId').equals(this.id)
            .and(email => emailIds.indexOf(email.id) === -1)
            .delete();

          db.phones.where('contactId').equals(this.id)
            .and(phone => phoneIds.indexOf(phone.id) === -1)
            .delete();

          // At last, save our own properties.
          // (Must not do put(this) because we would get
          // reduntant emails/phones arrays saved into db)
          db.contacts.put(new Contact(this.first, this.last, this.id))
            .then(id => this.id = id);
        });
    });
  }
}

describe('Storage Dexie', () => {
  // let zango: zangodb.Db = null;
  // let storage: Storage = null;

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
    // zango = new zangodb.Db('mydb', 1, { people: ['age'] });
  }));

  it('should ...', () => {
    db.contacts.add({id: 2, first: 'turbo', last: 'gibbons'});
    db.contacts.where('name').startsWith('tur').first().then((get_result) => {
      expect(get_result).toEqual({id: 2, first: 'turbo', last: 'gibbons'});
    });
  });

  afterEach((done) => {
    // db.close();
    db.delete().then(() => {
      done();
    });
    // Promise.all([zango.drop(), storage.drop().toPromise()]).then(() => {
    //   done();
    // });
  });
});
