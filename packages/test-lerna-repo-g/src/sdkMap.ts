import { SDK } from './sdkConfig'

const sdkMap = new Map()

let firstSDK: SDK

// 必须得先 init 一个 sdk
export const getSDK = (sdk: SDK): SDK => sdkMap.get(sdk || firstSDK)

export const addSDK = (sdk: SDK) => {
	if (sdkMap.size === 0) {
		firstSDK = sdk
	}
	sdkMap.set(sdk, sdk)
}
