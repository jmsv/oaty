"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OatyArray = /** @class */ (function () {
    function OatyArray(input, keys) {
        this._transposed = {};
        this._original = input.map(function (x) { return Object.assign({}, x); });
        this._keys = keys;
        this._transposed = transpose(this._keys, this._original);
    }
    Object.defineProperty(OatyArray.prototype, "length", {
        get: function () {
            return this._original.length;
        },
        enumerable: true,
        configurable: true
    });
    OatyArray.prototype.get = function (keyName, keyValue) {
        return this._transposed[keyName][keyValue];
    };
    OatyArray.prototype.push = function () {
        var _a;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        this._transposed = transpose(this._keys, items, this._transposed);
        return (_a = this._original).push.apply(_a, items);
    };
    return OatyArray;
}());
exports.OatyArray = OatyArray;
var transpose = function (keys, items, current) {
    return keys.reduce(function (transposed, key) {
        transposed[key] = items.reduce(function (acc, item) {
            acc[item[key]] ? acc[item[key]].push(item) : acc[item[key]] = [item];
            return acc;
        }, current || {});
        return transposed;
    }, {});
};
