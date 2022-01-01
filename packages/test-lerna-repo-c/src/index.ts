const { repoB } = require('@test-lerna-repo/test-lerna-repo-b')

module.exports = function repoC () {
  console.log('run in repoc: ', repoB())
}