import { repoA } from '@test-lerna-repo/test-lerna-repo-a'
import { sum } from './utils'
import { setAuthConfig, IAuthConfig, setHttpClient, IHttpClient } from '@test-lerna-repo/test-lerna-repo-g'

console.log('repoA name: ', repoA())

console.log(sum(1, 2))
console.log(sum('1', '2'))

export function repoB (): string {
	return 'this is repoB'
}

repoB.count = -1

let hasInitAuth = false

interface IAuthHooks {
	useHttp: (httpClient: IHttpClient) => IHttpClient
}

const authHooks: IAuthHooks = {
	useHttp (httpClient: IHttpClient) {
		return setHttpClient(httpClient)
	}
}

interface InitAuth {
	(authConfig: IAuthConfig): IAuthHooks
}

export const initAuth: InitAuth = (authConfig: IAuthConfig) => {
	if (hasInitAuth) {
		console.warn('Auth has be inited, do not initialize Auth repeatedly')
		return authHooks
	}

	hasInitAuth = true

	setAuthConfig(authConfig)
	
	return authHooks
}
