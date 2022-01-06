function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log('target: ', target)
      console.log('propertyKey: ', propertyKey)
      console.log('descriptor: ', descriptor)
      descriptor.configurable = value;
  };
}

class Point {
  private _x: number
  private _y: number

  constructor(x: number, y: number) {
      this._x = x
      this._y = y
  }

  @configurable(false)
  get x() {
    return this._x
  }

  set x (value: number) {
    this._x = value
  }

  @configurable(false)
  get y() {
    return this._y;
  }
}

const p = new Point(1, 2)
console.log('x: ', p.x)
console.log('y: ', p.y)

p.x = 123
console.log('new x: ', p.x)