export function sum<T> (a: T, b: T) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b
  }
  return `a: ${a}, b: ${b}`
}
