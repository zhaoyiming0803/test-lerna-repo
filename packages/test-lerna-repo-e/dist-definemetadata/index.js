"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length
    var r = c < 3
        ? target
        : desc === null
            ? desc = Object.getOwnPropertyDescriptor(target, key)
            : desc
    var d

    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc)
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

function classDecorator() {
    return function (construtor) {
        Reflect.defineMetadata('classMetaData', 'A', construtor);
    };
}

function methodDecorator() {
    return function (target, key, descriptor) {
        Reflect.defineMetadata('methodMetaData', 'B', target, key);
    };
}

var SomeClass = /** @class */ (function () {
    function SomeClass() {
    }

    SomeClass.prototype.someMethod = function () { };

    __decorate([
        methodDecorator(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SomeClass.prototype, "someMethod", null);

    SomeClass = __decorate([
        classDecorator()
    ], SomeClass);

    return SomeClass;
}());

console.log(Reflect.getMetadata('classMetaData', SomeClass)); // 'A'
console.log(Reflect.getMetadata('methodMetaData', new SomeClass(), 'someMethod')); // 'B'
console.log(Reflect.getMetadata('methodMetaData', SomeClass.prototype, 'someMethod')); // 'B'
