import { HttpBase } from '@test-lerna-repo/test-lerna-repo-h'

interface SDK {
	useHttp: (httpClient: IHttpClient) => IHttpClient
}

export type IHttpClient = HttpBase

let httpClient: IHttpClient

export function getHttpClient () {
  return httpClient
}

export function setHttpClient (sdk: SDK, client: IHttpClient) {
  return (httpClient = client)
}
