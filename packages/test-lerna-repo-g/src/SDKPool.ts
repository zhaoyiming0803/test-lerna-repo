import { SDK } from './sdkConfig'

class SDKPool {
  static instance: SDKPool

  static firstSDk: SDK

  private cachedMap: Map<SDK, SDK> = new Map()

  constructor() {
    if (!SDKPool.instance) {
      SDKPool.instance = this
    }
    return SDKPool.instance
  }

  public add(sdk: SDK): SDK {
    if (!SDKPool.firstSDk) {
      SDKPool.firstSDk = sdk
    }

    this.cachedMap.set(sdk, sdk)

    return sdk
  }

  public get(sdk: SDK | undefined): SDK {
    const finalSDK: SDK = sdk || SDKPool.firstSDk
    // only be used by internal, so make sure the finalsdk is valid
    // call `add` before `get`
    return this.cachedMap.get(finalSDK) as SDK
  }
}

// only be used in initSDK
export const sdkPool = new SDKPool()
