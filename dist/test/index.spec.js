"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var index_1 = require("../index");
var fixture;
beforeEach(function () {
    fixture = new Fixture();
});
describe('OatyArray', function () {
    describe('new', function () {
        context('()', function () {
            it('initialises', function () {
                fixture.givenOatyArray();
                fixture.thenOatyArrayExists();
            });
        });
        context('({data})', function () {
            it('initialises', function () {
                var testArray = [
                    { a: 1, b: 1, fruit: 'apple' },
                    { a: 1, b: 2, fruit: 'apple' },
                    { a: 1, b: 3, fruit: 'banana' }
                ];
                fixture.givenOatyArray({ data: testArray });
                fixture.thenOatyArrayExists();
                fixture.thenOriginalsEquals(testArray);
            });
        });
        context('({keys})', function () {
            it('initialises', function () {
                fixture.givenOatyArray({ keys: ['a', 'b', 'fruit'] });
                fixture.thenOatyArrayExists();
                fixture.thenKeysEquals(['a', 'b', 'fruit']);
            });
        });
        context('({data, keys})', function () {
            it('initialises', function () {
                var testArray = [
                    { a: 1, b: 1, fruit: 'apple' },
                    { a: 1, b: 2, fruit: 'apple' },
                    { a: 1, b: 3, fruit: 'banana' }
                ];
                fixture.givenOatyArray({ data: testArray, keys: ['a'] });
                fixture.thenOatyArrayExists();
                fixture.thenOriginalsEquals(testArray);
                fixture.thenKeysEquals(['a']);
            });
        });
    });
    describe('.push()', function () {
        it('adds data', function () {
            var data = [
                { a: 5, b: 5, fruit: 'potato' },
                { a: 6, b: 6, fruit: 'courgette' }
            ];
            fixture.givenOatyArray();
            fixture.whenDataIsPushed(data);
            fixture.thenOriginalsEquals(data);
        });
        it('retains dereferenced data', function () {
            var data = [
                { a: 5, b: 5, fruit: 'potato' },
                { a: 6, b: 6, fruit: 'courgette' }
            ];
            fixture.givenOatyArray();
            fixture.whenDataIsPushed(data);
            data = undefined;
            fixture.thenOriginalsEquals([{ a: 5, b: 5, fruit: 'potato' },
                { a: 6, b: 6, fruit: 'courgette' }]);
        });
        it('returns the length of _original', function () {
            var testArray = [
                { a: 1, b: 1, fruit: 'apple' },
                { a: 1, b: 2, fruit: 'apple' },
                { a: 1, b: 3, fruit: 'banana' }
            ];
            var data = [{ a: 1, b: 1, fruit: 'apple' },
                { a: 1, b: 2, fruit: 'apple' },
                { a: 1, b: 3, fruit: 'banana' }];
            fixture.givenOatyArray({ data: testArray });
            fixture.whenDataIsPushed(data);
            fixture.thenCountIs(testArray.length + data.length);
        });
    });
    describe('.get()', function () {
        context('initialised data', function () {
            it('returns a match', function () {
                var testArray = [
                    { a: 1, b: 1, fruit: 'apple' },
                    { a: 1, b: 2, fruit: 'apple' },
                    { a: 1, b: 3, fruit: 'banana' }
                ];
                fixture.givenOatyArray({ data: testArray });
                fixture.whenGetIsCalledWithKVP('fruit', 'banana');
                fixture.thenMatchesEquals([{ a: 1, b: 3, fruit: 'banana' }]);
            });
            it('returns matches', function () {
                var testArray = [
                    { a: 1, b: 1, fruit: 'apple' },
                    { a: 1, b: 2, fruit: 'apple' },
                    { a: 1, b: 3, fruit: 'banana' }
                ];
                fixture.givenOatyArray({ data: testArray });
                fixture.whenGetIsCalledWithKVP('fruit', 'apple');
                fixture.thenMatchesEquals([
                    { a: 1, b: 1, fruit: 'apple' },
                    { a: 1, b: 2, fruit: 'apple' }
                ]);
            });
        });
        context('pushed data', function () {
            it('returns a match', function () {
                var data = [
                    { a: 5, b: 5, fruit: 'potato' },
                    { a: 6, b: 6, fruit: 'courgette' }
                ];
                fixture.givenOatyArray();
                fixture.whenDataIsPushed(data);
                fixture.whenGetIsCalledWithKVP('fruit', 'potato');
                fixture.thenMatchesEquals([{ a: 5, b: 5, fruit: 'potato' }]);
            });
        });
        context('querying for initialised data alongside pushed data', function () {
            it('returns a match', function () {
                var testArray = [{ a: 1, b: 1, fruit: 'apple' },
                    { a: 1, b: 2, fruit: 'apple' },
                    { a: 1, b: 3, fruit: 'banana' }];
                var data = [{ a: 5, b: 5, fruit: 'potato' },
                    { a: 6, b: 6, fruit: 'courgette' }];
                fixture.givenOatyArray({ data: testArray });
                fixture.whenDataIsPushed(data);
                fixture.whenGetIsCalledWithKVP('fruit', 'banana');
                fixture.thenMatchesEquals([{ a: 1, b: 3, fruit: 'banana' }]);
            });
        });
        context('querying for pushed data alongside initialised data', function () {
            it('returns a match', function () {
                var testArray = [{ a: 1, b: 1, fruit: 'apple' },
                    { a: 1, b: 2, fruit: 'apple' },
                    { a: 1, b: 3, fruit: 'banana' }];
                var data = [{ a: 5, b: 5, fruit: 'potato' },
                    { a: 6, b: 6, fruit: 'courgette' }];
                fixture.givenOatyArray({ data: testArray });
                fixture.whenDataIsPushed(data);
                fixture.whenGetIsCalledWithKVP('fruit', 'potato');
                fixture.thenMatchesEquals([{ a: 5, b: 5, fruit: 'potato' }]);
            });
        });
    });
});
var Fixture = /** @class */ (function () {
    function Fixture() {
        this._count = 0;
        this._matches = [];
    }
    Fixture.prototype.givenOatyArray = function (options) {
        this._oatyArray = new index_1.OatyArray(options);
    };
    Fixture.prototype.whenDataIsPushed = function (data) {
        this._count = this._oatyArray.push(data);
    };
    Fixture.prototype.whenGetIsCalledWithKVP = function (key, value) {
        this._matches = this._oatyArray.get(key, value);
    };
    Fixture.prototype.thenCountIs = function (count) {
        chai_1.expect(this._count).to.equal(count);
    };
    Fixture.prototype.thenKeysEquals = function (keys) {
        chai_1.expect(this._oatyArray.keys).to.deep.equal(keys);
    };
    Fixture.prototype.thenMatchesEquals = function (matches) {
        chai_1.expect(this._matches).to.deep.equal(matches);
    };
    Fixture.prototype.thenOatyArrayExists = function () {
        // tslint:disable-next-line: no-unused-expression
        chai_1.expect(this._oatyArray).to.exist;
    };
    Fixture.prototype.thenOriginalsEquals = function (data) {
        chai_1.expect(this._oatyArray.original).to.deep.equal(data);
    };
    return Fixture;
}());
