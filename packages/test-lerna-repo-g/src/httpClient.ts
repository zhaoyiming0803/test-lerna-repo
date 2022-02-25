import { HttpNode, HttpWeb, HttpMiniapp } from '@test-lerna-repo/test-lerna-repo-h'

export type Constructor<T> = new (...args: any[]) => T

export type IHttpClient = HttpNode | HttpWeb | HttpMiniapp

let httpClient: IHttpClient

export function getHttpClient () {
	return httpClient
}

export function setHttpClient (HttpClient: Constructor<IHttpClient>): IHttpClient {
	return (httpClient = new HttpClient({}))
}
