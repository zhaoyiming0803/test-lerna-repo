// function, tree-shaking completely 版
interface SDKConfig {
	appId: string
}

const sdkConfig: SDKConfig = {
  appId: ''
}
interface InitSDK<T> {
	(options: T): T
}

// 等同于 wx.config
export const initSDK: InitSDK<SDKConfig> = (config: SDKConfig) => {
  return Object.assign(sdkConfig, config)
}

// 以下功能等同于 wx.xxx 的功能调用，同时做到极致的 tree-shaking 效果
export const funcA = (message: string) => {
  const _message = message + ', and appId is ' + sdkConfig.appId
  console.log('__DEV__: ', __DEV__)
  if (__DEV__) {
    return _message + '!!!!!'
  }
  return message
}

export const funcB = () => {
  return 'funcB in SDK'
}

export const funcC = () => {
  return 'funcC in SDK'
}
