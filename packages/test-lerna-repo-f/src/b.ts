import { A } from './a'

const a = new A('this is privateMessage of A')

// error:
// Property 'privateMessage' is private and only accessible within class 'A'.ts
// console.log(a.privateMessage)

console.log('run a.printPrivateMessage: ', a.printPrivateMessage())

// error:
// Property 'protectedMessage' is protected and only accessible within class 'A' and its subclasses.
// console.log(a.protectedMessage)
class B extends A {
	// error:
	// Class 'B' incorrectly extends base class 'A'.
	// Types have separate declarations of a private property 'privateMessage'
	// private privateMessage: string = ''

	protected protectedMessage: string = ''

	constructor (privateMessage: string, protectedMessage: string) {
		super(privateMessage)
		this.protectedMessage = protectedMessage
	}

	printProtectedMessage () {
		return this.protectedMessage
	}
}

const b = new B('privateMessage for B', 'protectedMessage for B')

console.log('run b.printProtectedMessage: ', b.printProtectedMessage())
console.log('b.staticMessage: ', B.staticMessage)

export function b1 () {
	return 'b1'
}

export function b2 () {
	return 'b2'
}

export function b3 () {
	return 'b3'
}
