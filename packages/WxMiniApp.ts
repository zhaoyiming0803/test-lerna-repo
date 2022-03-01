namespace WxMiniApp {
  type IObject = Record<string, any>

  export type WxMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'

  export type WxDataType = 'json' | string

  export type WxResponseType = 'text' | 'arraybuffer'

  export interface WxResponseDataProfile {
    redirectStart: number
    redirectEnd: number
    fetchStart: number
    domainLookupStart: number
    domainLookupEnd: number
    connectStart: number
    connectEnd: number
    SSLconnectionStart: number
    SSLconnectionEnd: number
    requestStart: number
    requestEnd: number
    responseStart: number
    responseEnd: number
    rtt: number
    estimate_nettype: unknown | 'offline' | 'slow 2g' | '2g' | '3g' | '4g' | 'last/0' | 1 | 2 | 3 | 4 | 5 | 6
    httpRttEstimate: number
    transportRttEstimate: number
    downstreamThroughputKbpsEstimate: number
    throughputKbps: number
    peerIP: string
    port: number
    socketReused: boolean
    sendBytesCount: number
    receivedBytedCount: number
    protocol: 'http1.1' | 'h2' | 'quic' | unknown
  }

  export interface WxResponseData {
    data: IObject | string | ArrayBuffer
    statusCode: number
    header: IObject
    cookies: string[]
    profile: WxResponseDataProfile
  }

  export interface WxResponseError {
    errMsg: string
  }

  export interface WxRequestConfig {
    url: string
    data?: IObject
    header?: IObject
    timeout?: number
    method: WxMethod
    dataType?: WxDataType
    responseType?: WxResponseType
    enableHttp2?: boolean
    enableQuic?: boolean
    enableCache?: boolean
    enableHttpDNS?: boolean
    httpDNSServiceId?: string
    enableChunked?: boolean
    forceCellularNetwork?: boolean
    success?: (res: WxResponseData) => void
    fail?: (error: WxResponseError) => void
    complete?: (res: WxResponseData | WxResponseError) => void
  }

  export interface Wx {
    request(config: WxRequestConfig): void
  }
}