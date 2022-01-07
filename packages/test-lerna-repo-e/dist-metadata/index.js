"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length;
    var r = c < 3
        ? target
        : desc === null
            ? desc = Object.getOwnPropertyDescriptor(target, key)
            : desc;
    var d;

    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for (var i = decorators.length - 1; i >= 0; i--) {
            if (d = decorators[i]) {
                r = (c < 3
                    ? d(r)
                    : c > 3
                        ? d(target, key, r)
                        : d(target, key)
                ) || r;
            }
        }
    }

    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", { value: true });

require("reflect-metadata");

var Test = /** @class */ (function () {
    function Test() {
    }

    Test.prototype.hello = function (message) {
        this.print({
            className: 'Test'
        });
        return 'hello' + message;
    };

    Test.prototype.print = function (info) {
        return info;
    };

    var _a, _b;

    __decorate([
        Reflect.metadata('inMethod', 'B'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", String)
    ], Test.prototype, "hello", null);

    __decorate([
        Reflect.metadata('inMethod', 'C'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_a = typeof T !== "undefined" && T) === "function" ? _a : Object]),
        __metadata("design:returntype", typeof (_b = typeof T !== "undefined" && T) === "function" ? _b : Object)
    ], Test.prototype, "print", null);

    Test = __decorate([
        Reflect.metadata('inClass', 'A')
    ], Test);
    
    return Test;
}());

console.log(Reflect.getMetadata('inClass', Test)); // 'A'
console.log(Reflect.getMetadata('inMethod', new Test(), 'hello')); // 'B'
console.log(Reflect.getMetadata('inMethod', new Test(), 'print')); // 'C'
