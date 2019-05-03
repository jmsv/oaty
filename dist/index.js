"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OatyObject = /** @class */ (function () {
    function OatyObject(input, keys) {
        this.transformed = {};
        this.original = input;
        this.keys = keys;
        this.transformed = keys.reduce(function (acc, newKey) {
            acc[newKey] = transform(input, newKey);
            return acc;
        }, {});
    }
    OatyObject.prototype.get = function (keyName, keyValue) {
        return this.transformed[keyName][keyValue];
    };
    return OatyObject;
}());
exports.default = OatyObject;
var transform = function (array, targetKey) {
    return array.reduce(function (acc, item) {
        if (acc[item[targetKey]]) {
            acc[item[targetKey]].push(item);
        }
        else {
            acc[item[targetKey]] = [item];
        }
        return acc;
    }, {});
};
