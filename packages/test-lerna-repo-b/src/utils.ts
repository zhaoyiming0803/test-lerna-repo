export function sum<T>(a: T, b: T) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b
  }
  return `a: ${a}, b: ${b}`
}

export function Test() {}

Test.prototype.test1 = function test1() {
  return 'test1'
}

Test.prototype.test2 = function test2() {
  return 'test2'
}
