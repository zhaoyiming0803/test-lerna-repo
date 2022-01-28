// 使用 decorator，如果 rollup 的 external 配置不加 tslib，打包产物中（包括 sourcemap）会强行带上微软的 Copyright 注释
// https://stackoverflow.com/questions/52849894/how-to-handle-copyright-notice-in-javascript-bundle

// function decorateClass (Ctor) {
// 	Object.seal(Ctor)
// 	Object.seal(Ctor.prototype)
// }

// @decorateClass
class RepoClass {
	private message = ''
	constructor (message: string) {
		this.message = message
	}
	getMessage() {
		return this.message
	}
}
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
