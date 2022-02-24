import { HttpBase } from './HttpBase'
export class HttpMiniapp implements HttpBase {

	public options: Record<string, any> = {}

	constructor (options) {
		this.options = options
	}

	request () {
		return 'request in HttpMiniapp'
	}

	get () {
		return 'get in HttpMiniapp'
	}

	post () {
		return 'post in HttpMiniapp'
	}

	delete () {
		return 'delete in HttpMiniapp'
	}

	patch () {
		return 'patch in HttpMiniapp'
	}

	put () {
		return 'put in HttpMiniapp'
	}
}
