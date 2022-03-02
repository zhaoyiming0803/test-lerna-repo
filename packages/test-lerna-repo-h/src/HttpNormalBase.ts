import { AxiosRequestConfig, AxiosPromise } from 'axios'
import { AxiosFetch } from './AxiosFetch'
import { HttpNormalConfig } from './types'

export abstract class HttpNormalBase {
  public httpClient: AxiosFetch

  constructor(config: HttpNormalConfig) {
    this.httpClient = new AxiosFetch(config)
  }

  public request(config: AxiosRequestConfig): AxiosPromise {
    return this.httpClient.request(config)
  }

  // get(url: string, config?: AxiosRequestConfig): AxiosPromise {
  // 	return this.httpClient.get(url, config)
  // }

  // delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
  // 	return this.httpClient.delete(url, config)
  // }

  // post<D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): AxiosPromise {
  // 	return this.httpClient.post(url, data, config)
  // }

  // put<D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): AxiosPromise {
  // 	return this.httpClient.put(url, data, config)
  // }

  // patch<D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): AxiosPromise {
  // 	return this.httpClient.patch(url, data, config)
  // }
}
