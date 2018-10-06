import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RdAngularCoreModule } from '@rd/core';

import { TimezoneService,
    UtcToLocalDateTimePipe, UtcToLocalTimePipe } from './shared/index';
import { CommunityGroupTimezoneService } from './community-group-timezone.service';

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
        CommunityGroupTimezoneService,
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
