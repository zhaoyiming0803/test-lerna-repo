import { repoA, crypto } from '@test-lerna-repo/test-lerna-repo-a'
import { sum, Test } from './utils'
import {
  ISDKConfig,
  IHttpClient,
  SDK,
  Constructor,
  sdkPool
} from '@test-lerna-repo/test-lerna-repo-g'

console.log('----------: ', crypto())

const test = new Test()

console.log(test.test1())

console.log('repoA name: ', repoA())

console.log(sum(1, 2))
console.log(sum('1', '2'))

export function repoB(): string {
  return 'this is repoB'
}

repoB.count = -1

function createSDK(config: ISDKConfig): SDK {
  const sdk: SDK = {
    get config() {
      return config
    },
    set config(v) {
      console.error('sdk.config cannot be replaced, Modify individual options instead.')
    },
    _httpClient: null,
    useHttp(HttpClient: Constructor<IHttpClient>): SDK {
      this._httpClient = new HttpClient({
        appId: ''
        // ... more config from sdk.config
      })
      return this
    }
  }
  return sdk
}

export function initSDK(config: ISDKConfig): SDK {
  return sdkPool.add(createSDK(config))
}
