import { repoB } from '@test-lerna-repo/test-lerna-repo-b'

export function repoC () {
  console.log('run in repoc: ', repoB())
}
