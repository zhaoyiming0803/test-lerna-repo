"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", { value: true });

require("reflect-metadata");

var METHOD_METADATA = 'method';
var PATH_METADATA = 'path';

function Controller(path) {
    return function (target) {
        Reflect.defineMetadata(PATH_METADATA, path, target);
    };
}

function createMappingDecorator(method) {
    return function (path) {
        return function (target, key, descriptor) {
            Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
            Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
        };
    };
}

var Get = createMappingDecorator('GET');
var Post = createMappingDecorator('POST');

function isConstructor(argument) {
    // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
    return typeof argument === 'function' && argument;
}

function isFunction(argument) {
    return typeof argument === 'function' && typeof argument.nodeType !== 'number';
}

function mapRoute(instance) {
    var prototype = Object.getPrototypeOf(instance);
    var methodsNames = Object.getOwnPropertyNames(prototype).filter(function (item) { return item !== 'constructor' && isFunction(prototype[item]); });
    return methodsNames.map(function (methodName) {
        var fn = prototype[methodName];
        var route = Reflect.getMetadata(PATH_METADATA, SomeClass) + Reflect.getMetadata(PATH_METADATA, fn);
        var method = Reflect.getMetadata(METHOD_METADATA, fn);
        return {
            route: route,
            method: method,
            fn: fn,
            methodName: methodName
        };
    });
}

var SomeClass = /** @class */ (function () {
    function SomeClass() {
    }

    SomeClass.prototype.someGetMethod = function () {
        return 'hello world';
    };
    
    SomeClass.prototype.somePostMethod = function () { };
    
    __decorate([
        Get('/a'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SomeClass.prototype, "someGetMethod", null);

    __decorate([
        Post('/b'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SomeClass.prototype, "somePostMethod", null);

    SomeClass = __decorate([
        Controller('/test')
    ], SomeClass);

    return SomeClass;
}());

console.log('SomeClass path: ', Reflect.getMetadata(PATH_METADATA, SomeClass)); // '/test'
/**
[
  {
    route: '/test/a',
    method: 'GET',
    fn: [Function (anonymous)],
    methodName: 'someGetMethod'
  },
  {
    route: '/test/b',
    method: 'POST',
    fn: [Function (anonymous)],
    methodName: 'somePostMethod'
  }
]
 */
console.log('mapRoute: ', mapRoute(new SomeClass()));
