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
        define(["require", "exports", "@angular/core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var ImmutableService = (function () {
        function ImmutableService() {
        }
        ImmutableService.prototype.copy = function (arr) {
            if (!arr)
                return [];
            return arr.slice();
        };
        ImmutableService.prototype.concat = function (arr, items) {
            arr = arr || [];
            items = items || [];
            return arr.concat(items);
        };
        ImmutableService.prototype.delete = function (arr, index) {
            if (!arr)
                return [];
            return arr.slice(0, index).concat(arr.slice(index + 1));
        };
        ImmutableService.prototype.pop = function (arr) {
            if (!arr)
                return [];
            return arr.slice(0, -1);
        };
        ImmutableService.prototype.push = function (arr, newEntry) {
            arr = arr || [];
            if (!newEntry)
                return arr;
            return arr.concat([newEntry]);
        };
        ImmutableService.prototype.shift = function (arr) {
            if (!arr)
                return [];
            return arr.slice(1);
        };
        ImmutableService.prototype.splice = function (arr, start, deleteCount) {
            var items = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                items[_i - 3] = arguments[_i];
            }
            return arr.slice(0, start).concat(items, arr.slice(start + deleteCount));
        };
        ImmutableService.prototype.sort = function (arr, compareFunction) {
            arr = arr || [];
            return arr.slice().sort(compareFunction);
        };
        ImmutableService = __decorate([
            core_1.Injectable(),
            __metadata("design:paramtypes", [])
        ], ImmutableService);
        return ImmutableService;
    }());
    exports.ImmutableService = ImmutableService;
});
//# sourceMappingURL=immutable.service.js.map