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
        define(["require", "exports", "@angular/core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var OrderByObjectPipe = (function () {
        function OrderByObjectPipe() {
        }
        OrderByObjectPipe.prototype.transform = function (obj, orderFields) {
            if (!obj)
                return [];
            orderFields.forEach(function (currentField) {
                var orderType = 'ASC';
                if (currentField[0] === '-') {
                    currentField = currentField.substring(1);
                    orderType = 'DESC';
                }
                obj.sort(function (a, b) {
                    if (orderType === 'ASC') {
                        if (a[currentField] < b[currentField])
                            return -1;
                        if (a[currentField] > b[currentField])
                            return 1;
                        return 0;
                    }
                    else {
                        if (a[currentField] < b[currentField])
                            return 1;
                        if (a[currentField] > b[currentField])
                            return -1;
                        return 0;
                    }
                });
            });
            return obj;
        };
        OrderByObjectPipe = __decorate([
            core_1.Pipe({
                name: 'orderByObject'
            })
        ], OrderByObjectPipe);
        return OrderByObjectPipe;
    }());
    exports.OrderByObjectPipe = OrderByObjectPipe;
});
//# sourceMappingURL=order-by-object.pipe.js.map