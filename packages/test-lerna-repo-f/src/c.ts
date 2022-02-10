class C1 {
	public message: string = ''
	protected constructor (message: string) {
		this.message = message
	}
}

export class C2 extends C1 {
	static default (defaultMessage: string) {
		return new C2(defaultMessage)
	}
}
