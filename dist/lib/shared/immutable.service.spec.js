/* tslint:disable:no-unused-variable */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core/testing", "./immutable.service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var testing_1 = require("@angular/core/testing");
    var immutable_service_1 = require("./immutable.service");
    describe('Service: Immutable', function () {
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({
                providers: [immutable_service_1.ImmutableService]
            });
        });
        it('should ...', testing_1.inject([immutable_service_1.ImmutableService], function (service) {
            expect(service).toBeTruthy();
        }));
        it('delete() should return a new immutable array with the item deleted at the index specified', testing_1.inject([immutable_service_1.ImmutableService], function (service) {
            /* Arrange */
            var deleteIndex = 2;
            var initialAry = [{ id: 1 }, { id: 2 }, { id: 3 }];
            var resultAry;
            /* Act */
            resultAry = service.delete(initialAry, deleteIndex);
            /* Assert */
            expect(resultAry).toBeTruthy();
            expect(resultAry.length).toBe(2);
            expect(resultAry.map(function (result) { return result.id; })).toEqual([1, 2]);
        }));
        it('concat() should concatenate the two arrays and be different from the original reference', testing_1.inject([immutable_service_1.ImmutableService], function (service) {
            /* Arrange */
            var initialAry = [{ id: 1 }, { id: 2 }, { id: 3 }];
            var secondAry = [{ id: 5 }, { id: 6 }];
            var resultAry;
            /* Act */
            resultAry = service.concat(initialAry, secondAry);
            /* Assert */
            expect(resultAry).toBeTruthy();
            expect(resultAry.length).toBe(5);
            expect(resultAry.map(function (result) { return result.id; })).toEqual([1, 2, 3, 5, 6]);
        }));
    });
});
//# sourceMappingURL=immutable.service.spec.js.map