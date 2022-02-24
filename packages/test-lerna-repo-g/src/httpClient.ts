

export type IHttpClient = Record<string, Function> | null

let httpClient: IHttpClient = {
  get () {}
}

export function getHttpClient () {
  return httpClient
}

export function setHttpClient (client: IHttpClient) {
  return (httpClient = client)
}
