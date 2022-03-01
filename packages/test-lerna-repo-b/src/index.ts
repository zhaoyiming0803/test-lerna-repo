import { repoA } from '@test-lerna-repo/test-lerna-repo-a'
import { sum } from './utils'
import { ISDKConfig, IHttpClient, SDK, Constructor } from '@test-lerna-repo/test-lerna-repo-g'

console.log('repoA name: ', repoA())

console.log(sum(1, 2))
console.log(sum('1', '2'))

export function repoB (): string {
	return 'this is repoB'
}

repoB.count = -1
class SDKPool {
	static instance: SDKPool

	static firstSDk: SDK

	private cachedMap: Map<SDK, SDK> = new Map()

	constructor () {
		if (!SDKPool.instance) {
			SDKPool.instance = this
		}
		return SDKPool.instance
	}

	public add (sdk: SDK): SDK {
		if (!SDKPool.firstSDk) {
			SDKPool.firstSDk = sdk
		}

		this.cachedMap.set(sdk, sdk)

		return sdk
	}

	public get (sdk: SDK | undefined): SDK {
		const finalSDK: SDK = sdk || SDKPool.firstSDk
		// only be used by internal, so make sure the finalsdk is valid
		// call `add` before `get`
		return this.cachedMap.get(finalSDK) as SDK
	}
}

// only be used in initSDK
const sdkPool = new SDKPool()

function createSDK (config: ISDKConfig): SDK {
	const sdk: SDK = {
		get config () {
			return config
		},
		set config (v) {
			console.error('sdk.config cannot be replaced, Modify individual options instead.')
		},
		_httpClient: null,
		useHttp (HttpClient: Constructor<IHttpClient>): SDK {
			this._httpClient = new HttpClient({})
			return this
		}
	}
	return sdk
}

export function initSDK (config: ISDKConfig): SDK {
	return sdkPool.add(createSDK(config))
}
