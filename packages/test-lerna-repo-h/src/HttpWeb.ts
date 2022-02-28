import { HttpBase } from './HttpBase'

export class HttpWeb implements HttpBase {

	public options: Record<string, any> = {}

	constructor (options: Record<string, any> = {}) {
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
