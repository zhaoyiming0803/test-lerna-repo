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

function wrapperedClass1 () {
    const keyList = ['a', 'b']
    const args = [].slice.apply(arguments, [0, keyList.length])

    return function (constructor) {
        args.forEach((arg, index) => {
            constructor[keyList[index]] = arg
        })
    }
}

function wrapperedClass2 (constructor) {
    constructor.author = 'https://github.com/zhaoyiming0803'
}

function wrapperedShowWorld1 () {
    const args = [].slice.apply(arguments, [0])

    return function (target, propertyKey, descriptor) {
        const method = descriptor.value

        descriptor.value = function overwriteShowWorld1 () {
            // 这里的 arguments 是 overwriteShowWorld2 中使用 apply 执行 method 传入的数组
            const _args = [].slice.call(arguments, 0)

            return method && method.apply(this, [].concat(
                '--- wrapperedShowWorld1 ---',
                `target === Test.prototype: ${target === Test.prototype}`, 
                `propertyKey: ${propertyKey}`, 
                // _args,
                args,
                _args
            ))
        }
    }
}

function wrapperedShowWorld2 (target, propertyKey, descriptor) {
    // 参考源码 DecorateProperty 的实现
    // 这里的 descriptor.value 已经变成 overwriteShowWorld1 了，而不是原始的 showWorld
    const method = descriptor.value

    descriptor.value = function overwriteShowWorld2 () {
        // 当下面的 demo Test 的 showWorld 中，arguments 是传入的 100 200
        const _args = [].slice.call(arguments, 0)

        return method && method.apply(this, [].concat(
            '--- wrapperedShowWorld2 ---',
            `target === Test.prototype: ${target === Test.prototype}`, 
            `propertyKey: ${propertyKey}`,
            _args
        ))
    }
}

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

    Test.prototype.showWorld = function () {
        const args = [].slice.call(arguments, 0)
        return ['run showWorld: '].concat(args)
    }

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

    __decorate([
        Reflect.metadata('inMethod', 'D'),
        wrapperedShowWorld2,
        wrapperedShowWorld1(1, 2)
    ], Test.prototype, 'showWorld', null)

    Test = __decorate([
        Reflect.metadata('inClass', 'A'),
        wrapperedClass2,
        wrapperedClass1(1, 2)
    ], Test);

    return Test;
}());

console.log(Reflect.getMetadata('inClass', Test)); // 'A'
console.log(Reflect.getMetadata('inMethod', new Test(), 'hello')); // 'B'
console.log(Reflect.getMetadata('inMethod', new Test(), 'print')); // 'C'
console.log(Reflect.getMetadata('inMethod', Test.prototype, 'showWorld')); // 'D'
console.log(new Test().showWorld(100, 200))
console.log(Object.getOwnPropertyDescriptor(Test.prototype, 'showWorld').value) // [Function: overwriteShowWorld2]
console.log(Object.keys(Test)) // [ 'a', 'b', 'author' ]

// Reflect.metadata 函数返回的是一个 decorator 函数，其内部执行了：
// OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
// 如：OrdinaryDefineOwnMetadata(inMethod, D, Test.prototype, showWorld);
// OrdinaryDefineOwnMetadata 又调用 GetOrCreateMetadataMap 返回并返回一个 Map，最后是给这个 Map 设置 key 为 metadataKey，value 为 metadataValue
// GetOrCreateMetadataMap 函数如下，之所以有 Metadata 和 targetMetadata，是为了『隔离』
// 因为一个 class 的多个 method 上可能会定义同一个 medataKey，但是 metadataValue 不同
// 使用 targetMetadata 和 targetMetadata 隔离区分，方便 getMetadata 搜索并获取值
/**
function GetOrCreateMetadataMap(O, P, Create) {
    var targetMetadata = Metadata.get(O);
    if (IsUndefined(targetMetadata)) {
        if (!Create)
            return undefined;
        targetMetadata = new _Map();
        Metadata.set(O, targetMetadata);
    }
    var metadataMap = targetMetadata.get(P);
    if (IsUndefined(metadataMap)) {
        if (!Create)
            return undefined;
        metadataMap = new _Map();
        targetMetadata.set(P, metadataMap);
    }
    return metadataMap;
}
 */


// Reflect.decorate 会根据传入的实参 propertyKey 是否是 undefined 作为区分是装饰 class 还是 method 等。
/**
 function decorate(decorators, target, propertyKey, attributes) {
    if (!IsUndefined(propertyKey)) {
        if (!IsArray(decorators))
            throw new TypeError();
        if (!IsObject(target))
            throw new TypeError();
        if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
            throw new TypeError();
        if (IsNull(attributes))
            attributes = undefined;
        propertyKey = ToPropertyKey(propertyKey);
        return DecorateProperty(decorators, target, propertyKey, attributes);
    } else {
        if (!IsArray(decorators))
            throw new TypeError();
        if (!IsConstructor(target))
            throw new TypeError();
        return DecorateConstructor(decorators, target);
    }
}

function DecorateConstructor(decorators, target) {
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        
        // 装饰 class，给自定义的装饰器传入一个参 target，也就是 class 本身
        var decorated = decorator(target);

        // 一个 class 可能会有多个装饰器，如果有返回值，就把 target 设置为最新的，然后传给下一个装饰器
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsConstructor(decorated))
                throw new TypeError();

            // 传给下一个装饰器
            target = decorated;
        }
    }
    return target;
}

function DecorateProperty(decorators, target, propertyKey, descriptor) {
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];

        // 装饰除 class 之外的其他属性或方法时，会传入：
        // target: class 的 prototype
        // propertyKey: 属性或函数名
        // descriptor: 通过 Object.getOwnPropertyDescriptor(target, propertyKey) 获得
        var decorated = decorator(target, propertyKey, descriptor);

        // 一个 class 可能会有多个装饰器，如果有返回值，就把 target 设置为最新的，然后传给下一个装饰器
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsObject(decorated))
                throw new TypeError();

            // 传给下一个装饰器
            descriptor = decorated;
        }
    }
    return descriptor;
}
 */