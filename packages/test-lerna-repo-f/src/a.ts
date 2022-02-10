function decorateA<T extends {
  new(...args: any[]): {};
}>(Ctor: T) {
	Object.seal(Ctor)
	Object.seal(Ctor)
}
@decorateA
export class A {
	private privateMessage: string = ''
	protected protectedMessage: string = ''
	static staticMessage: string = 'staticMessage for A'

	constructor(privateMessage: string) {
		this.privateMessage = privateMessage
	}

	printPrivateMessage() {
		return this.privateMessage
	}
}

export function a1() {
	return 'a1' + new A('helloWorld').printPrivateMessage()
}

export function a2() {
	return 'a2'
}

export function a3() {
	return 'a3'
}
