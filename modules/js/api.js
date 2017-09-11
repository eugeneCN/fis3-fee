/**
 * @desc    api地址
 * @author  zhangWuQiang
 * @date    2017年09月10日
 */

var { dev } = require('./config.js');
console.log('开发环境为true,生产环境为false,当前环境', dev);
module.exports = {
  url: 'https://bird.ioliu.cn'
};
