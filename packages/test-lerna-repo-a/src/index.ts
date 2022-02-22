import { A } from './class'
// import { social1, social2 } from './social'

new A().a1()

// 使用 decorator，如果 rollup 的 external 配置不加 tslib，打包产物中（包括 sourcemap）会强行带上微软的 Copyright 注释
// https://stackoverflow.com/questions/52849894/how-to-handle-copyright-notice-in-javascript-bundle

// function decorateClass (Ctor) {
// 	Object.seal(Ctor)
// 	Object.seal(Ctor.prototype)
// }

// @decorateClass
class RepoClass {
	private message = ''
	// public social: Record<string, any> = {}
	public testClass: Record<string, any> = {}
	constructor (message: string) {
		this.message = message
		// this.social = {
		// 	social1,
		// 	social2
		// }
		this.testClass = new A()
	}
	async getMessage() {
		const Async = await import('./async')
		return this.message + '-' +new Async.default('this is async').message
	}
}

// new RepoClass('init social').social.social1()

/**
 * 你好
 * @returns 
 */
// hello
export function repoA (message = 'this is repoA') {
	repoA.count++
	return new RepoClass(message).getMessage()
}

repoA.count = -1

repoA().then(res => {
	console.log('run repoA in test-lerna-repo-a: ', res)
})

export function $repoA () {
	return 'this is $repoA'
}
