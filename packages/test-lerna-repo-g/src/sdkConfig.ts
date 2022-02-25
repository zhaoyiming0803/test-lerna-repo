import { IHttpClient } from './httpClient'

export interface ISDKConfig {
  appId: string
}

let authConfig:ISDKConfig = {
	appId: ''
}

export const getAuthConfig = () => authConfig

export const setAuthConfig = (config: ISDKConfig) => {
	return (authConfig = config)
}

type Constructor<IHttpClient> = new (...args: any[]) => IHttpClient

export interface SDK {
	config: Record<string, any>
	_httpClient: IHttpClient | null
	useHttp: (HttpClient: Constructor<IHttpClient>) => SDK
}