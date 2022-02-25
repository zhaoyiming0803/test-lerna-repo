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

export interface SDK {
	config: Record<string, any>
	useHttp: (httpClient: IHttpClient) => IHttpClient
}