/**
 * @desc    首页
 * @author  zhangWuQiang
 * @date    2017年09月10日
 */
const { api, ajax, loadTpl } = require('js/app');
const { local, session } = require('js/storage');

require('./index.less');
require('./component/list.less');
/**
 *  方法区
 */
const methods = {
  loadRand() {
    const param = {};
    const callback = (res) => {
      if (res.status.code === 200) {
        var tpl = loadTpl(__inline('./tpl/list.tpl'));
        $('#tpl').html(tpl(res.data));
      };
    };
    ajax(`${api.url}/joke/rand`, 'POST', param, callback);
  }
};

$(function () {
  methods.loadRand();
  console.log('storage.js', [local, session]);
});
