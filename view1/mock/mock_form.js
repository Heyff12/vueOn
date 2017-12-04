// 使用 Mock
var Mock = require('mockjs');
var Random = Mock.Random;
//商户流失数据
var lost_merchant = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    'total_cnt': '@natural(10, 100)', // 总条数
    'page': 1,
    'page_size': 10,
    'records|12-30': [{
      'mchnt_uid|+1': 123456,
      'mchnt_name': "@word",
      'legal_name': "@chineseName",
      'mobile': /^1\d{10}$/,
      'slsm_uid|+100': 100000,
      'slsm_name': "@first",
      'last_trade_time': "@datetime('yyyy-MM-dd HH:mm:ss')"
    }]
  }
};
Mock.mock(/qudao\/v1\/api\/statistic\/lost_mchnts/, 'get', lost_merchant);
// var data = Mock.mock(lost_merchant);
// // 输出结果
// console.log(data)
// console.log(JSON.stringify(data, null, 4))

//商户交易交易 表
var mchnt_trade_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data|10-30": [{
    "time": Random.datetime('yyyy-MM-dd HH:mm'), // 时间
    "pass_nums|+4": 10, // 交易数
    "pass_amt|+20": 12300, // 交易金额, 单位分
  }],
};
Mock.mock(/qudao\/v1\/api\/statistic\/mchnt_trade/, 'get', mchnt_trade_info);
// console.log(Mock.mock(fenrunrule_info));
//新商户入网 表
var mchnt_register_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data|10-30": [{
    "date": Random.datetime('yyyy-MM-dd'), // 时间
    "mchnt_nums|+4": 10, // 
  }],
};
Mock.mock(/qudao\/v1\/api\/statistic\/mchnt_register/, 'get', mchnt_register_info);



//渠道商户入网统计 表
var qd_mchnt_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "summary": { // 总计
      "start_date": Random.datetime('yyyy-MM-dd'), // 开始日期
      "end_date": Random.datetime('yyyy-MM-dd'), // 结束日期
      "mchnt_nums|+10": 100, // 入网商户数
      "sub_qd_cnt|+10": 30 // 下级渠道个数
    },
    "detail|3-6": [{ // 各渠道详细数据
      "qd_name": "@word",
      "register_record|10-15": [{
        "date": Random.datetime('yyyy-MM-dd'), // 时间
        "mchnt_nums|+10": 10, // 入网商户数
      }]
    }]
  },
};
Mock.mock(/qudao\/v1\/api\/statistic\/qd_mchnt_register/, 'get', qd_mchnt_info);


//渠道交易统计 表
var qd_trade_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "summary": { // 总计
      "date": Random.datetime('yyyy-MM-dd'), // 开始日期
      "pass_nums|+10": 100, // 入网商户数
      "sub_qd_cnt|+10": 30 // 下级渠道个数
    },
    "detail|3-6": [{ // 各渠道详细数据
      "qd_name": "@word",
      "trade|10-15": [{
        "time": Random.datetime('yyyy-MM-dd HH:mm'), // 时间
        "pass_nums|+10": 10, // 交易数
        "pass_amt|+10": 123, // 交易金额, 单位分
      }]
    }]
  },
};
Mock.mock(/qudao\/v1\/api\/statistic\/qd_trade/, 'get', qd_trade_info);

//业务员统计 表
var slsm_netin_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "summary": { // 总计
      "date": Random.datetime('yyyy-MM-dd'), // 开始日期
      "mchnt_nums|+10": 100, // 入网商户数
      "slsm_cnt|+10": 30 // 下级渠道个数
    },
    "detail|3-6": [{ // 各渠道详细数据
      "slsm_name": "@word",
      "record|10-15": [{
        "date": Random.datetime('yyyy-MM-dd'), // 时间
        "mchnt_nums|+10": 10, // 入网商户数
      }]
    }]
  },
};
Mock.mock(/qudao\/v1\/api\/statistic\/slsm_netin_record/, 'get', slsm_netin_info);
