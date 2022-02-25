import { repoB } from '@test-lerna-repo/test-lerna-repo-b'
import { initSDK, funcA } from './SDK'
import { sdkAdaptor } from './SDK/sdk-adaptor'
import { useSDK, funcAInUse } from './SDK/sdk-use'
import { getAuthConfig, getSDK } from '@test-lerna-repo/test-lerna-repo-g'

export function repoC () {
	console.log('run in repoc: ', repoB())
}

export const getAuthConfigInRepoB = () => getAuthConfig()

export const sdkFuncA = (options: unknown, sdk) => {
	return {
		options,
		configInsdkInstance: getSDK(sdk).config
	}
}

export const sdkFuncB = (options: unknown, sdk) => {
	return {
		options,
		configInsdkInstance: getSDK(sdk).config
	}
}

repoC.count = -1

console.log('-----------------------------------------------------')

initSDK({
	appId: 'this is appId'
})

console.log('run funcA in SDK: ', funcA('this is funcA in SDK'))

console.log('-----------------------------------------------------')

sdkAdaptor.config({
	appId: 'this is sdkAdaptor'
})

sdkAdaptor.adaptPlatform({
	funcA () {
		return 'this is funcA in adaptPlatform, ' + 'appId = ' + sdkAdaptor.options.appId
	}
})

console.log('run sdkAdaptor.funcA: ', sdkAdaptor.funcA())

console.log('-----------------------------------------------------')

const sdkInUse = useSDK({
	appId: 'this is appId in useSDK'
})

console.log(sdkInUse.usePackage(funcAInUse('this is funcAInUse')))
