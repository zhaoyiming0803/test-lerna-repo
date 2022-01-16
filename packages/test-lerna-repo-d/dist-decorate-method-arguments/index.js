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

var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) {
        console.log('__param target: ', target) // Greeter 实例
        console.log('__param key: ', key) // 'greet'
        console.log('__param paramIndex: ', paramIndex) // 0
        console.log('__param decorator: ', decorator) // required function
        decorator(target, key, paramIndex)
    }
};

Object.defineProperty(exports, "__esModule", { value: true });

require("reflect-metadata");

var requiredMetadataKey = Symbol("required");

function required(target, propertyKey, parameterIndex) {
    var existingRequiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function validate(target, propertyName, descriptor) {
    console.log('validate target: ', target) // Greetr 实例
    console.log('validate propertyName: ', propertyName) // 'greet'
    // {
    //     value: [Function (anonymous)],
    //     writable: true,
    //     enumerable: true,
    //     configurable: true
    // }
    console.log('validate descriptor: ', descriptor)
    var method = descriptor.value;
    descriptor.value = function () {
        var requiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (var _i = 0, requiredParameters_1 = requiredParameters; _i < requiredParameters_1.length; _i++) {
                var parameterIndex = requiredParameters_1[_i];
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    throw new Error(propertyName + " function missing required arguments[" + parameterIndex + ']');
                }
            }
        }
        return method && method.apply(this, arguments);
    };
}

var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }

    Greeter.prototype.greet = function (name, age) {
        return "Hello " + name + ", " + this.greeting + ' age: ' + age;
    };

    __decorate([
        validate,
        __param(0, required),
        __param(1, required)
    ], Greeter.prototype, "greet", null);

    return Greeter;
}());

const g = new Greeter('new Greeter')
console.log(g.greet('', 18)) // Hello , new Greeter age: 18
// g.greet() // Error: greet function missing required arguments[1]

// __param 一个被 ts 编译后的高阶函数，分批接收不同的参数，最后执行 decorator（required），
// required 内通过被 required 装饰的索引数组、类示例、类属性定义了 defineMetadata，
// 最后在 validate 中将 metadata 取出来并通过 arguments 定位到参数值做校验。
