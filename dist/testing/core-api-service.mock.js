(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "rxjs/Rx"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Rx_1 = require("rxjs/Rx");
    exports.CoreApiServiceMock = {
        get: function () {
            return Rx_1.Observable.from([]);
        },
        put: function () {
            return Rx_1.Observable.from([]);
        },
        post: function () {
            return Rx_1.Observable.from([]);
        },
        postWithoutAuth: function () {
            return Rx_1.Observable.from([]);
        },
        delete: function () {
            return Rx_1.Observable.from([]);
        }
    };
});
//# sourceMappingURL=core-api-service.mock.js.map