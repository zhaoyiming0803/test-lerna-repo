import { HttpBase } from './HttpBase'

export class HttpNode implements HttpBase {

	public options: Record<string, any> = {}

	constructor (options) {
		this.options = options
	}

	request () {
		return 'request in HttpNode'
	}

	get () {
		return 'get in HttpNode'
	}

	post () {
		return 'post in HttpNode'
	}

	delete () {
		return 'delete in HttpNode'
	}

	patch () {
		return 'patch in HttpNode'
	}

	put () {
		return 'put in HttpNode'
	}
}
