import { util2 } from './utils'
export class A {
  constructor () {}

  static readonly packageName: string = 'A'

  a1 () {}

  a2 () {
    return util2()
  }
}

export class B {
  constructor () {}

  static readonly packageName: string = 'B'

  b1 () {}

  b2 () {}
}

export class C {
  constructor () {}
}
