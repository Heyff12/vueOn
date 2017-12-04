// 使用 Mock
var Mock = require('mockjs');
var Random = Mock.Random;
//业务员管理--渠道分润列表
var trade_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "trade_cnt": 1800,      // 商户数
    "page": 1,
    "page_size": 10,
    "trade|50-80": [{
    	"qudao_uid|1": 12345,                  // 渠道 userid
	    "qudao_name": Random.string(10),              // 渠道名
	    "mchnt_uid|11": 12346,                  // 商户 userid
	    "mchnt_name": Random.string(10),              // 商户名
	    "mchnt_mobile": /^1[0-9]{10}$/,       // 商户手机号
	    "slsm_name": Random.name(),           // 业务员姓名
	    "trade_syssn": "20170227123456",     // 交易流水号
	    "trade_amt|+50": 1210050,                    // 交易金额, 单位为分
	    "trade_fee": 100,                    // 手续费, 单位分
	    "trade_dtm": Random.datetime('yyyy-MM-dd HH:mm:ss'),  // 交易时间
	    "trade_type|1": ["微信","支付宝","刷卡"],                // 交易类型
	    "trade_status|1": ["成功","失败"],              // 交易状态
	    "trade_msg": "交易失败",             // 交易失败原因
	    "out_trade_no": "1234567890",        // 外部流水号
    }],
  }
};
Mock.mock(/qudao\/v1\/api\/trade\/list/, 'get', trade_info);