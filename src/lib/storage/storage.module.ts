import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Storage, StorageConfig, StorageConfigToken, provideStorage } from './storage';
// import { LocalForageStorage } from './local-forage-storage';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    // { provide: StorageConfig, useValue: {} },
    // {
    //   provide: StorageService,
    //   useFactory: provideStorage,
    //   deps: [StorageConfig],
    //   multi: true
    // }
  ]
})
export class StorageModule {
  static forRoot(storageConfig: StorageConfig = null): ModuleWithProviders {
    return {
      ngModule: StorageModule,
      providers: [
        { provide: StorageConfigToken, useValue: storageConfig },
        {
          provide: Storage,
          useFactory: provideStorage,
          deps: [StorageConfigToken]
        }
      ]
    };
  }
}

export { StorageConfig, StorageConfigToken, Storage, provideStorage };
