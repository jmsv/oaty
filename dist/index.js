"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OatyArray = /** @class */ (function () {
    function OatyArray(_data, _options) {
        if (_options === void 0) { _options = {}; }
        this._data = _data;
        this._options = _options;
        this._transposed = {};
        this.transpose(_data);
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
        if (keyValue === undefined) {
            return this._transposed[keyName];
        }
        if (this._transposed[keyName] === undefined) {
            throw new ReferenceError("The key '" + keyName + "' has not been transposed");
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
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var datum = data_1[_i];
            for (var _b = 0, _c = (this.keys || Object.keys(datum)); _b < _c.length; _b++) {
                var key = _c[_b];
                if (datum[key] === undefined) {
                    continue;
                }
                if (this._transposed[key] === undefined) {
                    this._transposed[key] = (_a = {}, _a[datum[key]] = [datum], _a);
                    continue;
                }
                if (this._transposed[key][datum[key]] === undefined) {
                    this._transposed[key][datum[key]] = [datum];
                    continue;
                }
                this._transposed[key][datum[key]].push(datum);
            }
        }
    };
    return OatyArray;
}());
exports.OatyArray = OatyArray;
