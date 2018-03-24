var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core", "../shared/core-api.service", "../shared/core-api.selector"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var core_api_service_1 = require("../shared/core-api.service");
    var core_api_selector_1 = require("../shared/core-api.selector");
    var CoreApiDataLayerDirective = (function () {
        function CoreApiDataLayerDirective(coreApiSvc) {
            this.coreApiSvc = coreApiSvc;
            this.result = new core_1.EventEmitter();
            this.subscription = {
                get: null
            };
        }
        Object.defineProperty(CoreApiDataLayerDirective.prototype, "selector", {
            get: function () {
                return new core_api_selector_1.CoreApiSelector({
                    endpoint: this.endpoint,
                    filters: this.filters,
                    fields: this.fields,
                    include: this.include,
                    orderBy: this.orderBy,
                    page: this.page,
                    pageSize: this.pageSize
                });
            },
            enumerable: true,
            configurable: true
        });
        CoreApiDataLayerDirective.prototype.ngOnInit = function () {
            var _this = this;
            if (!this.endpoint)
                throw Error('Please provide a valid endpoint [rdCoreApiDataLayer]');
            this.subscription.get = this.coreApiSvc.get(this.selector.stringify()).subscribe(function (result) {
                _this.result.emit(result);
            });
        };
        CoreApiDataLayerDirective.prototype.ngOnDestroy = function () {
            for (var key in this.subscription) {
                if (this.subscription[key])
                    this.subscription[key].unsubscribe();
            }
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", String)
        ], CoreApiDataLayerDirective.prototype, "endpoint", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", Object)
        ], CoreApiDataLayerDirective.prototype, "filters", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", Array)
        ], CoreApiDataLayerDirective.prototype, "fields", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", Array)
        ], CoreApiDataLayerDirective.prototype, "include", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", String)
        ], CoreApiDataLayerDirective.prototype, "orderBy", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", Number)
        ], CoreApiDataLayerDirective.prototype, "page", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", Number)
        ], CoreApiDataLayerDirective.prototype, "pageSize", void 0);
        __decorate([
            core_1.Output(),
            __metadata("design:type", Object)
        ], CoreApiDataLayerDirective.prototype, "result", void 0);
        CoreApiDataLayerDirective = __decorate([
            core_1.Directive({
                selector: '[rdCoreApiDataLayer]'
            }),
            __metadata("design:paramtypes", [core_api_service_1.CoreApiService])
        ], CoreApiDataLayerDirective);
        return CoreApiDataLayerDirective;
    }());
    exports.CoreApiDataLayerDirective = CoreApiDataLayerDirective;
});
//# sourceMappingURL=core-api-data-layer.directive.js.map