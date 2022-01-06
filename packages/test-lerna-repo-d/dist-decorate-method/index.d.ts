declare function f(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare function g(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare class Person {
    private name;
    private age;
    constructor(name: string, age: number);
    print(): string;
}
declare const p: Person;
