var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core", "@angular/http", "./shared/index", "./data-layer/index", "./order-by/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var http_1 = require("@angular/http");
    var index_1 = require("./shared/index");
    var index_2 = require("./data-layer/index");
    var index_3 = require("./order-by/index");
    var RdAngularCoreModule = (function () {
        function RdAngularCoreModule() {
        }
        RdAngularCoreModule_1 = RdAngularCoreModule;
        RdAngularCoreModule.forRoot = function () {
            return {
                ngModule: RdAngularCoreModule_1,
                providers: [
                    index_1.ApiService,
                    index_1.AuthService,
                    index_1.AuthServiceConfig,
                    index_1.CoreAuthServiceConfig,
                    index_1.TextMsgItAuthServiceConfig,
                    index_1.RentplusAuthServiceConfig
                ],
            };
        };
        RdAngularCoreModule = RdAngularCoreModule_1 = __decorate([
            core_1.NgModule({
                declarations: [
                    index_2.CoreApiDataLayerDirective,
                ],
                imports: [
                    http_1.HttpModule,
                    index_3.OrderByModule,
                ],
                exports: [
                    index_3.OrderByModule,
                ],
                providers: [
                    index_1.CoreApiService,
                    index_1.CoreAuthService,
                    index_1.RentplusApiService,
                    index_1.RentplusAuthService,
                    index_1.TextMsgItApiService,
                    index_1.TextMsgItAuthService,
                    index_1.ImmutableService
                ]
            })
        ], RdAngularCoreModule);
        return RdAngularCoreModule;
        var RdAngularCoreModule_1;
    }());
    exports.RdAngularCoreModule = RdAngularCoreModule;
});
//# sourceMappingURL=core.module.js.map