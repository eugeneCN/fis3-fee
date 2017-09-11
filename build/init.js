/**
 * @desc    写入dev配置
 * @author  zhangWuQiang
 * @date    2017年09月10日
 */
const fs = require('fs')
const del = require('del')
const path = require('path')
const chalk = require('chalk')
const name = require('../package.json').name
const description = require('../package.json').description
const development = process.env.dev

// logs

console.log(chalk.blue.bold(`
  ${chalk['red'].bold('┏ FIS3-FEE --------------------------------')}
    appName: ${chalk.yellow(name)}
    development: ${chalk.yellow(development)}
    description: ${chalk.yellow(description)}
  ${chalk['red'].bold('┗ -----------------------------------------')}
`))

function start() {
  del.sync(['modules/js/config.js'])
  var file = path.join(__dirname, '../modules/js/config.js');
  var config = `
/**
 * @desc    目的为了打包后删除控制台log、api地址配置。
 * @author  zhangWuQiang
 * @date    2017年09月10日
 */
module.exports = { dev: ${development}, logs: ${development} };
`;
  fs.writeFile(file, config, function (err) {
    if (err) {
      throw err
    } else {
      console.log(`\n${chalk.bgGreen.white(' DONE ') + ' '}${chalk.green(' writeFile ' + chalk.yellow(file) + ' success ') + ' '}\n`)
    }
  })
}

if (process.env.del) {
  del.sync(['output'])
  console.log(`\n${chalk.bgGreen.white(' DONE ') + ' '}${chalk.green(' clear `output` success ') + ' '}\n`)
  process.exit()
}

start();
