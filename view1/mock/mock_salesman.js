// 使用 Mock
var Mock = require('mockjs');
var Random = Mock.Random;
//业务员管理--渠道分润列表
var salesman_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "slsm_cnt": 200,      // 商户数
    "page": 1,
    "page_size": 10,
    "slsm_infos|50-80": [{
    	"slsm_uid|1": 789,                   // 业务员编号
	    "slsm_name": Random.name(),               // 业务员名称
	    "slsm_mobile": /^1[0-9]{10}$/,      // 手机号
	    "slsm_status|1": [0,1],                  // 0在职, 1离职
	    "join_dtm": Random.datetime('yyyy-MM-dd HH:mm:ss'),  // 注册时间
    }],
  }
};
Mock.mock(/qudao\/v1\/api\/slsm\/list/, 'get', salesman_info);
//业务员管理--渠道分润列表
var salesmanOne_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
  	"slsm_name": Random.name(),
    "total": {
        "mchnt_count": 10,    // 发展商户数
        "audit_pass": 5,      // 审核成功数
        "audit_fail": 3,      // 审核失败数
        "audit_reject": 2,    // 审核拒绝数
        "trade_amt": 123456,  // 总交易金额
    },
    "monthly|5-8": [{
        "date": Random.datetime('yyyy-MM'),    // 年月
        "mchnt_count": 10,    // 发展商户数
        "audit_pass": 5,      // 审核成功数
        "audit_fail": 3,      // 审核失败数
        "audit_reject": 2,    // 审核拒绝数
        "trade_amt": 123456,  // 总交易金额
    }]
  }
};
Mock.mock(/qudao\/v1\/api\/slsm/, 'get', salesmanOne_info);