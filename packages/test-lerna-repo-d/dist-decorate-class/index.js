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

function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }

    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };

    Greeter = __decorate([
        sealed
    ], Greeter);

    return Greeter;
}());

var g = new Greeter('Greeter');

console.log(g.greet());
