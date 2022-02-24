import { HttpBase } from '@test-lerna-repo/test-lerna-repo-h'

export type IHttpClient = HttpBase

let httpClient: IHttpClient

export function getHttpClient () {
  return httpClient
}

export function setHttpClient (client: IHttpClient) {
  return (httpClient = client)
}
