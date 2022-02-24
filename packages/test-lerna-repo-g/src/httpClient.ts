export type IHttpClient = Record<string, any> | null

let httpClient: IHttpClient = {}

export function getHttpClient () {
  return httpClient
}

export function setHttpClient (client: IHttpClient) {
  httpClient = client
}
