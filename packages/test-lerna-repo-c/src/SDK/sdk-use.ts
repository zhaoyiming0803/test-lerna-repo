// sdk use 版，function 用 use 似乎太【重】了

export const useSDK = (options) => {
	return {
		usePackage: pack => pack(options),
		useHttp: http => http(options),
		// useXXX
	}
}

export function funcAInUse (options) {
	return function (baseOptions) {
		// ... sdk 自己的逻辑
		return {
			name: 'this is funcA in sdk-use',
			options,
			baseOptions
		}
	}
}

export function funcBInUse (options) {
	return function (baseOptions) {
		// ... sdk 自己的逻辑
	}
}

// const options = {
// 	appId: ''
// }
// const sdk = useSDK(options)

// // 现在的写法是 sdk.social.funcA(...)
// // funcA 函数在多个子类中都有，是重名的，如果用 function，需要保证函数名的唯一性
// sdk.usePackage(funcAInUse('protocol'))

// sdk.usePackage(funcBInUse('userName'))
