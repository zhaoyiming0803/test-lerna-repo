import { initAuth } from '@test-lerna-repo/test-lerna-repo-b'
import { getAuthConfigInRepoB } from '@test-lerna-repo/test-lerna-repo-c'
import { HttpWeb, HttpNode, HttpMiniapp } from '@test-lerna-repo/test-lerna-repo-h'

let auth = initAuth({
  appId: 'hello demo-repo-g'
})

console.log('call getAuthConfigInRepoB first: ', getAuthConfigInRepoB())

auth = initAuth({
  appId: 'hello demo-repo-g1111'
})

console.log('call getAuthConfigInRepoB second: ', getAuthConfigInRepoB())

console.log('-----------------------------------------------------------------')


