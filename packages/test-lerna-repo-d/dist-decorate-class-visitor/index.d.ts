declare function configurable(value: boolean): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare class Point {
    private _x;
    private _y;
    constructor(x: number, y: number);
    get x(): number;
    set x(value: number);
    get y(): number;
}
declare const p: Point;
