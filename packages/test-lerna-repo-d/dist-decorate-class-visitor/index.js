"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

function configurable(value) {
    return function (target, propertyKey, descriptor) {
        console.log('target: ', target);
        console.log('propertyKey: ', propertyKey);
        console.log('descriptor: ', descriptor);
        descriptor.configurable = value;
    };
}

var Point = /** @class */ (function () {
    function Point(x, y) {
        this._x = x;
        this._y = y;
    }

    Object.defineProperty(Point.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: false,
        configurable: true
    });

    Object.defineProperty(Point.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: false,
        configurable: true
    });

    __decorate([
        configurable(false)
    ], Point.prototype, "x", null);
    
    __decorate([
        configurable(false)
    ], Point.prototype, "y", null);
    
    return Point;
}());

var p = new Point(1, 2);
console.log('x: ', p.x);
console.log('y: ', p.y);
p.x = 123;
console.log('new x: ', p.x);
