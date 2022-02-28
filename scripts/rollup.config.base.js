import replace from '@rollup/plugin-replace'

export function createMinifiedConfig(format, outputConfigs, createConfig) {
  const { terser } = require('rollup-plugin-terser')
  return createConfig(
    format,
    {
      file: outputConfigs[format].file.replace(/\.js$/, '.min.js'),
      format: outputConfigs[format].format
    },
    [
      terser({
        module: /^esm/.test(format),
        compress: {
          ecma: 2015,
          pure_getters: true
        },
        format: {
          comments: false
        },
        safari10: true
      })
    ]
  )
}

export function createReplacePlugin(isDev) {
  const replacements = {
    __DEV__: !!isDev
  }
  return replace({
    values: replacements,
    preventAssignment: true
  })
}