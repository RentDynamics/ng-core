/* tslint:disable:no-unused-variable */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var helpers_1 = require("./helpers");
    describe('Helpers', function () {
        it('extend({ id: 1 }, { name: "one" }) returns { id: 1, name: "one" }', function () {
            expect(helpers_1.extend({ id: 1 }, { name: "one" })).toEqual({ id: 1, name: "one" });
        });
        it('isBoolean(true) resolves truthy', function () {
            expect(helpers_1.isBoolean(true)).toBeTruthy();
        });
        it('isDate(new Date()) resolves truthy', function () {
            expect(helpers_1.isDate(new Date())).toBeTruthy();
        });
        it('isString("turbonemesis") resolves truthy', function () {
            expect(helpers_1.isString("turbonemesis")).toBeTruthy();
        });
        it('equals("turbonemesis", "turbonemesis") resolves truthy', function () {
            expect(helpers_1.equals("turbonemesis", "turbonemesis")).toBeTruthy();
        });
        it('equals(1, 1) resolves truthy', function () {
            expect(helpers_1.equals(1, 1)).toBeTruthy();
        });
        it('equals(1, 2) resolves falsy', function () {
            expect(helpers_1.equals(1, 2)).toBeFalsy();
        });
        it('equals([1, 2], [1, 2]) resolves truthy', function () {
            expect(helpers_1.equals([1, 2], [1, 2])).toBeTruthy();
        });
        it('equals([1, 2], [2, 2]) resolves falsy', function () {
            expect(helpers_1.equals([1, 2], [2, 2])).toBeFalsy();
        });
        it('equals({ id: 1 }, { id: 1 }) resolves truthy', function () {
            expect(helpers_1.equals({ id: 1 }, { id: 1 })).toBeTruthy();
        });
        it('equals({ id: 1 }, { id: 2 }) resolves falsy', function () {
            expect(helpers_1.equals({ id: 1 }, { id: 2 })).toBeFalsy();
        });
        // it('isBlankObject({}) resolves truthy', () => {
        //   expect(isBlankObject({})).toBeTruthy();
        // });
    });
});
//# sourceMappingURL=helpers.spec.js.map