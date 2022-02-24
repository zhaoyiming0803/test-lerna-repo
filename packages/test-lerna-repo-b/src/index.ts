import { repoA } from '@test-lerna-repo/test-lerna-repo-a'
import { sum } from './utils'
import { setAuthConfig, getAuthConfig, IAuthConfig } from '@test-lerna-repo/test-lerna-repo-g'

console.log('repoA name: ', repoA())

console.log(sum(1, 2))
console.log(sum('1', '2'))

export function repoB (): string {
	return 'this is repoB'
}

repoB.count = -1

let hasInitAuth = false

export function initAuth (authConfig: IAuthConfig) {
	if (!hasInitAuth) {
		hasInitAuth = true
		return setAuthConfig(authConfig)
	}

	console.warn('Auth has be inited, do not initialize Auth repeatedly')

	return getAuthConfig()
}
