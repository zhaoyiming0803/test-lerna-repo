export interface HttpMiniappConfig {
	appId: string
}

export interface HttpNormalConfig {
	appId: string
}

export type HttpConfig = HttpMiniappConfig | HttpNormalConfig

export interface ResponseData {
  code: number
  data?: any
	// ... more
}
