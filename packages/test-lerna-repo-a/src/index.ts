function decorateClass (Ctor) {
  Object.seal(Ctor)
  Object.seal(Ctor.prototype)
}

@decorateClass
class RepoClass {
  private message: string = ''
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
export function repoA (message: string = 'this is repoA') {
  repoA.count++
  return new RepoClass(message).getMessage()
}

repoA.count = -1
