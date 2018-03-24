(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./order-by.module", "./order-by.pipe", "./order-by-object.pipe", "./order-by.service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var order_by_module_1 = require("./order-by.module");
    exports.OrderByModule = order_by_module_1.OrderByModule;
    var order_by_pipe_1 = require("./order-by.pipe");
    exports.OrderByPipe = order_by_pipe_1.OrderByPipe;
    var order_by_object_pipe_1 = require("./order-by-object.pipe");
    exports.OrderByObjectPipe = order_by_object_pipe_1.OrderByObjectPipe;
    var order_by_service_1 = require("./order-by.service");
    exports.OrderByService = order_by_service_1.OrderByService;
});
//# sourceMappingURL=index.js.map