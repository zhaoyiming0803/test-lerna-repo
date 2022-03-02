export interface HttpMiniappConfig {
  appId: string
  // ... more
}

export interface HttpNormalConfig {
  appId: string
  // ... more
}

export type HttpConfig = HttpMiniappConfig | HttpNormalConfig

export interface ResponseData {
  code: number
  data?: any
  // ... more
}
