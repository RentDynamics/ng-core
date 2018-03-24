/* tslint:disable:no-unused-variable */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./order-by-object.pipe"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var order_by_object_pipe_1 = require("./order-by-object.pipe");
    describe('Pipe: OrderBy', function () {
        it('create an instance', function () {
            var pipe = new order_by_object_pipe_1.OrderByObjectPipe();
            expect(pipe).toBeTruthy();
        });
        it('transforms array correctly', function () {
            var pipe = new order_by_object_pipe_1.OrderByObjectPipe();
            var result = pipe.transform([{ id: 3 }, { id: 1 }], ['id']);
            expect(result[0].id).toBe(1);
        });
    });
});
//# sourceMappingURL=order-by-object.pipe.spec.js.map