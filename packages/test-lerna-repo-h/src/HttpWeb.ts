import { HttpNormalBase } from './HttpNormalBase'
import { AxiosRequestConfig, AxiosPromise } from 'axios'
import { AxiosFetch } from './AxiosFetch'
import { HttpNormalConfig } from './types'

export class HttpWeb implements HttpNormalBase {

	public httpClient: AxiosFetch

	constructor (config: HttpNormalConfig) {
		this.httpClient = new AxiosFetch(config)
	}

	public request(config: AxiosRequestConfig): AxiosPromise {
		return this.httpClient.request(config)
	}
}
