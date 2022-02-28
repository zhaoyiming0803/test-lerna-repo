const fs = require('fs')
const chalk = require('chalk')

const normalTargets = (exports.normalTargets = fs.readdirSync('packages').filter(f => {
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false
  }
  const pkg = require(`../packages/${f}/package.json`)
  if (pkg.private || !pkg.buildOptions || pkg.buildOptions.type !== 'normal') {
    return false
  }

  return true
}))

const libTargets = (exports.libTargets = fs.readdirSync('packages').filter(f => {
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false
  }
  const pkg = require(`../packages/${f}/package.json`)
  if (pkg.private || !pkg.buildOptions || pkg.buildOptions.type !== 'lib') {
    return false
  }

  return true
}))

exports.fuzzyMatchTarget = (partialTargets, includeAllMatching = false, buildType = 'normal') => {
  const matched = []
  const targets = buildType === 'normal'
    ? normalTargets
    : libTargets
  partialTargets.forEach(partialTarget => {
    for (const target of targets) {
      if (target.match(partialTarget)) {
        matched.push(target)
        if (!includeAllMatching) {
          break
        }
      }
    }
  })
  if (matched.length) {
    return matched
  } else {
    console.log()
    console.error(
      `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
        `Target ${chalk.underline(partialTargets)} not found!`
      )}`
    )
    console.log()

    process.exit(1)
  }
}

exports.getArgsFromTerminal = () => {
  const argList = ['targets', 'formats', 'packagename']
  const { env } = process

  return argList.reduce((args, arg) => {
    const key = `npm_config_${arg}`
    const value = env[key]
    args[arg] = value && value.split(',') || []
    return args
  }, {})
}
