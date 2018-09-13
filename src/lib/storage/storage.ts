import { InjectionToken, Injectable, Inject } from "@angular/core";

import * as LocalForage from 'localforage';

/** @hidden */
export abstract class StorageConfig {
  name?: string;
  version?: number;
  size?: number;
  storeName?: string;
  description?: string;
  driverOrder?: string[];
  dbKey?: string;
}

export class Storage {
  private _dbPromise: Promise<LocalForage>;
  private _driver: string = null;

  /**
   * Create a new Storage instance using the order of drivers and any additional config
   * options to pass to LocalForage.
   *
   * Possible driver options are: ['indexeddb', 'websql', 'localstorage'] and the
   * default is that exact ordering.
   */
  constructor(config: StorageConfig) {
    this._dbPromise = new Promise((resolve, reject) => {
      let db: LocalForage;

      const defaultConfig = getDefaultConfig();
      const actualConfig = Object.assign(defaultConfig, config || {});

      // LocalForage.defineDriver(CordovaSQLiteDriver)
      Promise.resolve()
        .then(() => {
          db = LocalForage.createInstance(actualConfig);
        })
        .then(() =>
          db.setDriver(this._getDriverOrder(actualConfig.driverOrder))
        )
        .then(() => {
          this._driver = db.driver();
          resolve(db);
        })
        .catch(reason => reject(reason));
    });
  }

  /**
   * Get the name of the driver being used.
   * @returns Name of the driver
   */
  get driver(): string | null {
    return this._driver;
  }

  /**
   * Reflect the readiness of the store.
   * @returns Returns a promise that resolves when the store is ready
   */
  ready(): Promise<LocalForage> {
    return this._dbPromise;
  }

  /** @hidden */
  private _getDriverOrder(driverOrder) {
    return driverOrder.map(driver => {
      switch (driver) {
        //   case 'sqlite':
        //     return CordovaSQLiteDriver._driver;
        case 'indexeddb':
          return LocalForage.INDEXEDDB;
        case 'websql':
          return LocalForage.WEBSQL;
        case 'localstorage':
          return LocalForage.LOCALSTORAGE;
      }
    });
  }

  /**
   * Get the value associated with the given key.
   * @param key the key to identify this value
   * @returns Returns a promise with the value of the given key
   */
  get(key: string): Promise<any> {
    return this._dbPromise.then(db => db.getItem(key));
  }

  /**
   * Set the value for the given key.
   * @param key the key to identify this value
   * @param value the value for this key
   * @returns Returns a promise that resolves when the key and value are set
   */
  set(key: string, value: any): Promise<any> {
    return this._dbPromise.then(db => db.setItem(key, value));
  }

  /**
   * Remove any value associated with this key.
   * @param key the key to identify this value
   * @returns Returns a promise that resolves when the value is removed
   */
  remove(key: string): Promise<any> {
    return this._dbPromise.then(db => db.removeItem(key));
  }

  /**
   * Clear the entire key value store. WARNING: HOT!
   * @returns Returns a promise that resolves when the store is cleared
   */
  clear(): Promise<void> {
    return this._dbPromise.then(db => db.clear());
  }

  /**
   * @returns Returns a promise that resolves with the number of keys stored.
   */
  length(): Promise<number> {
    return this._dbPromise.then(db => db.length());
  }

  /**
   * @returns Returns a promise that resolves with the keys in the store.
   */
  keys(): Promise<string[]> {
    return this._dbPromise.then(db => db.keys());
  }

  /**
   * Iterate through each key,value pair.
   * @param iteratorCallback a callback of the form (value, key, iterationNumber)
   * @returns Returns a promise that resolves when the iteration has finished.
   */
  forEach(
    iteratorCallback: (value: any, key: string, iterationNumber: Number) => any
  ): Promise<void> {
    return this._dbPromise.then(db => db.iterate(iteratorCallback));
  }
}

/** @hidden */
export function getDefaultConfig() {
  return {
    name: '_rdstorage',
    storeName: '_rdkv',
    dbKey: '_rdkey',
    driverOrder: ['indexeddb', 'websql', 'localstorage']
  };
}
/** @hidden */
export const StorageConfigToken = new InjectionToken<any>(
  'STORAGE_CONFIG_TOKEN'
);

/** @hidden */
export function provideStorage(storageConfig: StorageConfig): Storage {
  const config = !!storageConfig ? storageConfig : getDefaultConfig();
  return new Storage(config);
}