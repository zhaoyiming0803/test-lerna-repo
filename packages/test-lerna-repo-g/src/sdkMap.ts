const sdkMap = new Map()

let firstSDK = null

export const getSDK = (sdk) => sdkMap.get(sdk) || sdkMap.get(firstSDK)

export const addSDK = (sdk) => {
	if (sdkMap.size === 0) {
		firstSDK = sdk
	}
	sdkMap.set(sdk, sdk)
}
