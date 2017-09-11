// 使用 Mock
var Mock = require('mockjs');
var Random = Mock.Random;
//结算管理--渠道分润列表
var mchnt_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "mchnt_cnt": 200,      // 商户数
    "page": 1,
    "page_size": 10,
    "mchnt_infos|50-80": [{
    	"qd_info": {},                       // 渠道基本信息
	    "slsm_info": {},                     // 业务员基本信息
	    "userid+1": 456,                       // 商户编号
	    "shopname": Random.string(10),              // 商户名称
	    "name": Random.name(),                      // 法人名称
	    "mobile": /^1[0-9]{10}$/,             // 商户手机号码
	    "status|1": [0,1],                         // 商户状态, 正常=0, 注销=1
	    "jointime": Random.datetime('yyyy-MM-dd HH:mm:ss'),   // 注册时间
	    "audit_status|1": ["审核中","拒绝","成功","失败"],            // 审核状态 (审核中, 拒绝, 成功, 失败)
	    "audit_memo": Random.paragraph(2,5),
	    "audit_dtm": Random.datetime('yyyy-MM-dd HH:mm:ss'),  // 审核时间
	    "slsm_uid+1": 789,                     // 业务员 userid
	    "slsm_name": Random.name(),
	    "mchid": Random.string(15),                    // 钱台 mchid
	    "fee_ratios": {                      // 费率
	        "wechat_fee": 12,
	        "alipay_fee": 34,
	        "jd_fee": 56,
	        "qqwallet_fee": 78,
	        "swipecard_fee": 90,
	    },
	    "settle_cycle|1": ["T+1","T+0"],               // 商户结算周期
    }],
  }
};
Mock.mock(/qudao\/v1\/api\/mchnt\/list/, 'get', mchnt_info);
//审核状态
var checkStatus = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    'records': [{
      'name': '成功'
    }, {
      'name': '失败'
    },{
      'name': '拒绝'
    }, {
      'name': '通道审核成功'
    }, {
      'name': '关注同步成功'
    }]
  }
};
Mock.mock(/qudao\/v1\/api\/tools\/mchnt_audit_status/, 'get', checkStatus);