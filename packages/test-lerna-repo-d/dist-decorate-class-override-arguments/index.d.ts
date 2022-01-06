declare function classDecorator(a: number, b: number, c: number): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        newProperty: string;
        hello: number;
    };
} & T;
declare class Greeter {
    property: string;
    hello: string;
    constructor(m: string);
}
