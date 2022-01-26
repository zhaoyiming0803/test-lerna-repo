const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const chalk = require('chalk')
const { targets } = require('./utils')

const sourceMap = true

readyGo()

async function readyGo() {
  await buildAll(targets)
}

async function buildAll(targets) {
  await runParallel(require('os').cpus().length, targets, build)
}

async function runParallel(maxConcurrency, source, iteratorFn) {
  const ret = []
  const executing = []
  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item, source))
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

async function build (target) {
  const pkgDir = path.resolve(`packages/${target}`)
  const pkg = require(`${pkgDir}/package.json`)

  if (pkg.private) {
    return
  }

  await execa(
    'rollup',
    [
      '-c',
      '--environment',
      [
        `TARGET:${target}`,
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

    await fs.remove(`${pkgDir}/dist/packages`)
  }
}


// shell.exec('rollup --config rollup.config.js --configPlugin typescript')