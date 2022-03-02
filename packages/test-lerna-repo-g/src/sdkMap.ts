import { SDK } from './sdkConfig'

const sdkMap = new Map()

let firstSDK: SDK

// 必须得先 init 一个 sdk
export function getSDK(sdk: SDK | undefined): SDK {
  return sdkMap.get(sdk || firstSDK)
}

export function addSDK(sdk: SDK): SDK {
  if (sdkMap.size === 0) {
    firstSDK = sdk
  }
  sdkMap.set(sdk, sdk)
  return sdk
}
