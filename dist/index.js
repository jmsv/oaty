"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OatyArray = /** @class */ (function () {
    function OatyArray(options) {
        this.original = [];
        this.transposed = {};
        if (options !== undefined) {
            if (options.data !== undefined) {
                this.push.apply(this, options.data);
            }
            if (options.keys !== undefined) {
                this.keys = options.keys;
            }
        }
    }
    Object.defineProperty(OatyArray.prototype, "length", {
        get: function () {
            return this.original.length;
        },
        enumerable: true,
        configurable: true
    });
    OatyArray.prototype.getKeys = function () {
        return this.keys;
    };
    OatyArray.prototype.getOriginal = function () {
        return this.original;
    };
    OatyArray.prototype.getTransposed = function () {
        return this.original;
    };
    OatyArray.prototype.get = function (keyName, keyValue) {
        if (this.transposed === undefined
            || this.transposed[keyName] === undefined) {
            return undefined;
        }
        return this.transposed[keyName][keyValue];
    };
    OatyArray.prototype.push = function () {
        var _this = this;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        data.forEach(function (datum) {
            var clone = Object.assign({}, datum);
            _this.original.push(clone);
            _this.transpose(clone);
        });
        return this.length;
    };
    OatyArray.prototype.getKeysForObject = function (datum) {
        return this.keys !== undefined ? this.keys : Object.keys(datum);
    };
    OatyArray.prototype.transpose = function (datum) {
        var _this = this;
        this.getKeysForObject(datum).forEach(function (key) {
            if (datum[key] === undefined) {
                return;
            }
            if (_this.transposed[key] === undefined) {
                _this.transposed[key] = {};
            }
            if (_this.transposed[key][datum[key]] === undefined) {
                _this.transposed[key][datum[key]] = [datum];
            }
            else {
                _this.transposed[key][datum[key]].push(datum);
            }
        });
    };
    return OatyArray;
}());
exports.OatyArray = OatyArray;
