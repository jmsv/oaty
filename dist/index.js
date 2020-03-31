"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Extract all the keys from the given array of objects
 */
var keys = function (data) {
    return Array.from(data
        .map(function (item) { return Object.keys(item); })
        .reduce(function (keys, itemKeys) {
        itemKeys.forEach(function (key) { return keys.add(key); });
        return keys;
    }, new Set()));
};
var OatyArray = /** @class */ (function () {
    function OatyArray(data, options) {
        if (data === void 0) { data = []; }
        this._transposed = {};
        this._data = __spreadArrays(data);
        this._options = options !== null && options !== void 0 ? options : {
            keys: data.length > 0 ? keys(data) : undefined
        };
        this.transpose(this._data);
    }
    Object.defineProperty(OatyArray.prototype, "keys", {
        get: function () {
            return this._options.keys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OatyArray.prototype, "length", {
        get: function () {
            return this._data.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OatyArray.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OatyArray.prototype, "transposed", {
        get: function () {
            return this._transposed;
        },
        enumerable: true,
        configurable: true
    });
    OatyArray.prototype.get = function (keyName, keyValue) {
        if (this._transposed[keyName] === undefined) {
            throw new ReferenceError("The key '" + keyName + "' has not been transposed");
        }
        if (keyValue === undefined) {
            return this._transposed[keyName];
        }
        return this._transposed[keyName][keyValue];
    };
    OatyArray.prototype.push = function () {
        var _a;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        this.transpose(data);
        return (_a = this._data).push.apply(_a, data);
    };
    OatyArray.prototype.transpose = function (data) {
        var _a;
        var _b;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var datum = data_1[_i];
            for (var _c = 0, _d = ((_b = this.keys) !== null && _b !== void 0 ? _b : Object.keys(datum)); _c < _d.length; _c++) {
                var key = _d[_c];
                if (datum[key] === undefined) {
                    continue;
                }
                var searchKey = datum[key];
                if (this._transposed[key] === undefined) {
                    this._transposed[key] = (_a = {}, _a[searchKey] = [datum], _a);
                    continue;
                }
                if (this._transposed[key][searchKey] === undefined) {
                    this._transposed[key][searchKey] = [datum];
                    continue;
                }
                this._transposed[key][searchKey].push(datum);
            }
        }
    };
    return OatyArray;
}());
exports.OatyArray = OatyArray;
