// adaptor 版

interface Options {
  appId: string
}

interface MySDK {
  options: Options
  config: (options: Options) => void
  adaptPlatform: (adaptor: Record<string, Function>) => void
  subObj1: Record<string, Function>
  subObj2: Record<string, Function>
  [key: string]: any
}

export const sdkAdaptor: MySDK = {
  options: {
    appId: ''
  },

  config(options) {
    // ... 相当于 class constructor 中初始化参数
    this.options = Object.assign({}, this.options, options)
  },

  // 具体某个平台的适配放这里，作为一个适配器
  // 结合条件编译 build 不同场景的产物
  adaptPlatform(adaptor: Record<string, any>) {
    Object.keys(adaptor).forEach(prop => {
      if (!this[prop]) {
        this[prop] = adaptor[prop]
      } else {
        console.log(`${prop} has existed in SDK`)
      }
    })
  },

  // 所有平台都能运行的公共代码
  subObj1: {},
  subObj2: {}
}
