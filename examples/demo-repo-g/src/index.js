import { initAuth } from '@test-lerna-repo/test-lerna-repo-b'
import { getAuthConfigInRepoB } from '@test-lerna-repo/test-lerna-repo-c'

initAuth({
  appId: 'hello demo-repo-g'
})

console.log('call getAuthConfigInRepoB: ', getAuthConfigInRepoB())
