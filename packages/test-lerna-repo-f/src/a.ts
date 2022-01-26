function decorateA<T extends {
  new(...args: any[]): {};
}>(Ctor: T) {
  Object.seal(Ctor)
  Object.seal(Ctor)
}
@decorateA
class A {
  private message

  constructor(message: string) {
    this.message = message
  }

  printMessage() {
    return this.message
  }
}

export function a1() {
  return 'a1' + new A('helloWorld').printMessage()
}

export function a2() {
  return 'a2'
}

export function a3() {
  return 'a3'
}

