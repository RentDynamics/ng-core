/* tslint:disable:no-unused-variable */
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
        define(["require", "exports", "moment", "./core-api.selector"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var moment = require("moment");
    var core_api_selector_1 = require("./core-api.selector");
    var MockUnitSelector = (function (_super) {
        __extends(MockUnitSelector, _super);
        function MockUnitSelector(params) {
            var _this = _super.call(this, params) || this;
            _this.endpoint = '/units';
            return _this;
        }
        return MockUnitSelector;
    }(core_api_selector_1.CoreApiSelector));
    var MockUnitCommunityAddressSelector = (function (_super) {
        __extends(MockUnitCommunityAddressSelector, _super);
        function MockUnitCommunityAddressSelector(params) {
            var _this = _super.call(this, params) || this;
            _this.endpoint = '/units';
            _this.include = ['community__address'];
            return _this;
        }
        return MockUnitCommunityAddressSelector;
    }(core_api_selector_1.CoreApiSelector));
    var MockClientAmenitySelector = (function (_super) {
        __extends(MockClientAmenitySelector, _super);
        function MockClientAmenitySelector(clientId) {
            if (clientId === void 0) { clientId = null; }
            var _this = _super.call(this) || this;
            _this.clientId = clientId;
            return _this;
        }
        Object.defineProperty(MockClientAmenitySelector.prototype, "endpoint", {
            get: function () {
                return "/client/" + this.clientId + "/amenities";
            },
            enumerable: true,
            configurable: true
        });
        return MockClientAmenitySelector;
    }(core_api_selector_1.CoreApiSelector));
    var MockClientUnitSelector = (function (_super) {
        __extends(MockClientUnitSelector, _super);
        function MockClientUnitSelector(params) {
            var _this = _super.call(this, params) || this;
            _this.endpoint = '/units';
            _this.include = ['floorplan', 'community__address'];
            return _this;
        }
        return MockClientUnitSelector;
    }(core_api_selector_1.CoreApiSelector));
    describe('CoreApiSelector', function () {
        it('should create an instance', function () {
            expect(new core_api_selector_1.CoreApiSelector()).toBeTruthy();
        });
        it('stringify() formats "includes" correctly', function () {
            var selector = new core_api_selector_1.CoreApiSelector({ endpoint: '/units', include: ['unitAmenity', 'clientAmenity'] });
            expect(selector.stringify()).toBe('/units?include=unitAmenity,clientAmenity');
        });
        it('stringify() formats "fields" correctly', function () {
            var selector = new core_api_selector_1.CoreApiSelector({ endpoint: '/units', fields: ['id', 'name'] });
            expect(selector.stringify()).toBe('/units?fields=id,name');
        });
        it('stringify() formats "moment()" filter correctly', function () {
            var selector = new core_api_selector_1.CoreApiSelector({
                endpoint: '/units',
                filters: {
                    moveInDate: moment('08-28-1988', 'M-D-Y')
                }
            });
            expect(selector.stringify()).toBe("/units?filters=moveInDate=08/28/88");
        });
        it('stringify() formats parameterized endpoint correctly', function () {
            var clientId = 1;
            var selector = new core_api_selector_1.CoreApiSelector({
                endpoint: "/client/" + clientId + "/amenities"
            });
            expect(selector.stringify()).toBe('/client/1/amenities');
        });
        it('stringify() formats changing parameterized endpoint correctly (w/getter)', function () {
            var clientId = 1;
            var selector = new MockClientAmenitySelector(clientId);
            selector.clientId = 2;
            expect(selector.stringify()).toBe('/client/2/amenities');
        });
        it('stringify() maintains its include, which are statically defined in an overriding class, ' +
            'when other parameters are passed in dynamically on initialization', function () {
            var clientId = 1;
            var selector = new MockUnitCommunityAddressSelector({
                filters: {
                    moveInDate: moment('08-28-1988', 'M-D-Y')
                }
            });
            expect(selector.stringify()).toBe("/units?filters=moveInDate=08/28/88&include=community__address");
        });
        it('stringify() formats multiple params correctly', function () {
            var selector = new MockUnitSelector({
                page: 1,
                pageSize: 30,
                fields: ['id', 'name'],
                filters: {
                    communityGroupId: 21,
                    communityBasket: [1, 2, 3, 4],
                    bedrooms: 3,
                    unitAmenities: {
                        amenityTypeId: 2,
                        amenityType: {
                            id: 2
                        },
                        amenityTypes: [1, 2, 3]
                    }
                },
                include: ['unitAmenities', 'unitFloorplans']
            });
            expect(selector.stringify()).toBe("/units?filters=communityGroupId=21|communityBasket__in=1,2,3,4" +
                "|bedrooms=3|unitAmenities__amenityTypeId=2|unitAmenities__amenityType__id=2|unitAmenities__amenityTypes__in=1,2,3" +
                "&include=unitAmenities,unitFloorplans&fields=id,name&page=1&pageSize=30");
        });
        it('stringify() outputs "endpoint" correctly when the endpoint is defined in its overriding class', function () {
            var selector = new MockUnitSelector({ fields: ['id', 'name'] });
            expect(selector.stringify()).toBe('/units?fields=id,name');
        });
        it('stringify() handles { filter: { bedrooms: 0 } } correctly', function () {
            var selector = new MockUnitSelector({ fields: ['id', 'name'], filters: { bedrooms: 0 } });
            expect(selector.stringify()).toBe('/units?filters=bedrooms=0&fields=id,name');
        });
        it('stringify() handles { filter: { bedrooms: null } } correctly', function () {
            var selector = new MockUnitSelector({ fields: ['id', 'name'], filters: { bedrooms: null } });
            expect(selector.stringify()).toBe('/units?fields=id,name');
        });
        it('stringify() handles { filter: { bedrooms: undefined } } correctly', function () {
            var selector = new MockUnitSelector({ fields: ['id', 'name'], filters: { bedrooms: undefined } });
            expect(selector.stringify()).toBe('/units?fields=id,name');
        });
        it('stringify() handles { filter: { bedrooms: \'\' } } correctly', function () {
            var selector = new MockUnitSelector({ fields: ['id', 'name'], filters: { bedrooms: '' } });
            expect(selector.stringify()).toBe('/units?fields=id,name');
        });
        it('stringify() handles distinct=true correctly', function () {
            var selector = new core_api_selector_1.CoreApiSelector({ endpoint: '/units', distinct: true });
            expect(selector.stringify()).toBe('/units?distinct=true');
        });
        it('stringify() handles distinct=false correctly', function () {
            var selector = new core_api_selector_1.CoreApiSelector({ endpoint: '/units', distinct: false });
            expect(selector.stringify()).toBe('/units');
        });
        it('addFilter() adds filter correctly when both key and value provided', function () {
            var selector = new core_api_selector_1.CoreApiSelector({ endpoint: '/pmFailuresView', filters: {
                    name__istartswith: 'M'
                } });
            selector.addFilter('resolved__lt', 1);
            expect(selector.stringify()).toBe('/pmFailuresView?filters=name__istartswith=M|resolved__lt=1');
        });
        it('addFilter() adds filter correctly when only key provided', function () {
            var selector = new core_api_selector_1.CoreApiSelector({ endpoint: '/pmFailuresView', filters: {
                    name__istartswith: 'M'
                } });
            selector.addFilter('resolved__lt=1');
            expect(selector.stringify()).toBe('/pmFailuresView?filters=name__istartswith=M|resolved__lt=1');
        });
        it('stringify() nested communityBasket -> basketId array filter is not included when basketId array is empty', function () {
            /* Arrange */
            var selector = new MockClientUnitSelector({
                page: 1,
                pageSize: 30,
                filters: {
                    bedrooms: 3,
                    bathrooms: null,
                    community: {
                        clientId: getSelectedClientID(),
                        communityBaskets: {
                            basketId: []
                        }
                    }
                }
            });
            /* Assert */
            expect(selector.stringify()).toBe("/units?filters=bedrooms=3|community__clientId=1" +
                "&include=floorplan,community__address&page=1&pageSize=30");
        });
        it('stringify() grandaddy o thy all', function () {
            /* Arrange */
            var selector = new MockClientUnitSelector({
                page: 1,
                pageSize: 30,
                /* todo: include: ['unitAmenities'] doesn't work,
                we will have to invoke /units/amenities endpoint in a
                separate call. (if even still needed) */
                filters: {
                    bedrooms: 3,
                    bathrooms: null,
                    /* todo: maxPrice: this.filter.maxPrice, */
                    /* broken on front-end core-api.selector i think */
                    // readyDate: {
                    //   lt: this.filter.moveInDate,
                    // },
                    community: {
                        clientId: getSelectedClientID(),
                        communityBaskets: {
                            basketId: [1, 2, 3, 4]
                        }
                    }
                    // unitAmenities: {
                    //   amenityId: 1,
                    //   amenityTypeId: 31
                    // }
                }
            });
            /* Assert */
            expect(selector.stringify()).toBe("/units?filters=bedrooms=3|community__clientId=1|community__communityBaskets__basketId__in=1,2,3,4" +
                "&include=floorplan,community__address&page=1&pageSize=30");
        });
    });
    function getSelectedClientID() {
        return 1;
    }
});
//# sourceMappingURL=core-api.selector.spec.js.map