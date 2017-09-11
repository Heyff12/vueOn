//统计报表-模拟数据
require('./mock_form');
//省市区联动-模拟数据
require('./mock_area');
//home页--昨日数据，两个报表
require('./mock_home');
//channel-index-list页面-模拟数据
require('./mock_channel_index');
//结算管理--渠道分润
require('./mock_settle');
//商户管理
require('./mock_merchant');
//业务员管理
require('./mock_salesman');
//交易管理
require('./mock_trade');
//培训资料
require('./mock_material');
// 使用 Mock
var Mock = require('mockjs');
//渠道基本信息
var qd_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "base": {
      "name": "@word", // 渠道名称
      "short_name": '@first',
      "logo_url": "@image('200x200', '#02adea', '#FFF', '企业logo')", // 企业LOGO的URL
      "level|1": [1,2], //渠道等级--1级才可以使用广告管理
      "currencySymbol|1": ['USD','RMB','JPY'],//币种
    }
  }
};
Mock.mock(/qudao\/v1\/api\/qd\/info/, 'get', qd_info);
//最新信息-弹框展示
var announcement_popup = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "should_popup": 1, // 是否应弹出, 1=需要弹出, 0=不需要弹出
    "total_cnt": 10, // 总条数
    "records": [{
      "announce_id": '@integer(10000, 10000000000)', // 公告 id
      "title": "@string( 30 )",
      "content": "@paragraph(3, 7)",
      "create_time": "@datetime('yyyy-MM-dd HH:mm:ss')",
      "istop": 1, // 是否置顶
      "can_modify": 0, // 是否能够删除
    }]
  }
};
Mock.mock(/qudao\/v1\/api\/announcement\/popup/, 'get', announcement_popup);
//获取当前渠道是否开通广告管理
var advertising_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "enabled|1": [0,1],// 是否开通广告管理, 开通=1, 未开通=0
  }
};
Mock.mock(/qudao\/v1\/api\/qd\/product_status\/advertising/, 'get', advertising_info);
// console.log(Mock.mock(advertising_info));
// console.log(Mock.mock(qd_info));

//登陆
var login_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {

  }
};
Mock.mock(/qudao\/v1\/api\/user\/login/, 'post', function() {
  SetCookie('sessionid', 'yaya123344', 12);
  return login_info;
});
//登出
var logout_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {

  }
};
Mock.mock(/qudao\/v1\/api\/user\/logout/, 'post', function() {
  deleteCookie('sessionid');
  return logout_info;
});




//删除cookie
function deleteCookie(username) {
  var date = new Date();
  // // 删除一个cookie，就是将其过期时间设定为一个过去的时间
  date.setTime(date.getTime() - 10000);
  document.cookie = username + "=v; expires=" + date.toGMTString();
}
//设置sessionid
function SetCookie(cookieName, cookieValue, nDays) {
  /**/
  /* 当前日期 */
  var today = new Date();
  /**/
  /* Cookie 过期时间 */
  var expire = new Date();
  /**/
  /* 如果未设置nDays参数或者nDays为0，取默认值 1 */
  if (nDays == null || nDays == 0)
    nDays = 1;
  /**/
  /* 计算Cookie过期时间 */
  expire.setTime(today.getTime() + nDays * 24 * 60 * 60 * 1000); //获取毫秒数      
  /**/
  /* 设置Cookie值 */
  document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString();
  //alert(cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString());
}
