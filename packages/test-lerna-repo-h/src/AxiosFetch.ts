import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios'
import { HttpNormalConfig, ResponseData } from './types'

export class AxiosFetch {
  private config: HttpNormalConfig

  constructor(config: HttpNormalConfig) {
    this.config = config
  }

  public request(config: AxiosRequestConfig): AxiosPromise<ResponseData> { 
    const instance: AxiosInstance = axios.create()
    config = this.mergeConfig(config)
    this.interceptors(instance)
    return instance(config)
  }

  private interceptors (instance: AxiosInstance) {
    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      config.headers = {
        appId: this.config.appId
      }
      return config
    }, error => Promise.reject(error))

    instance.interceptors.response.use((res: AxiosResponse) => {
      // ...
      return res
    }, error => Promise.reject(error))
  }

  private mergeConfig (config: AxiosRequestConfig): AxiosRequestConfig {
    return Object.assign({}, config)
  }
}

