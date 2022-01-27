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
export function repoA () {
  return new RepoClass('this is repoA').getMessage()
}

repoA.count = -1
