(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "moment", "../helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var moment = require("moment");
    var helpers_1 = require("../helpers");
    var CoreApiSelector = (function () {
        function CoreApiSelector(params) {
            if (params) {
                for (var key in params) {
                    this[key] = params[key];
                }
            }
        }
        CoreApiSelector.prototype.addFilter = function (key, value) {
            this.filters[key] = value;
        };
        CoreApiSelector.prototype.stringify = function () {
            var results = [];
            if (this.filters && this.stringifyFilters(this.filters))
                results.push("filters=" + this.stringifyFilters(this.filters));
            if (this.include && this.include.length)
                results.push("include=" + this.include.join(','));
            if (this.exclude && this.exclude.length)
                results.push("exclude=" + this.exclude.join(','));
            if (this.fields && this.fields.length)
                results.push("fields=" + this.fields.join(','));
            if (this.orderBy)
                results.push("orderBy=" + this.orderBy);
            if (this.page)
                results.push("page=" + this.page);
            if (this.pageSize)
                results.push("pageSize=" + this.pageSize);
            if (this.distinct)
                results.push("distinct=true");
            if (results.join('&'))
                return this.endpoint + "?" + results.join('&');
            return this.endpoint;
        };
        CoreApiSelector.prototype.mapKeyValuePairs = function (key, value) {
            var results = [];
            if (key.indexOf('=') > -1) {
                results.push("" + key);
                return results;
            }
            if (helpers_1.isArray(value)) {
                if (value.length)
                    results.push(key + "__in=" + value.join(','));
                return results;
            }
            if (helpers_1.isObject(value)) {
                if (moment.isMoment(value)) {
                    results.push(key + "=" + value.format('MM/DD/YY'));
                }
                else {
                    for (var filterValKey in value) {
                        var result = void 0;
                        result = this.mapKeyValuePairs(key + "__" + filterValKey, value[filterValKey]);
                        if (result && result.length)
                            results.push(result.join('|'));
                    }
                }
                return results;
            }
            if (value !== null && value !== undefined && value !== '') {
                results.push(key + "=" + value);
                return results;
            }
            return results;
        };
        CoreApiSelector.prototype.stringifyFilters = function (filter) {
            var results = [];
            for (var key in filter) {
                var value = filter[key];
                var result = this.mapKeyValuePairs(key, value);
                if (result && result.length)
                    results.push(result.join('|'));
            }
            if (results && results.length)
                return results.join('|');
        };
        return CoreApiSelector;
    }());
    exports.CoreApiSelector = CoreApiSelector;
});
//# sourceMappingURL=core-api.selector.js.map