const { RepoA } = require('@test-lerna-repo/test-lerna-repo-a')
const repoA = new RepoA(1, 2, true)
console.log('repoA name: ', repoA.getRepoName())

const { sum } = require('./utils')
console.log(sum(1, 2))
console.log(sum('1', '2'))

exports.repoB = function repoB (): string {
  return 'this is repoB'
}