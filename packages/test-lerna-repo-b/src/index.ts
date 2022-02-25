import { repoA } from '@test-lerna-repo/test-lerna-repo-a'
import { sum } from './utils'
import { ISDKConfig, setHttpClient, IHttpClient, addSDK, SDK } from '@test-lerna-repo/test-lerna-repo-g'

console.log('repoA name: ', repoA())

console.log(sum(1, 2))
console.log(sum('1', '2'))

export function repoB (): string {
	return 'this is repoB'
}

repoB.count = -1


interface InitSDK {
	(authConfig: ISDKConfig): SDK
}

export const initSDK: InitSDK = (config: ISDKConfig) => {
	const sdk: SDK = {
		get config () {
			return config
		},
		set config (v) {
			console.error(`sdk.config cannot be replaced, Modify individual options instead.`)
		},
		useHttp (httpClient: IHttpClient) {
			return setHttpClient(sdk, httpClient)
		}
	}

	addSDK(sdk)

	return sdk
}
