"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", { value: true });

require("reflect-metadata");

var formatMetadataKey = Symbol("format");

function format(formatString) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target, propertyKey) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }

    Greeter.prototype.greet = function () {
        var formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    };

    __decorate([
        format('Hello, %s')
    ], Greeter.prototype, "greeting", void 0);

    return Greeter;
}());

var g = new Greeter('ni hao shijie');
console.log(g.greet()); // Hello, ni hao shijie
