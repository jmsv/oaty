"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OatyArray = /** @class */ (function () {
    function OatyArray(options) {
        this._original = [];
        this._transposed = {};
        if (options !== undefined) {
            if (options.data !== undefined) {
                this.push(options.data);
            }
            this._keys = options.keys;
        }
    }
    Object.defineProperty(OatyArray.prototype, "keys", {
        get: function () {
            return this._keys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OatyArray.prototype, "length", {
        get: function () {
            return this._original.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OatyArray.prototype, "original", {
        get: function () {
            return this._original;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OatyArray.prototype, "transposed", {
        get: function () {
            return this._original;
        },
        enumerable: true,
        configurable: true
    });
    OatyArray.prototype.get = function (keyName, keyValue) {
        return this._transposed[keyName][keyValue] || [];
    };
    OatyArray.prototype.push = function (data) {
        var _this = this;
        data.forEach(function (datum) {
            _this._original.push(datum);
            _this.transpose(datum);
        });
        return this._original.length;
    };
    OatyArray.prototype.transpose = function (datum) {
        var _this = this;
        (this._keys || Object.keys(datum)).forEach(function (key) {
            var _a;
            if (datum[key] !== undefined) {
                (_this._transposed[key] === undefined)
                    ? _this._transposed[key] = (_a = {}, _a[datum[key]] = [datum], _a)
                    : ((_this._transposed[key][datum[key]] === undefined)
                        ? _this._transposed[key][datum[key]] = [datum]
                        : _this._transposed[key][datum[key]].push(datum));
            }
        });
    };
    return OatyArray;
}());
exports.OatyArray = OatyArray;
