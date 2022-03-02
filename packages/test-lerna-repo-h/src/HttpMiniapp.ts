import { HttpMiniappBase } from './HttpMiniappBase'
import { MiniappFetch } from './MiniappFetch'
import { HttpMiniappConfig } from './types'

export class HttpMiniapp implements HttpMiniappBase {
  public httpClient: MiniappFetch

  constructor(config: HttpMiniappConfig) {
    this.httpClient = new MiniappFetch(config)
  }

  public request(config: WxMiniApp.WxRequestConfig) {
    return this.httpClient.request(config)
  }
}
