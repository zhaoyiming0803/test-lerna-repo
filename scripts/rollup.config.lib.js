import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import ts from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import { createMinifiedConfig, createReplacePlugin } from './rollup.config.base'

const path = require('path')
const packagesDir = path.resolve(__dirname, '../', 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const packageOptions = pkg.buildOptions || {}
const libName = process.env.LIB

const isDev =  true
let hasTSChecked = false

const outputConfigs = {
  'esm-bundler': {
    file: resolve(`lib/${libName}.esm-bundler.js`),
    format: `es`
  },
  'esm-browser': {
    file: resolve(`lib/${libName}.esm-browser.js`),
    format: `es`
  },
  cjs: {
    file: resolve(`lib/${libName}.cjs.js`),
    format: `cjs`
  },
  global: {
    file: resolve(`lib/${libName}.global.js`),
    format: `iife`
  },
  amd: {
    file: resolve(`lib/${libName}.amd.js`),
    format: `amd`
  },
  umd: {
    file: resolve(`lib/${libName}.umd.js`),
    format: `umd`
  }
}

const defaultFormats = ['esm-bundler', 'cjs']
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split('+')
const packageFormats = inlineFormats || packageOptions.formats || defaultFormats
const packageConfigs = packageFormats.map(format => createConfig(format, outputConfigs[format]))

packageFormats.forEach(format => {
  if (/^(global|esm-browser)/.test(format)) {
    packageConfigs.push(createMinifiedConfig(format, outputConfigs, createConfig))
  }
})

export default packageConfigs

function createConfig(format, output, plugins = []) {
  if (!output) {
    console.log(require('chalk').yellow(`invalid format: "${format}"`))
    process.exit(1)
  }

  const isBundlerESMBuild = /esm-bundler/i.test(format)
  const isUmdBuild = /umd/i.test(format)
  const isNodeBuild = format === 'cjs'
  const isGlobalBuild = /global/i.test(format)

  output.exports = 'named'
  output.sourcemap = !!process.env.SOURCE_MAP
  output.externalLiveBindings = false
  output.inlineDynamicImports = true

  if (isGlobalBuild || isUmdBuild) {
    output.name = libName
  }

  const shouldEmitDeclarations = pkg.types && process.env.TYPES != null && !hasTSChecked

  const tsPlugin = ts({
    tsconfig: path.resolve(__dirname, '../', 'tsconfig.json'),
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: output.sourcemap,
        declaration: shouldEmitDeclarations,
        declarationMap: shouldEmitDeclarations
      }
    }
  })

  hasTSChecked = true

  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]
  const config = {
    input: resolve(`${packageDir}/src/${libName}.ts`),
    output,
    plugins: [
      json({
        namedExports: false
      }),
      nodeResolve(),
      nodePolyfills(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      tsPlugin,
      ...plugins,
      createReplacePlugin(isDev)
    ],
    external,
    treeshake: {
      moduleSideEffects: false
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }

  return config
}
