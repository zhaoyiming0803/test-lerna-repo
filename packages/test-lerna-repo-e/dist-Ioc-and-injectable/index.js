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
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(k, v);
    }
};

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) {
        for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

Object.defineProperty(exports, "__esModule", { value: true });

require("reflect-metadata");

function Injectable() {
    return function (target) {
        console.log('Injectable: ', target);
    };
}

var OtherService1 = /** @class */ (function () {
    function OtherService1() {
        this.a = 1;
    }
    return OtherService1;
}());

var OtherService2 = /** @class */ (function () {
    function OtherService2() {
        this.a = 2;
    }
    return OtherService2;
}());

var TestService = /** @class */ (function () {
    function TestService(otherService1, otherService2) {
        this.otherService1 = otherService1;
        this.otherService2 = otherService2;
    }

    TestService.prototype.testMethod = function () {
        console.log('this.otherService1.a: ', this.otherService1.a);
        console.log('this.otherService2.a: ', this.otherService2.a);
    };

    TestService = __decorate([
        Injectable(),
        // ts 的 class 只要有装饰器并且显式的定义了 constructor，编译完后就会有以下 __metadata
        // 如果 constructor 没有参数，则是 __metadata("design:paramtypes", [])
        // 如果没有显式的定义 constructor，则编译后没有以下 __metadata
        __metadata("design:paramtypes", [OtherService1, OtherService2])
    ], TestService);

    return TestService;
}());

function Factory(target) {
    // 获取所有注入的服务
    var providers = Reflect.getMetadata('design:paramtypes', target);
    var args = providers.map(function (provider) { return new provider(); });
    var finalArgs = __spreadArray([void 0], args, false)
    return new (target.bind.apply(target, finalArgs))();
}

// TestService {
//     otherService1: OtherService1 { a: 1 },
//     otherService2: OtherService2 { a: 2 }
// }
console.log('Factory(TestService): ', Factory(TestService))

Factory(TestService).testMethod()
