/**
 * @desc    打包配置
 * @author  zhangWuQiang
 * @date    2017年09月12日
 */

/**
 *  1.替换url前缀
 *  2.添加mr5码
 *  3.打包
 *  4.合图
 *  5.重新定义资源路径
 */
var chalk = require('chalk')
var base = require('./base.js');
module.exports = {
  package: function () {
    // 启用打包
    fis.match('::package', {
      spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        scale: 0.5,
        margin: '10'
      }),
      packager: fis.plugin('deps-pack', {
        'pkg/lib.css': [
          '/modules/css/**.css',
          '/modules/css/**.less',
          '/modules/css/**.scss'
        ],
        'pkg/common.css': [
          '/modules/common/**.css',
          '/modules/common/**.less',
          '/modules/common/**.scss'
        ],
        'pkg/lib.js': [
          'components/**/**.js',
          'components/**/**.js:deps'
        ],
        'pkg/common.js': [
          'modules/**/**.js:deps'
        ]
      }),
      postpackager: fis.plugin('loader', {
        allInOne: true,
      })
    })
  },
  optimize: function (val) {
    // 添加md5、sprite、资源路径
    var obj = base[val];
    var domain = obj.host + obj.path;
    fis.media(val)
      .match('**.{es,js}', {
        useHash: true,
        domain: domain
      })
      .match('**.{scss,less,css}', {
        useSprite: true,
        useHash: true,
        domain: domain
      })
      .match('::image', {
        useHash: true,
        domain: domain
      })
      .match('**/(*_{x,y,z}.png)', {
        release: './pkg/img/$1'
      })
  },
  compress: function (val) {
    // html js css 压缩
    fis.media(val)
      .match('**.html', {
        optimizer: fis.plugin('html-compress')
      })
      .match('**.{es,js}', {
        optimizer: fis.plugin('uglify-js')
      })
      .match('**.{scss,less,css}', {
        optimizer: fis.plugin('clean-css', {
          //保持一个规则一个换行
          'keepBreaks': true
        })
      });
  },
  output: function () {
    fis.match('**', {
      deploy: [
        fis.plugin('skip-packed', {
          ignore: []
        }),
        fis.plugin('local-deliver', {
          to: 'output'
        })
      ]
    });
  },
  dev: function (val) {
    console.log(`\n${chalk.bgGreen.white(' DONE ') + ' '}${chalk.green(' dev start') + ' '}\n`)
  },
  debug: function (md) {
    console.log(`\n${chalk.bgGreen.white(' DONE ') + ' '}${chalk.green(' debug start') + ' '}\n`)
    this.package();
    this.optimize(md);
  },
  prod: function (md) {
    console.log(`\n${chalk.bgGreen.white(' DONE ') + ' '}${chalk.green(' pack start') + ' '}\n`)
    this.package();
    this.optimize(md);
    this.compress(md);
    this.output();
  }
}
