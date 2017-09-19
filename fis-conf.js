/**
 * @desc    fis3配置文件
 * @author  zhangWuQiang
 * @date    2017年09月12日
 */
var eslintConf = require('./conf/eslint.js');
var resourcesConf = require('./conf/resources.js');
var packConf = require('./conf/pack.js');

// 设置项目属性
fis.set('app.name', 'fis3-fee');
fis.set('app.root', '/');
fis.set('app.pkg', '/pkg');
fis.set('app.static', '/static');
fis.set('project.files', ['*.html', 'map.json']);


// 启用插件
fis.hook('relative');

// 让所有文件，都使用相对路径。
fis.match('*', {
  relative: true
})

// 将views下的文件放根目录
// fis.match(/^\/views\/(.*\.*)$/i, {
//   release: '$1'
// })

// 引入模块化开发插件，规范为 commonJs 规范。
fis.hook('commonjs', {
  baseUrl: './modules',
  extList: ['.js', '.es']
});

/**
 *  ===================开发目录规范===================
 */

// ------ 关闭同名依赖 (true为打开) ------
fis.match('/views/**', {
  useSameNameRequire: false
});

// ------ 全局配置 ------
fis.match('*.{js,es}', {
  preprocessor: [
    fis.plugin('js-require-file'),
    fis.plugin('js-require-css', {
      mode: 'dependency'
    })
  ]
});

// ------ 配置图片压缩 ------
fis.match('**.png', {
  optimizer: fis.plugin('png-compressor', {
    type: 'pngquant'
  })
});

// ------ 配置lib ------
fis.match('/lib/**.js', {
  release: '${app.static}/$&'
});

// ------ 配置components ------
fis.match('/components/**', {
  release: '${app.static}/$&'
});
fis.match('/components/**.css', {
  isMod: true,
  release: '${app.static}/$&'
});
fis.match('/components/**.js', {
  isMod: true,
  release: '${app.static}/$&'
});

// ------ 配置modules ------
fis.match('/modules/(**)', {
  release: '${app.static}/$1'
})

// ------ 配置模拟数据 ------
fis.match('/mock/**', {
  release: '$0'
});

fis.match('/mock/server.conf', {
  release: '/config/server.conf'
});


// ------ 配置modules views 资源文件 ------
Object.keys(resourcesConf).forEach(function (k) {
  var obj = resourcesConf[k];

  // ------ 配置scss ------
  fis.match(obj.scss, {
    parser: fis.plugin('node-sass', {
      include_paths: []
    })
  });

  // ------ 配置less ------
  fis.match(obj.less, {
    parser: fis.plugin('less', {
      paths: []
    })
  });

  // ------ 配置js ------
  fis.match(obj.script, {
    parser: fis.plugin('babel-5.x'),
    rExt: 'js',
    isMod: true,
    release: '${app.pkg}/$0'
  });

  // ------ 配置css------
  fis.match(obj.style, {
    rExt: '.css',
    isMod: true,
    release: '${app.pkg}/$0'
  });

  // ------ 配置img------
  fis.match(obj.images, {
    useMap: true,
    release: '${app.static}/$1'
  });

  // ------ 配置eslint------
  fis.match(obj.eslint, {
    lint: fis.plugin('noob-eslint', eslintConf)
  })
})

/**
 *  ===================打包规范===================
 */

fis.match('::package', {
  // __RESOURCE_MAP__
  postpackager: fis.plugin('loader', {
    resourceType: 'commonJs',
    useInlineMap: true // 资源映射表内嵌
  })
});


// release
var media = fis.env()._media;
if (media !== 'dev') {
  packConf[media](media);
}
