/**
 * @desc    全局js入口
 * @author  zhangWuQiang
 * @date    2017年09月10日
 */

var jQuery = window.jQuery = window.$ = require('jquery');
var _ = require('lodash');
var color = 'font-weight:700;color:rgb(66, 185, 131)';
require('../css/reset.css');
require('../css/common/common.scss');

module.exports = function (self) {
  /**
   *  api
   *  @param return
   */
  self.api = require('./api.js');

  /**
   *  跳转新页面url
   *  @param {String} url         需要跳转的url
   *  @param return
   */
  self.openUrl = function (url, type) {
    if (_.isUndefined(type)) {
      window.location.href = url;
    } else {
      window.open(url, type);
    }
  };

  /**
   *  打印日志
   *  @param {String} msg         传过来的字符串信息
   *  @param return
   */
  self.logger = function (msg, param) {
    if (require('./config').logs) console.log(msg, param);
  };

  /**
   *  获取url传过来的参数
   *  @param {String} name        获取的参数
   *  @param {String} Url         自定义获取参数的链接
   *  @param return
   */
  self.getUrlQuery = function (name, Url) {
    var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(\\s|&|$)', 'i');
    var url = Url || window.location.href;
    if (reg.test(url)) {
      return decodeURI(RegExp.$2.replace(/\+/g, ' '));
    }
    return '';
  };

  /**
   *  获取模板元素
   *  @param {String} element         模板元素ID
   *  @param return
   */
  self.loadTpl = function (element) {
    var compiled;
    // is Zepto Object
    // if (Zepto.zepto.isZ(element)) {
    //   compiled = _.template(element.html());
    // }
    // is jQuery Object
    if (element instanceof jQuery) {
      compiled = _.template(element.html());
    }
    // is Array
    if (_.isArray(element)) {
      compiled = _.template(element.join(''));
    }
    // is String
    if (_.isString(element)) {
      compiled = _.template(element);
    }
    return compiled;
  };

  /**
   *  全局ajax
   *  @param {String} url             请求地址
   *  @param {String} type            请求的类型
   *  @param {Object} param           请求参数
   *  @param {Function} callback      请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
   *  @param return
   */
  self.ajax = function (url, type, param, callback) {
    $.ajax({
      url: url,
      type: type,
      data: param,
      contentType: 'application/x-www-form-urlencoded',
      timeout: 10000,
      beforeSend: function () {},
      success: function (response) {
        self.logger('%c接口: ' + url, color);
        self.logger('😝输入参数==>', { params: { url, type, params: JSON.stringify(param) } });
        self.logger('🙄成功返回==>', response);
        self.logger('%c------------------------------------------------------------------------', color);
        if (_.isFunction(callback)) {
          callback(response);
        }
      },
      complete: function () {},
      error: function (xhr, e) {
        self.logger(xhr);
      }
    });
  };
  return self;
}(this || {});
