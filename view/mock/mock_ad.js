// 使用 Mock
var Mock = require('mockjs');
var Random = Mock.Random;
//结算管理--渠道分润列表
var ad_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "count": 200,
    "list|50-80": [{
      'id|+1': 111111, //# 广告id
      'name': Random.string(12, 28), //# 广告名称
      'display_type_str': Random.string(12, 28), //# 广告展示对象类型描述
      'display_page_str|1': ['支付完成页','支付完成页-品牌广告'], //# 广告展示位置描述
      'display_page': 1, //# 广告展示位置
      'display_type': 2, //# 广告展示对象类型
      'display_args': '11123,44232,321332', //# 广告展示对象id
      'image_url': 'http://image.baidu.com/2eewda67dsa9.jpg', //# 广告展示图片
      'target_url': 'http://o.qfpay.com/adv/redirect/adv_redirect?adv_id=192', //# 广告链接地址
      'origin_url': Random.url(), //# 广告原始链接地址
      'start_time': Random.datetime('yyyy-MM-dd HH:mm:ss'), //# 广告生效时间
      'end_time': Random.datetime('yyyy-MM-dd HH:mm:ss'), //# 广告时效时间
      'create_time': Random.datetime('yyyy-MM-dd HH:mm:ss'), //# 广告创建时间,
      'update_time': Random.datetime('yyyy-MM-dd HH:mm:ss'), //# 广告最近修改时间,
      'memo':  Random.paragraph(1, 2), //# 备注信息
      'status|1': [0,1], //# 生效状态
      'status_str': '生效状态', //# 生效状态描述
      'pv_count': 100, //# pv
      'uv_count': 90, //# uv
      'owner_id': '20102', //# 广告主id，没有返回‘无’
      'owner_name': '广告主名称', //# 广告主名称，没有返回‘无’
      'weight|+1': 1, //# 广告权重
    }],
  }
};
Mock.mock(/qudao\/adv\/banner\/list/, 'get', ad_info);
