// 使用 Mock
var Mock = require('mockjs');
var Random = Mock.Random;
//结算管理--渠道分润列表
var material_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "total_cnt": 200,
    "records|50-80": [{
      "id|+1": 11111115,
      "name": Random.string(12,28),
      "create_time": Random.datetime('yyyy-MM'), // 发布日期
      "link": Random.url(), //链接
      "memo": Random.paragraph(3,7), //详情
    }],
  }
};
Mock.mock(/qudao\/v1\/api\/training_file\/list/, 'get', material_info);
