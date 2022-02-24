import { repoA } from '@test-lerna-repo/test-lerna-repo-a'
import { sum } from './utils'
import { IAuthConfig, setHttpClient, IHttpClient, addSDK } from '@test-lerna-repo/test-lerna-repo-g'

console.log('repoA name: ', repoA())

console.log(sum(1, 2))
console.log(sum('1', '2'))

export function repoB (): string {
	return 'this is repoB'
}

repoB.count = -1
interface SDK {
	config: Record<string, any>
	useHttp: (httpClient: IHttpClient) => IHttpClient
}

interface InitSDK {
	(authConfig: IAuthConfig): SDK
}

export const initSDK: InitSDK = (authConfig: IAuthConfig) => {
	const sdk: SDK = {
		config: authConfig,
		useHttp (httpClient: IHttpClient) {
			return setHttpClient(sdk, httpClient)
		}
	}

	addSDK(sdk)

	return sdk
}
