import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import rollupTypescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'

function createConfig () {
  const formatList = ['cjs', 'es', 'iife', 'amd', 'umd']
  return formatList.map(format => {
    return {
      input: './src/index.ts',
      output: {
        file: `dist/bundle-${format}.js`,
        format,
        name: 'repoF' // 导出 umd 格式必传
      },
      plugins: [
        nodeResolve(),
        commonjs(),
        rollupTypescript(),
        babel({ babelHelpers: 'bundled' })
      ]
    }
  })
}

export default createConfig()
