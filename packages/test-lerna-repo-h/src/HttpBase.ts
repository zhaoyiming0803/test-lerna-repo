export abstract class HttpBase {

	public options: Record<string, any> = {}

	constructor (options: Record<string, any>) {
		this.options = options
	}

	request () {}

	get () {}

	post () {}

	delete () {}

	patch () {}

	put () {}
}
