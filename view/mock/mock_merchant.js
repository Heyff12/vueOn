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
	    "userid|+1": 456,                       // 商户编号
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
	    "fee_ratios|1": [{                      // 费率
	        "wechat_fee": 12,
	        "alipay_fee": 34,
	        "jd_fee": 56,
	        "qqwallet_fee": 78,
	        "swipecard_fee": 90,
	    },null],
	    "settle_cycle|1": ["T+1","T+0",null],               // 商户结算周期
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
//商户详情
var mchntd_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "base": {
      "type|1": ['小微','个体工商户','企业'], //商户类型
      "mobile": /^1[0-9]{10}$/, //手机号码
      "signed_entity": Random.name(), //签约实体
      "legal_name": Random.name(), //法人代表
      "legal_idnumber": '111222111111112255', //身份证号码
    }, //基本信息
    "account": {
      "bankprovince": '四川省', //省份
      "bankcity": '成都市', //城市
      "bankuser": Random.name(), //账户名称
      "headbankname": '邮政银行', //开户银行
      "bankname": '成都分行', //开户支行
      "bankaccount": '3456465768768', //银行账号
      "bankmobile": /^1[0-9]{10}$/, //银行预留手机号
      "banktype|1": [2, 1], //清算类型['对公', '对私']
      "bankstatus|1": ['审核中','成功'], //银行卡状态
      "bankprovinceid": 13, // 省份代码
      "bankcityid": 1301, // 城市代码
      "headbankid": 123456, // 开户行总行 id
      "bankcode": 123456, // 开户行联行号
      "cardtype|1": [2, 1], //清算类型['信用卡', '借记卡']
    }, //账户信息
    "shop": {
      "receiptname": Random.name(), //收据名称
      "accountname": Random.name(), //账户名称
      "mcc": '', //mcc
      "mcc_desc": "小型超市",
      "province": '四川1', //省份
      "city": '成都1', //城市
      "address": '高新区天府菁蓉大厦', //收据名称
    }, //店铺信息
  }
};
Mock.mock(/qudao\/v1\/api\/mchnt\/\d+\/detail/, 'get', mchntd_info);
//商户修改
var mchntmend_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
  }
};
Mock.mock(/qudao\/v1\/api\/mchnt\/\d+\/modify/, 'post', mchntmend_info);
//银行卡类型
var cardtypes = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    'default': 1, // 默认tp
    'records': [{
      'tp': 1,
      'text': '借记卡'
    }, {
      'tp': 2,
      'text': '信用卡'
    }]
  }
};
Mock.mock(/qudao\/v1\/api\/tools\/cardtypes/, 'get', cardtypes);

//银行卡状态类型
var cardstatuses = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "records": [
      { "status": 1, "text": "等待处理" },
      { "status": 2, "text": "审核中" },
      { "status": 3, "text": "审核通过" },
      { "status": 4, "text": "审核关闭" }
    ],
    "default": 1
  }
};
Mock.mock(/qudao_mis\/v1\/api\/tools\/cardstatuses/, 'get', cardstatuses);
//商户类型类型
var mchnttypes = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "records": [
      { "tp": 1, "text": "个人" },
      { "tp": 2, "text": "个体" },
      { "tp": 3, "text": "公司" }
    ],
    "default": 1 // 默认tp
  }
};
Mock.mock(/qudao_mis\/v1\/api\/tools\/mchnttypes/, 'get', mchnttypes);