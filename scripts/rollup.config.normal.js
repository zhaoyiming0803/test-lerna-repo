import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import replace from '@rollup/plugin-replace'
import ts from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'

const path = require('path')
const packagesDir = path.resolve(__dirname, '../', 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const packageOptions = pkg.buildOptions || {}
const name = packageOptions.filename || path.basename(packageDir)

const isDev = true
let hasTSChecked = false

const outputConfigs = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: `es`
  },
  'esm-browser': {
    file: resolve(`dist/${name}.esm-browser.js`),
    format: `es`
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: `cjs`
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: `iife`
  },
  amd: {
    file: resolve(`dist/${name}.amd.js`),
    format: `amd`
  },
  umd: {
    file: resolve(`dist/${name}.umd.js`),
    format: `umd`
  }
}

const defaultFormats = ['esm-bundler', 'cjs']
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split('+')
const packageFormats = inlineFormats || packageOptions.formats || defaultFormats
const packageConfigs = packageFormats.map(format => createConfig(format, outputConfigs[format]))

packageFormats.forEach(format => {
  if (/^(global|esm-browser)/.test(format)) {
    packageConfigs.push(createMinifiedConfig(format))
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
    output.name = packageOptions.name
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

  const entryFile = 'src/index.ts'

  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]

  const config = {
    input: resolve(entryFile),
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

function createMinifiedConfig(format) {
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

function createReplacePlugin(isDev) {
  const replacements = {
    __DEV__: !!isDev
  }
  return replace({
    values: replacements,
    preventAssignment: true
  })
}
