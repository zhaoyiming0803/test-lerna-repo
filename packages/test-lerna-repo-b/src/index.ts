import { repoA } from '@test-lerna-repo/test-lerna-repo-a'
import { sum } from './utils'
import { ISDKConfig, IHttpClient, addSDK, SDK, Constructor } from '@test-lerna-repo/test-lerna-repo-g'

console.log('repoA name: ', repoA())

console.log(sum(1, 2))
console.log(sum('1', '2'))

export function repoB (): string {
	return 'this is repoB'
}

repoB.count = -1

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
	return addSDK(createSDK(config))
}
