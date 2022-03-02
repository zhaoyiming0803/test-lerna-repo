import { HttpMiniappConfig, MiniappFetch, ResponseData } from '.'

export abstract class HttpMiniappBase {
  public httpClient: MiniappFetch

  constructor(config: HttpMiniappConfig) {
    this.httpClient = new MiniappFetch(config)
  }

  public request(config: WxMiniApp.WxRequestConfig): Promise<ResponseData> {
    return this.httpClient.request(config)
  }

  // get () {
  // 	return 'get in HttpMiniapp'
  // }

  // post () {
  // 	return 'post in HttpMiniapp'
  // }

  // delete () {
  // 	return 'delete in HttpMiniapp'
  // }

  // patch () {
  // 	return 'patch in HttpMiniapp'
  // }

  // put () {
  // 	return 'put in HttpMiniapp'
  // }
}
