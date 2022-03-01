import { HttpNormalBase } from './HttpNormalBase'
import { AxiosRequestConfig, AxiosPromise } from 'axios'
import { AxiosFetch } from './AxiosFetch'
import { HttpNormalConfig } from './types'
export class HttpNode implements HttpNormalBase {

	public httpClient: AxiosFetch

	constructor (config: HttpNormalConfig) {
		this.httpClient = new AxiosFetch(config)
	}

	public request(config: AxiosRequestConfig): AxiosPromise {
		return this.httpClient.request(config)
	}

	// get(url: string, config?: AxiosRequestConfig): AxiosPromise {
	// 	return this.httpClient.request({
	// 		...config,
	// 		url,
	// 		method: 'GET'
	// 	})
	// }

	// post<D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): AxiosPromise {
	// 	return this.httpClient.request({
	// 		...config,
	// 		url,
	// 		data,
	// 		method: 'POST'
	// 	})
	// }

	// delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
	// 	return this.httpClient.request({
	// 		...config,
	// 		url,
	// 		method: 'DELETE'
	// 	})
	// }

	// put<D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): AxiosPromise {
	// 	return this.httpClient.request({
	// 		...config,
	// 		url,
	// 		data
	// 	})
	// }

	// patch<D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): AxiosPromise {
	// 	return this.httpClient.request({
	// 		...config,
	// 		url,
	// 		data
	// 	})
	// }
}
