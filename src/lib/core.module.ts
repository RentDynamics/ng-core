import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

import {
    ApiService, AuthService, AuthServiceConfig,
    CoreApiService, CoreAuthService, CoreAuthServiceConfig,
    RentplusApiService, RentplusAuthService, RentplusAuthServiceConfig,
    ReportSchedulerApiService, ReportSchedulerAuthService, ReportSchedulerAuthServiceConfig,
    TextMsgItApiService, TextMsgItAuthService, TextMsgItAuthServiceConfig,
    ImmutableService
} from './shared/index';
import { CoreApiDataLayerDirective } from './data-layer/index';

import { OrderByModule } from './order-by/index';

@NgModule({
    declarations: [
        CoreApiDataLayerDirective,
    ],
    imports: [
        HttpModule,
        OrderByModule,
    ],
    exports: [
        OrderByModule,
    ],
    providers: [
        CoreApiService,
        CoreAuthService,
        RentplusApiService,
        RentplusAuthService,
        ReportSchedulerApiService,
        ReportSchedulerAuthService,
        TextMsgItApiService,
        TextMsgItAuthService,
        ImmutableService
    ]
})
export class RdAngularCoreModule {
    static forRoot() {
        return {
            ngModule: RdAngularCoreModule,
            providers: [ // singletons across the whole app
                ApiService,
                AuthService,
                AuthServiceConfig,
                CoreAuthServiceConfig,
                TextMsgItAuthServiceConfig,
                RentplusAuthServiceConfig,
                ReportSchedulerAuthServiceConfig,
            ],
        };
    }
}
