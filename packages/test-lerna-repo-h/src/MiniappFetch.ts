import { HttpMiniappConfig, ResponseData } from './types'

function getEnv () {
  // wx | my | qq | tt | qa | jd | dd
  return wx
}

export class MiniappFetch {
  private context: WxMiniApp.Wx
  private config: HttpMiniappConfig

  constructor (config: HttpMiniappConfig) {
    this.context = getEnv()
    this.config = config
  }

  public request (config: WxMiniApp.WxRequestConfig): Promise<ResponseData> {
    return new Promise((resolve, reject) => {
      this.context.request({
        ...config,
        data: {
          ...config.data,
          ...this.config
        },
        header: {
          ...this.config
        },
        success: res => {
          // 按需包装
          const _res: ResponseData = {
            code: res.statusCode,
            data: res.data
          }
          resolve(_res)
        },
        fail: error => reject(error)
      })
    })
  }
}
