var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./shared/auth-service-config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var auth_service_config_1 = require("./shared/auth-service-config");
    var CoreAuthServiceConfig = (function (_super) {
        __extends(CoreAuthServiceConfig, _super);
        function CoreAuthServiceConfig() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CoreAuthServiceConfig;
    }(auth_service_config_1.AuthServiceConfig));
    exports.CoreAuthServiceConfig = CoreAuthServiceConfig;
});
//# sourceMappingURL=core-auth-service-config.js.map