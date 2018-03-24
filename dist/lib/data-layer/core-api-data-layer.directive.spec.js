(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core/testing", "@angular/http", "@angular/core/testing", "../shared/core-api.service", "../core.module", "./core-api-data-layer.directive"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var testing_1 = require("@angular/core/testing");
    var http_1 = require("@angular/http");
    var testing_2 = require("@angular/core/testing");
    var core_api_service_1 = require("../shared/core-api.service");
    var core_module_1 = require("../core.module");
    var core_api_data_layer_directive_1 = require("./core-api-data-layer.directive");
    describe('Directive: CoreApiDataLayer', function () {
        // simple style
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({
                imports: [
                    core_module_1.RdAngularCoreModule,
                    http_1.HttpModule,
                ],
                providers: [
                    { provide: core_api_service_1.CoreApiService, useValue: {} }
                ],
            });
        });
        it('should create an instance', testing_2.inject([core_api_service_1.CoreApiService], function (coreApiSvc) {
            var directive = new core_api_data_layer_directive_1.CoreApiDataLayerDirective(coreApiSvc);
            expect(directive).toBeTruthy();
        }));
    });
});
//# sourceMappingURL=core-api-data-layer.directive.spec.js.map