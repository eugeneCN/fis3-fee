/**
 * @desc    测试组件
 * @author  zhangWuQiang
 * @date    2017年09月10日
 */

require('js/app');
var i = 0;
$(document).on('click', '#header', function () {
  $('#msg').html(`<p>测试组件 - ${++i}</p>`);
});
