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
        define(["require", "exports", "@angular/core", "../shared/immutable.service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var immutable_service_1 = require("../shared/immutable.service");
    var OrderByService = (function () {
        function OrderByService(immutable) {
            this.immutable = immutable;
        }
        OrderByService.prototype.sort = function (array, orderByField) {
            var _this = this;
            var isDescending = orderByField.substr(0, 1) == '-';
            var sortByProperty = orderByField.substr(0, 1) == '+' || orderByField.substr(0, 1) == '-'
                ? orderByField.substr(1)
                : orderByField;
            var result = this.immutable.sort(array, function (left, right) {
                return !isDescending
                    ? _this.orderByComparator(left[sortByProperty], right[sortByProperty])
                    : -_this.orderByComparator(left[sortByProperty], right[sortByProperty]);
            });
            return result;
        };
        OrderByService.prototype.orderByComparator = function (left, right) {
            if (left < right)
                return -1;
            if (left == right)
                return 0;
            else
                return 1;
        };
        OrderByService.prototype.timer = function (name) {
            var start = new Date();
            return {
                stop: function () {
                    var end = new Date();
                    var time = end.getTime() - start.getTime();
                    console.log('Timer:', name, 'finished in', time, 'ms');
                }
            };
        };
        OrderByService = __decorate([
            core_1.Injectable(),
            __metadata("design:paramtypes", [immutable_service_1.ImmutableService])
        ], OrderByService);
        return OrderByService;
    }());
    exports.OrderByService = OrderByService;
});
//# sourceMappingURL=order-by.service.js.map