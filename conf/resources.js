/**
 * @desc    资源配置
 * @author  zhangWuQiang
 * @date    2017年09月12日
 */
module.exports = {
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
    eslint: /^\/views\/(.*\.es)$/i,
    images: /^\/views\/(.*\.(png|jpg|gif|svg))$/i
  }
};
