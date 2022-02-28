/*
Run Rollup in watch mode for development.

To specific the package to watch, simply pass its name and the desired build
formats to watch (defaults to "global"):

```
# name supports fuzzy match. will watch all packages with name containing "test-lerna-repo"
npm run dev:lib test-lerna-repo

# specify the format to output, comma separated multiple parameters are not supported of `--targets`
# the default value of `--formats` is `global` by default
npm run dev:lib --targets=test-lerna-repo-h --formats=cjs

*/

const path = require('path')
const execa = require('execa')
const async = require('async')
const { fuzzyMatchTarget, getArgsFromTerminal } = require('./utils')
const { targets, formats } = getArgsFromTerminal()
const target = targets.length && fuzzyMatchTarget(targets, false, 'lib') || 'test-lerna-repo-h'

readyGo()

function readyGo () {
  const libs = require(path.resolve(__dirname, '../', `packages/${target}/package.json`)).buildOptions.libs
  const tasks = libs.map(lib => () => runParallel(require('os').cpus().length, targets, build, lib))
  async.parallel(tasks)
}

async function runParallel(maxConcurrency, source, iteratorFn, lib) {
  const ret = []
  const executing = []
  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(lib, item))
    ret.push(p)

    if (maxConcurrency <= source.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= maxConcurrency) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}

function build (lib, target) {
  execa(
    'rollup',
    [
      '--config',
      'scripts/rollup.config.lib.js',
      '-w',
      '--environment',
      [
        `TARGET:${target}`,
        `LIB:${lib}`,
        `FORMATS:${formats.join('+') || 'global'}`,
        'SOURCE_MAP:true'
      ]
        .filter(Boolean)
        .join(',')
    ],
    {
      stdio: 'inherit'
    }
  )
}

