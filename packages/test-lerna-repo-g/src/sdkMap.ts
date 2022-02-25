import { SDK } from './sdkConfig'

const sdkMap = new Map()

let firstSDK: SDK | null = null

export const getSDK = (sdk: SDK) => sdkMap.get(sdk || firstSDK)

export const addSDK = (sdk: SDK) => {
	if (sdkMap.size === 0) {
		firstSDK = sdk
	}
	sdkMap.set(sdk, sdk)
}
