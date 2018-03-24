/* tslint:disable:no-unused-variable */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core/testing", "./order-by.module", "./order-by.service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var testing_1 = require("@angular/core/testing");
    var order_by_module_1 = require("./order-by.module");
    var order_by_service_1 = require("./order-by.service");
    describe('Service: OrderBy', function () {
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({
                providers: [order_by_service_1.OrderByService],
                imports: [order_by_module_1.OrderByModule]
            });
        });
        it('should ...', testing_1.inject([order_by_service_1.OrderByService], function (service) {
            expect(service).toBeTruthy();
        }));
    });
});
//# sourceMappingURL=order-by.service.spec.js.map