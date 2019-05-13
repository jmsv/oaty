"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OatyArray = /** @class */ (function () {
    function OatyArray(data, options) {
        this._original = [];
        this._transposed = {};
        if (data !== undefined) {
            this.push.apply(this, data);
        }
        if (options !== undefined) {
            if (options.keys !== undefined) {
                this._keys = options.keys;
            }
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
        if (this._transposed[keyName] === undefined) {
            return undefined;
        }
        return this._transposed[keyName][keyValue];
    };
    OatyArray.prototype.push = function () {
        var _this = this;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        data.forEach(function (datum) {
            var clone = Object.assign({}, datum);
            _this._original.push(clone);
            _this.transpose(clone);
        });
        return this._original.length;
    };
    OatyArray.prototype.transpose = function (datum) {
        var _this = this;
        (this._keys || Object.keys(datum)).forEach(function (key) {
            if (datum[key] === undefined) {
                return;
            }
            if (_this._transposed[key] === undefined) {
                _this._transposed[key] = {};
            }
            if (_this._transposed[key][datum[key]] === undefined) {
                _this._transposed[key][datum[key]] = [datum];
            }
            else {
                _this._transposed[key][datum[key]].push(datum);
            }
        });
    };
    return OatyArray;
}());
exports.OatyArray = OatyArray;
