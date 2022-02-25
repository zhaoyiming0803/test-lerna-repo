import { initSDK } from '@test-lerna-repo/test-lerna-repo-b'
import { sdkFuncA, sdkFuncB } from '@test-lerna-repo/test-lerna-repo-c'
import { HttpWeb, HttpNode, HttpMiniapp } from '@test-lerna-repo/test-lerna-repo-h'

const sdk1 = initSDK({
  appId: 'hello sdk1'
})

const sdk2 = initSDK({
  appId: 'hello sdk2'
})

console.log('call sdkFuncA: ', sdkFuncA({
  a: 1
}, sdk2))

console.log('call sdkFuncB: ', sdkFuncB({
  a: 100
}))

console.log('-----------------------------------------------------------------')

sdk1.config.appId = 'change sdk1.config.appId'
sdk2.config = {
  appId: 'change sdk2.config'
}

console.log('sdk1.config: ', sdk1.config)
console.log('sdk2.config: ', sdk2.config)

console.log('-----------------------------------------------------------------')

console.log('HttpWeb: ', sdk1.useHttp(HttpWeb)._httpClient.request())
console.log('HttpNode: ', sdk1.useHttp(HttpNode)._httpClient.request())
console.log('HttpMiniapp: ', sdk2.useHttp(HttpMiniapp)._httpClient.request())

console.log('-----------------------------------------------------------------')

class Person1 {
  constructor (config) {
    this.sdk = initSDK(config)
  }

  func () {
    return sdkFuncA({
      a: 'a'
    }, this.sdk)
  }
}

class Person2 {
  constructor (config) {
    this.sdk = initSDK(config)
  }

  func () {
    return sdkFuncA({
      aa: 'aa'
    }, this.sdk)
  }
}

const p1 = new Person1({
  appId: 'p1'
})

const p2 = new Person2({
  appId: 'p2'
})

console.log('call p1.func: ', p1.func())
console.log('call p2.func: ', p2.func())
