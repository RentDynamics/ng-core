let slice = [].slice,
  getPrototypeOf = Object.getPrototypeOf;

export const isArray = Array.isArray;

export const isUndefined = function isUndefined(value) { return typeof value === 'undefined'; }

export const isDefined = function isDefined(value) { return typeof value !== 'undefined'; }

export const isObject = function isObject(value) {
  // http://jsperf.com/isobject4
  return value !== null && typeof value === 'object';
}

export const isString = function isString(value) { return typeof value === 'string'; }

export const isNumber = function isNumber(value) { return typeof value === 'number'; }

export const isDate = function isDate(value) {
  return toString.call(value) === '[object Date]'
}

export const isBoolean = function isBoolean(value) {
  return typeof value === 'boolean';
}

export const isFunction = function isFunction(value) { return typeof value === 'function'; }

export const isElement = function isElement(node) {
  return !!(node &&
    (node.nodeName  // We are a direct element.
      || (node.prop && node.attr && node.find)));  // We have an on and find method part of jQuery API.
}

export const isRegExp = function isRegExp(value) {
  return toString.call(value) === '[object RegExp]';
}

function createMap() {
  return Object.create(null);
}

function setHashKey(obj, h) {
  if (h) {
    obj.$$hashKey = h;
  } else {
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
    if (!isObject(obj) && !isFunction(obj)) continue;
    var keys = Object.keys(obj);
    for (var j = 0, jj = keys.length; j < jj; j++) {
      var key = keys[j];
      var src = obj[key];

      if (deep && isObject(src)) {
        if (isDate(src)) {
          dst[key] = new Date(src.valueOf());
        } else if (isRegExp(src)) {
          dst[key] = new RegExp(src);
        } else if (src.nodeName) {
          dst[key] = src.cloneNode(true);
        } else if (isElement(src)) {
          dst[key] = src.clone();
        } else {
          if (!isObject(dst[key])) dst[key] = isArray(src) ? [] : {};
          baseExtend(dst[key], [src], true);
        }
      } else {
        dst[key] = src;
      }
    }
  }

  setHashKey(dst, h);
  return dst;
}

export const extend = function extend(obj1: {}, obj2: {}, obj3?: {}, obj4?: {}) {
  let args: any = arguments && arguments.length ? arguments : [];
  return baseExtend(obj1, slice.call(arguments, 1), false);
}

export const merge = function merge(obj1: {}, obj2: {}, obj3?: {}, obj4?: {}) {
  let args: any = arguments && arguments.length ? arguments : [];
  return baseExtend(obj1, slice.call(arguments, 1), true);
}

// test doesn't work
// export const isBlankObject = function isBlankObject(value) {
//   return value !== null && typeof value === 'object' && !getPrototypeOf(value);
// }

export const equals = function equals(o1, o2) {
  if (o1 === o2) return true;
  if (o1 === null || o2 === null) return false;
  // eslint-disable-next-line no-self-compare
  if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN
  var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
  if (t1 === t2 && t1 === 'object') {
    if (isArray(o1)) {
      if (!isArray(o2)) return false;
      if ((length = o1.length) === o2.length) {
        for (key = 0; key < length; key++) {
          if (!equals(o1[key], o2[key])) return false;
        }
        return true;
      }
    } else if (isDate(o1)) {
      if (!isDate(o2)) return false;
      return equals(o1.getTime(), o2.getTime());
    } else if (isRegExp(o1)) {
      if (!isRegExp(o2)) return false;
      return o1.toString() === o2.toString();
    } else {
      if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) ||
        isArray(o2) || isDate(o2) || isRegExp(o2)) return false;
      keySet = createMap();
      for (key in o1) {
        if (key.charAt(0) === '$' || isFunction(o1[key])) continue;
        if (!equals(o1[key], o2[key])) return false;
        keySet[key] = true;
      }
      for (key in o2) {
        if (!(key in keySet) &&
          key.charAt(0) !== '$' &&
          isDefined(o2[key]) &&
          !isFunction(o2[key])) return false;
      }
      return true;
    }
  }
  return false;
}