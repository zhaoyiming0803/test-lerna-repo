import { repoA } from '@test-lerna-repo/test-lerna-repo-a'
import { sum } from './utils'
import { setAuthConfig, IAuthConfig } from '@test-lerna-repo/test-lerna-repo-g'

console.log('repoA name: ', repoA())

console.log(sum(1, 2))
console.log(sum('1', '2'))

export function repoB (): string {
	return 'this is repoB'
}

repoB.count = -1

export function initAuth (authConfig: IAuthConfig) {
	setAuthConfig(authConfig)
}
