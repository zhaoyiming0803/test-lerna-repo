import { HttpNode, HttpWeb, HttpMiniapp, HttpConfig } from '@test-lerna-repo/test-lerna-repo-h'

export type Constructor<T> = new (...args: HttpConfig[]) => T

export type IHttpClient = HttpNode | HttpWeb | HttpMiniapp

let httpClient: IHttpClient

export function getHttpClient() {
  return httpClient
}

export function setHttpClient(HttpClient: Constructor<IHttpClient>): IHttpClient {
  return (httpClient = new HttpClient({
    appId: ''
  }))
}
