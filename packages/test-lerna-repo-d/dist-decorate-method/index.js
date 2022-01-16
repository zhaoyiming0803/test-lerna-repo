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

function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("f(): called");
        console.log('f target: ', target);
        console.log('f propertyKey: ', propertyKey);
        console.log('f descriptor: ', descriptor);
    };
}

function g() {
    console.log("g(): evaluated");

    return function (target, propertyKey, descriptor) {
        console.log("g(): called");
        console.log('g target: ', target);
        console.log('g propertyKey: ', propertyKey);
        console.log('g descriptor: ', descriptor);

        var method = descriptor.value;

        descriptor.value = function (position) {
            console.log('g override descriptor.value: ', position)
            return method && method.apply(this, arguments)
        }
    };
}

var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
        this.print('Be revoked in constructor');
    }

    Person.prototype.print = function () {
        return "-----------name: ".concat(this.name, ", age: ").concat(this.age);
    };

    __decorate([
        f(),
        g()
    ], Person.prototype, "print", null);

    return Person;
}());

var p = new Person('zhangsan', 18);

console.log('print info: ', p.print('Be revoked in external'))