class RepoA<T, G> {
  private repoName: string = '@test-lerna-repo/test-lerna-repo-a'
  public a: number
  public b: number
  public c: boolean

  constructor (a: number, b: number, c: boolean) {
    this.a = a
    this.b = b
    this.c = c
  }

  getRepoName (): string {
    return this.repoName
  }
}

module.exports = {
  RepoA
}
