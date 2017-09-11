# fis3-fee

> fis3-fee是基于fis3搭建的纯前端脚手架工具，解决前端模块化开发、开发自动化、代码部署、性能优化、等问题。

### 功能
- [fis components](https://github.com/fis-components)
- [sass](http://sass-lang.com/) & [less](http://www.lesscss.net/)
- [ECMAScript 6](https://github.com/lukehoban/es6features)
- [eslint](https://eslint.org/)
- [组件化思想](https://github.com/fex-team/fis3/blob/dev/doc/docs/lv3.md)
- [本地mock数据](https://github.com/fex-team/fis3/blob/dev/doc/docs/node-mock.md)

### 安装运行

> TIPS: 脚手架基于fis3，确保你已安装了fis3，如果不了解fis请移步[fis官网](http://fis.baidu.com/)，node版本不能大于5.0+，原因[点这里](https://github.com/fex-team/fis3/issues/690)。

``` bash

# 安装依赖
npm install

# 安装fis组件
fis3 install

# 开启fis服务器 (命令如下)
npm run start   --  一键 start release -wl
npm run dev     --  启动fis服务
npm run dep     --  发布项目到fis启动的服务，同时监听
npm run build   --  打包发布到本地
npm run del     --  删除已打包发布到本地的代码
npm run open    --  打开fis本地服务器
npm run clean   --  清除fis服务器代码

```
> 这里我在package.json做了下命令配置，为了执行一个脚本写入一个config.js文件来做一些相应的配置。当然你也可以用fis原有命令，不过要注意的是必须要写入一个config.js文件到modules/js目录，不然会报错require不到这个文件。执行命令如下 ..。

``` bash
# 使用fis原有命令之前执行 ..
npm run init:dev    -- 开发环境
npm run init:prod   -- 发布代码

```

### 目录说明

#### 目录结构
``` bash

|____build
|____components
|____lib
|____mock
|____modules
|____views
|____fis-conf.js
|____component.json
|____index.html
|____package.json
|____map.json
|____README.md

```

#### 目录说明

  - build           -- 写入config.js文件脚本
  - components      -- fis组件库
  - lib             -- 静态资源库(不需要打包的库)
  - mock            -- moke数据
  - modules         -- 包含 模块、静态资源
  - views           -- 视图页面
  - fis-conf.js     -- fis配置文件
  - component.json  -- fis组件库配置文件
  - index.html      -- 页面入口
  - package.json    -- 依赖配置
  - map.json        -- 资源配置表
  - README.md       -- 说明文件

``` bash

# views目录下一个页面一个文件夹

|____views
| |____index
| | |____component
| | | |____list.html
| | | |____list.less
| | |____index.es
| | |____index.html
| | |____index.less
| | |____tpl
| | | |____list.tpl
| |____star
| | |____assets
| | | |____star48_half@3x.png
| | | |____star48_off@3x.png
| | | |____star48_on@3x.png
| | |____star.css
| | |____star.es
| | |____star.html
| |____test
| | |____test.es
| | |____test.html
| | |____test.scss
| | |____test2.es


# modules widget组件

|____modules
| |____css
| |____images
| |____js
| |____widget
| | |____header
| | | |____header.html
| | | |____header.js
| | |____meta.html
| | |____nav.html
```
