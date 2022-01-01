class RepoA<T, G> {
  private repoName: string = '@test-lerna-repo/test-lerna-repo-a'
  private a: number
  private b: number
  private c: boolean

  constructor (a: number, b: number, c: boolean) {
    this.a = a
    this.b = b
    this.c = c
  }

  getRepoName (): string {
    return this.repoName
  }

  getA () {
    return this.a
  }

  getB () {
    return this.b
  }

  getC () {
    return this.c
  }
}

module.exports = {
  RepoA
}
