const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const copyList = [
  {
    from: path.resolve(__dirname, './node_modules/@tweenjs/tween.js/src/Tween.js'),
    to: 'assets/js/'
  },
]

const baseDir = path.resolve(__dirname, './')
const spinner = ora(`initilize copy, total ${copyList.length} files...\n`)
spinner.start()

copyList.forEach((item) => {

  let {from, to} = item
  let name = path.basename(from)
  to = path.resolve(baseDir, `./${to}/${name}`)

  try {
    fs.copySync(from, to)
    console.log(chalk.green(`    ${from}`))
  } catch (err) {
    throw err
  }

})
console.log(chalk.cyan('  Init complete.\n'))
spinner.stop()
console.log('')
