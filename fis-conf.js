// 设置项目属性
fis.set('app.name', 'fis3-fee');
fis.set('app.static', '/static');
fis.set('app.root', '/');

// eslint config
var eslint = {
  ignoreFiles: [],
  envs: [],
  globals: [],
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'space-before-function-paren': 0,
    'indent': ['warn', 2],
    'no-tabs': 0,
    'semi': ['error', 'always'],
    'wrap-iife': 0,
    'null': 0
  }
};

// 启用插件
fis.hook('relative');

// 让所有文件，都使用相对路径。
fis.match('*', {
  relative: true
})

// 将views下的文件放根目录
fis.match(/^\/views\/(.*\.*)$/i, {
  release: '$1'
})

// 引入模块化开发插件，规范为 commonJs 规范。
fis.hook('commonjs', {
  baseUrl: './modules',
  extList: ['.js', '.es']
});

/**
 *  ===================开发目录规范===================
 */

// ------ 开启同名依赖 ------
fis.match('/views/**', {
  useSameNameRequire: true
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

// ------ 静态资源配置 ------
var config = {
  modules: {
    scss: /^\/modules\/(.*\.scss)$/i,
    less: /^\/modules\/(.*\.less)$/i,
    style: /^\/modules\/(.*\.(scss|less|css))$/i,
    script: /^\/modules\/(.*\.js)$/i,
    eslint: /^\/modules\/(.*\.js)$/i,
    images: /^\/modules\/(.*\.(png|jpg|gif|svg))$/i
  },
  views: {
    scss: /^\/views\/(.*\.scss)$/i,
    less: /^\/views\/(.*\.less)$/i,
    style: /^\/views\/(.*\.(scss|less|css))$/i,
    script: /^\/views\/(.*\.es)$/i,
    eslint: /^\/views\/(.*\.js)$/i,
    images: /^\/views\/(.*\.(png|jpg|gif|svg))$/i
  }
}

// ------ 配置modules views 资源文件 ------
Object.keys(config).forEach(function (k) {
  var obj = config[k];

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
    release: '${app.static}/$1'
  });

  // ------ 配置css------
  fis.match(obj.style, {
    rExt: '.css',
    isMod: true,
    release: '${app.static}/$1'
  });

  // ------ 配置img------
  fis.match(obj.images, {
    useMap: true,
    release: '${app.static}/$1'
  });

  // ------ 配置eslint------
  fis.match(obj.eslint, {
    lint: fis.plugin('noob-eslint', eslint)
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

// debug后缀 不会压缩
var map = {
  'dev': {
    host: '',
    path: ''
  },
  'prod': {
    host: '',
    path: ''
  }
};

/**
 *  1.替换url前缀
 *  2.添加mr5码
 *  3.打包
 *  4.合图
 *  5.重新定义资源路径
 */
Object.keys(map).forEach(function (v) {
  var o = map[v];
  var domain = o.host + o.path;
  fis.media(v)
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
    // 启用打包插件，必须 ::package
    .match('::package', {
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
          'lib/mod.js:deps',
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
});


// 压缩css js html
Object.keys(map)
  .filter(function (v) {
    return v.indexOf('debug') < 0
  })
  .forEach(function (v) {
    fis.media(v)
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
  });

// 本地产出
fis.media('prod')
  .match('**', {
    deploy: [
      fis.plugin('skip-packed', {
        ignore: []
      }),
      fis.plugin('local-deliver', {
        to: 'output'
      })
    ]
  });
