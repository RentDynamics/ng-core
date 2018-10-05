import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RdAngularCoreModule } from '../src/public_api';

import { TimezoneService,
    UtcToLocalDateTimePipe, UtcToLocalTimePipe } from './shared/index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        //ReactiveFormsModule,
        RdAngularCoreModule,
    ],
    declarations: [
        UtcToLocalDateTimePipe,
        UtcToLocalTimePipe,
    ],
    exports: [
        /* declaration exports */
        UtcToLocalDateTimePipe,
        UtcToLocalTimePipe,

        /* module exports */
        //ReactiveFormsModule,
        FormsModule,
        RdAngularCoreModule,
    ],
    providers: [
        TimezoneService
    ]
})
export class RdAngularDatetimeModule {
    // static forRoot() {
    //     return {
    //         ngModule: RdAngularDatetimeModule,
    //         providers: [ // singleton across the whole app for caching purposes
    //             TimezoneService
    //         ],
    //     };
    // }
}
