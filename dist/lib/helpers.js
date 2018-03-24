(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var slice = [].slice, getPrototypeOf = Object.getPrototypeOf;
    exports.isArray = Array.isArray;
    exports.isUndefined = function isUndefined(value) { return typeof value === 'undefined'; };
    exports.isDefined = function isDefined(value) { return typeof value !== 'undefined'; };
    exports.isObject = function isObject(value) {
        // http://jsperf.com/isobject4
        return value !== null && typeof value === 'object';
    };
    exports.isString = function isString(value) { return typeof value === 'string'; };
    exports.isNumber = function isNumber(value) { return typeof value === 'number'; };
    exports.isDate = function isDate(value) {
        return toString.call(value) === '[object Date]';
    };
    exports.isBoolean = function isBoolean(value) {
        return typeof value === 'boolean';
    };
    exports.isFunction = function isFunction(value) { return typeof value === 'function'; };
    exports.isElement = function isElement(node) {
        return !!(node &&
            (node.nodeName // We are a direct element.
                || (node.prop && node.attr && node.find))); // We have an on and find method part of jQuery API.
    };
    exports.isRegExp = function isRegExp(value) {
        return toString.call(value) === '[object RegExp]';
    };
    function createMap() {
        return Object.create(null);
    }
    function setHashKey(obj, h) {
        if (h) {
            obj.$$hashKey = h;
        }
        else {
            delete obj.$$hashKey;
        }
    }
    function isWindow(obj) {
        return obj && obj.window === obj;
    }
    function isScope(obj) {
        return obj && obj.$evalAsync && obj.$watch;
    }
    function baseExtend(dst, objs, deep) {
        var h = dst.$$hashKey;
        for (var i = 0, ii = objs.length; i < ii; ++i) {
            var obj = objs[i];
            if (!exports.isObject(obj) && !exports.isFunction(obj))
                continue;
            var keys = Object.keys(obj);
            for (var j = 0, jj = keys.length; j < jj; j++) {
                var key = keys[j];
                var src = obj[key];
                if (deep && exports.isObject(src)) {
                    if (exports.isDate(src)) {
                        dst[key] = new Date(src.valueOf());
                    }
                    else if (exports.isRegExp(src)) {
                        dst[key] = new RegExp(src);
                    }
                    else if (src.nodeName) {
                        dst[key] = src.cloneNode(true);
                    }
                    else if (exports.isElement(src)) {
                        dst[key] = src.clone();
                    }
                    else {
                        if (!exports.isObject(dst[key]))
                            dst[key] = exports.isArray(src) ? [] : {};
                        baseExtend(dst[key], [src], true);
                    }
                }
                else {
                    dst[key] = src;
                }
            }
        }
        setHashKey(dst, h);
        return dst;
    }
    exports.extend = function extend(obj1, obj2, obj3, obj4) {
        var args = arguments && arguments.length ? arguments : [];
        return baseExtend(obj1, slice.call(arguments, 1), false);
    };
    exports.merge = function merge(obj1, obj2, obj3, obj4) {
        var args = arguments && arguments.length ? arguments : [];
        return baseExtend(obj1, slice.call(arguments, 1), true);
    };
    // test doesn't work
    // export const isBlankObject = function isBlankObject(value) {
    //   return value !== null && typeof value === 'object' && !getPrototypeOf(value);
    // }
    exports.equals = function equals(o1, o2) {
        if (o1 === o2)
            return true;
        if (o1 === null || o2 === null)
            return false;
        // eslint-disable-next-line no-self-compare
        if (o1 !== o1 && o2 !== o2)
            return true; // NaN === NaN
        var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
        if (t1 === t2 && t1 === 'object') {
            if (exports.isArray(o1)) {
                if (!exports.isArray(o2))
                    return false;
                if ((length = o1.length) === o2.length) {
                    for (key = 0; key < length; key++) {
                        if (!equals(o1[key], o2[key]))
                            return false;
                    }
                    return true;
                }
            }
            else if (exports.isDate(o1)) {
                if (!exports.isDate(o2))
                    return false;
                return equals(o1.getTime(), o2.getTime());
            }
            else if (exports.isRegExp(o1)) {
                if (!exports.isRegExp(o2))
                    return false;
                return o1.toString() === o2.toString();
            }
            else {
                if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) ||
                    exports.isArray(o2) || exports.isDate(o2) || exports.isRegExp(o2))
                    return false;
                keySet = createMap();
                for (key in o1) {
                    if (key.charAt(0) === '$' || exports.isFunction(o1[key]))
                        continue;
                    if (!equals(o1[key], o2[key]))
                        return false;
                    keySet[key] = true;
                }
                for (key in o2) {
                    if (!(key in keySet) &&
                        key.charAt(0) !== '$' &&
                        exports.isDefined(o2[key]) &&
                        !exports.isFunction(o2[key]))
                        return false;
                }
                return true;
            }
        }
        return false;
    };
});
//# sourceMappingURL=helpers.js.map