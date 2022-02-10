import { a1, a2, a3 } from './a'
import { b1, b2, b3 } from './b'
import { C2 } from './c'

export const res1 = a1() + b1()
export const res2 = a2() + b2()
export const res3 = a3() + b3()

console.log(C2.default('default C2 message'))

// Object is of type 'unknown'
// function fn1 (data: unknown) {
//   return data.length
// }

function fn1 (data: any) {
	// no check
	return data.length
}

console.log(fn1(1))
console.log(fn1('2'))
