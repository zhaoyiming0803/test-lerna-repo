import { IHttpClient } from './httpClient'

export interface ISDKConfig {
  appId: string
}

let authConfig: ISDKConfig = {
  appId: ''
}

export const getSDKConfig = () => authConfig

export const setSDKConfig = (config: ISDKConfig) => {
  return (authConfig = config)
}

type Constructor<IHttpClient> = new (...args: any[]) => IHttpClient

export interface SDK {
  config: Record<string, any>
  _httpClient: IHttpClient | null
  useHttp: (HttpClient: Constructor<IHttpClient>) => this
}
