// 使用 Mock
var Mock = require('mockjs');
var Random = Mock.Random;
//结算管理--渠道分润列表
var fenrun_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "total_cnt": 200,
    "records|50-80": [{
      "trade_date": Random.datetime('yyyy-MM'), // 交易日期
      "qd_uid|+1": 11111115,
      "qd_name": "渠道名称",
      "bankaccount": Random.id(), //收款账号
      "bankuser": Random.name(), //收款人
      "headbankname": "收款行总行", //收款行总行
      "bankname": "开户行名称", //开户行名称
      "trade_amt|+1050": 123450, // 交易金额
      "trade_fee|+150": 23450, // 交易手续费
      "cost_fee|+50": 2050, // 成本手续费
      "royalty_amt|+50": 3450, // 分润金额
      "status|1": [0, 1], //是否审核过,状态, 未审核=0, 已审核=1
    }],
  }
};
Mock.mock(/qudao\/v1\/api\/settlement\/qd_royalty\/list/, 'get', fenrun_info);
//结算管理--分润规则列表
var fenrunrule_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "total_cnt": 200,
    "records|50-80": [{
      "rule_id|+1": 10001,
      "name": "规则名",
      "min_trade_amt|+150": 150, // 最小交易金额
      "ratio|0-12.0-2": 0.1, //签约费率
      "memo": "@string(30)", //备注
      "rules|1-6": [{
        "min_trade_cnt|+10": 10, // 最小交易笔数
        "max_trade_cnt|+10": 40, // 最大交易笔数
        "discount|0-12.0-2": 0.7, // 折扣
      }],
    }]
  }
};
Mock.mock(/qudao\/v1\/api\/royalty_rule\/list/, 'get', fenrunrule_info);
// console.log(Mock.mock(fenrunrule_info));

//结算管理--商户结算
var mchnt_settle_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "total_cnt": 200,
    "records|50-80": [{
      "trade_date": Random.datetime('yyyy-MM-dd'), // 交易日期
      "mchnt_uid|+1": 11111115,
      "mchnt_name": "商户名称",
      "bankaccount": "收款账号",
      "bankuser": "收款人",
      "bankname": "开户行名称",
      "settle_amt|+150": 10050, // 结算金额
      "biznum|+1": 123445565666,
    }],
  }
};
Mock.mock(/qudao\/v1\/api\/settlement\/mchnt_settle\/list/, 'get', mchnt_settle_info);
