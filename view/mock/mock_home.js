// 使用 Mock
var Mock = require('mockjs');
var Random = Mock.Random;
//昨日数据
var yesterday_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "date": Random.datetime('yyyy-MM'), // 日期
    "trade_cnt": 1289, // 交易笔数
    "trade_amt": 123456710000, // 交易金额, 单位为分
    "net_amt": 55667789700040, // 净收入, 单位为分
    "new_mchnt_cnt": 3456, // 新入商户数
    "mchnt_rank|0-3": [{
      "mchnt_uid|1": 111,
      "shopname": Random.name(),
      "trade_amt|+20": 345680,
      "rank": 0,
      "logo_url": Random.url(),
    }],
  }
};
Mock.mock(/qudao\/v1\/api\/statistic\/yesterday_data/, 'get', yesterday_info);
//实时交易 表
var transaction_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data|10-30": [{
    "time": Random.datetime('yyyy-MM-dd HH:mm'), // 时间
    "pass_nums|+4": 10, // 交易数
    "pass_amt|+20": 1234500, // 交易金额, 单位分
  }],
};
Mock.mock(/qudao\/v1\/api\/statistic\/realtime_transaction/, 'get', transaction_info);
// console.log(Mock.mock(fenrunrule_info));
//新商户 表
var slsm_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data|10-30": [{
    "time": Random.datetime('yyyy-MM-dd'), // 时间
    "mchnt_nums|+4": 10, // 
  }],
};
Mock.mock(/qudao\/v1\/api\/statistic\/slsm_mchnt_register/, 'get', slsm_info);