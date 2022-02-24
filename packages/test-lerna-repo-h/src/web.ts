export class HttpWeb {

	public options: Record<string, any> = {}

	constructor (options) {
		this.options = options
	}

	request () {
		return 'request in HttpWeb'
	}

	get () {
		return 'get in HttpWeb'
	}

	post () {
		return 'post in HttpWeb'
	}

	delete () {
		return 'delete in HttpWeb'
	}

	patch () {
		return 'patch in HttpWeb'
	}

	put () {
		return 'put in HttpWeb'
	}
}