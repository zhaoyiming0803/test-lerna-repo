/*
Run Rollup in watch mode for development.

To specific the package to watch, simply pass its name and the desired build
formats to watch (defaults to "global"):

```
# name supports fuzzy match. will watch all packages with name containing "test-lerna-repo"
npm run dev test-lerna-repo

# specify the format to output, comma separated multiple parameters are not supported of `--targets`
# the default value of `--formats` is `global` by default
npm run build --targets=test-lerna-repo-a --formats cjs,global

*/

const execa = require('execa')
const { fuzzyMatchTarget, getArgsFromTerminal } = require('./utils')
const { targets, formats } = getArgsFromTerminal()
const target = targets.length && fuzzyMatchTarget(targets) || 'test-lerna-repo-a'

execa(
  'rollup',
  [
    '-wc',
    '--environment',
    [
      `TARGET:${target}`,
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
