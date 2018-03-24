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
    exports.AuthServiceMock = {
        authToken: '',
        secretKey: '',
        userId: '',
        formatPayload: function () { },
        getNonce: function () { },
        getAuthHeaders: function () { },
        getAuthHeadersWithoutAuth: function () { },
        logout: function () { },
        login: function () { },
        ssoLogin: function () {
            return Rx_1.Observable.from([]);
        },
        loginCallback: function () { },
        isAuthenticated: function () { },
        forgotPassword: function () {
            return Rx_1.Observable.from([]);
        },
        getHost: function () { },
        errorHandler: function () { }
    };
});
//# sourceMappingURL=auth-service.mock.js.map