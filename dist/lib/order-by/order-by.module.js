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
        define(["require", "exports", "@angular/core", "@angular/common", "../shared/immutable.service", "./order-by.pipe", "./order-by-object.pipe", "./order-by.service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var common_1 = require("@angular/common");
    var immutable_service_1 = require("../shared/immutable.service");
    var order_by_pipe_1 = require("./order-by.pipe");
    var order_by_object_pipe_1 = require("./order-by-object.pipe");
    var order_by_service_1 = require("./order-by.service");
    var OrderByModule = (function () {
        function OrderByModule() {
        }
        OrderByModule = __decorate([
            core_1.NgModule({
                imports: [
                    common_1.CommonModule,
                ],
                declarations: [
                    order_by_pipe_1.OrderByPipe,
                    order_by_object_pipe_1.OrderByObjectPipe,
                ],
                exports: [
                    order_by_pipe_1.OrderByPipe,
                    order_by_object_pipe_1.OrderByObjectPipe,
                ],
                providers: [
                    immutable_service_1.ImmutableService,
                    order_by_service_1.OrderByService,
                ]
            })
        ], OrderByModule);
        return OrderByModule;
    }());
    exports.OrderByModule = OrderByModule;
});
//# sourceMappingURL=order-by.module.js.map