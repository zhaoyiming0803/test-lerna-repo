/*
Produces production builds and stitches together d.ts files.

To specify the package to build, simply pass its name and the desired build
formats to output (defaults to `buildOptions.formats` specified in that package,
or "esm,cjs"):

```
# name supports fuzzy match. will build all packages with name containing "test-lerna-repo":
npm run build:lib test-lerna-repo

# specify the format to output
npm run build:lib --targets=test-lerna-repo-a,test-lerna-repo-h --formats cjs,global
```
*/

const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const chalk = require('chalk')
const async = require('async')
const { libTargets, fuzzyMatchTarget, getArgsFromTerminal } = require('./utils')

const { targets, formats } = getArgsFromTerminal()

const sourceMap = true

readyGo()

async function readyGo() {
  if (!targets.length) {
    buildAll(libTargets)
  } else {
    buildAll(fuzzyMatchTarget(targets, true))
  }
}

function buildAll(targets) {
  const path = require('path')
  const packagesDir = path.resolve(__dirname, '../', 'packages')
  const libPackagesDir = targets.map(target => path.resolve(packagesDir, target))
  libPackagesDir.forEach(libPackage => {
    const libs = require(libPackage + '/package.json').buildOptions.libs
    const tasks = libs.map(lib => () => runParallel(require('os').cpus().length, targets, build, lib))
    async.parallel(tasks)
  })
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

async function build (lib, target) {
  const pkgDir = path.resolve(`packages/${target}`)
  const pkg = require(`${pkgDir}/package.json`)

  if (pkg.private || pkg.buildOptions.type !== 'lib') {
    return
  }
  
  await fs.remove(`${pkgDir}/lib`)

  await execa(
    'rollup',
    [
      '--config',
      'scripts/rollup.config.lib.js',
      '--environment',
      [
        `TARGET:${target}`,
        `LIB:${lib}`,
        // npm 模式下，逗号分割 formats 后，在process.env 中读取有丢失，只能传过去第一个
        formats ? `FORMATS:${formats.join('+')}` : ``,
        sourceMap ? `SOURCE_MAP:true` : ``,
        'TYPES:true'
      ]
        .filter(Boolean)
        .join(',')
    ],
    { stdio: 'inherit' }
  )

  if (pkg.types) {
    console.log()
    console.log(
      chalk.bold(chalk.yellow(`Rolling up type definitions for ${target}...`))
    )

    // build types
    const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor')

    const extractorConfigPath = path.resolve(pkgDir, `api-extractor.json`)
    const extractorConfig =
      ExtractorConfig.loadFileAndPrepare(extractorConfigPath)
    const extractorResult = Extractor.invoke(extractorConfig, {
      localBuild: true,
      showVerboseMessages: true
    })

    if (extractorResult.succeeded) {
      // concat additional d.ts to rolled-up dts
      const typesDir = path.resolve(pkgDir, 'types')
      if (await fs.exists(typesDir)) {
        const dtsPath = path.resolve(pkgDir, pkg.types)
        const existing = await fs.readFile(dtsPath, 'utf-8')
        const typeFiles = await fs.readdir(typesDir)
        const toAdd = await Promise.all(
          typeFiles.map(file => {
            return fs.readFile(path.resolve(typesDir, file), 'utf-8')
          })
        )
        await fs.writeFile(dtsPath, existing + '\n' + toAdd.join('\n'))
      }
      console.log(
        chalk.bold(chalk.green(`API Extractor completed successfully.`))
      )
    } else {
      console.error(
        `API Extractor completed with ${extractorResult.errorCount} errors` +
          ` and ${extractorResult.warningCount} warnings`
      )
      process.exitCode = 1
    }

    await fs.remove(`${pkgDir}/lib/packages`)
    await fs.remove(`lib`)
  }
}
