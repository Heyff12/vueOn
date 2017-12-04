// 使用 Mock
var Mock = require('mockjs');
var Random = Mock.Random;
//结算类型
var banktypes = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    'default': 2, // 默认tp
    'records': [{
      'tp': 1,
      'text': '对私'
    }, {
      'tp': 2,
      'text': '对公'
    }]
  }
};
Mock.mock(/qudao\/v1\/api\/tools\/banktypes/, 'get', banktypes);
//币种
var currencys = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "records": [{
      "code": "156",
      "text": "人民币"
    }, {
      "code": "344",
      "text": "港币"
    }, {
      "code": "392",
      "text": "日元"
    }],
    "default": "156"
  }
}
Mock.mock(/qudao\/v1\/api\/tools\/currencies/, 'get', currencys);
//时区
var timezones = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "records": [
      "-1200", "-1100", "-1000", "+0800", "+1200", "+1300", "+1400"
    ],
    "default": "+0800"
  }
}
Mock.mock(/qudao\/v1\/api\/tools\/timezones/, 'get', timezones);
//国家
var countries = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "records": [{
      "code": "CN",
      "text": "中国"
    }, {
      "code": "USA",
      "text": "美国"
    }, {
      "code": "EN",
      "text": "英国"
    }],
    "default": "CN"
  }
}
Mock.mock(/qudao\/v1\/api\/tools\/countries/, 'get', countries);
//渠道类型
var qd_types = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "records": [{
      "tp": 1,
      "text": "对私"
    }, {
      "tp": 2,
      "text": "对公"
    }],
    "default": 2 // 默认tp
  }
}
Mock.mock(/qudao\/v1\/api\/tools\/qd_types/, 'get', qd_types);

//结算方式
var settle_cycle = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "records": [{
      "tp": 1,
      "text": "实时"
    }, {
      "tp": 2,
      "text": "月结"
    }, {
      "tp": 3,
      "text": "季度结"
    }, ],
    "default": 2 // 默认tp
  }
}
Mock.mock(/qudao\/v1\/api\/tools\/settle_cycle/, 'get', settle_cycle);

//增值产品
var product_info = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data|5-8": [{
    "product_id|+1": 123, // 产品编号
    "name": "@first", // 产品名称
    "intro": "@string( 10 )", // 产品简介
    'status': Random.boolean(5, 5, true)
  }]
}
Mock.mock(/qudao\/v1\/api\/qd\/product_info/, 'get', product_info);
//console.log(Mock.mock(product_info));


//渠道列表
var qd_list = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data|20-50": {
    'qd_cnt': 200,
    'qd_infos|20-50': [{
      "base": {
        "userid|+1": 100, // 渠道编号
        "status": Random.boolean(5, 5, 1), // 渠道状态: 0 启用, 1 禁用
        "join_dtm": "@datetime('yyyy-MM-dd HH:mm:ss')", // 注册时间
        "email": Random.email(), // 注册邮箱
        "type": Random.natural(1, 2), // 渠道类型: 1 白牌, 2 联名
        "slsm_uid|+1": 100300, // 所属业务员ID

        "name": Random.string( 10 ), // 渠道名称
        "short_name": Random.string( 6 ), // 渠道简称
        "legal_name": "王二", // 法人姓名
        "legal_idnumber": Random.id(), // 法人省份证号码
        "province": Random.region(), // 所在省份
        "city": "成都市", // 所在城市
        "address": "华阳", // 商户地址
        "business_name": "李二", // 业务联系人姓名
        "business_mobile": "13012340000", // 业务联系人手机号
        "business_email": Random.email(), // 业务联系人邮箱
        "finace_name": "李二", // 财务联系人姓名
        "finace_mobile": "13012340000", // 财务联系人手机号
        "finace_email": Random.email(), // 财务联系人邮箱
        "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
        "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
        "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
        "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
      }, // 渠道基本信息
      "account": {
        "userid": 123, // 渠道编号
        "bankaccount": "623300000", // 收款账户(网点账户号)
        "bankuser": "张三", // 开户名称(网点开户名)
        "headbankname": "中国银行", // 银行总行名称
        "bankname": "朝阳门支行", // 银行开户行名称(网店名称/支行名称)
        "banktype": 1, // 结算类型(账户类型): 1 对私, 2 对公
        "settle_cycle": 1, // 结算方式(结算周期): 1 实时, 2 月结, 3 季度结
        "settle_base_amt": 3000000, // 起结金额, 单位: 分
        "fee": 1.5, // 手续费, 单位: 百分比
      }, // 渠道账户信息
      "product": [{
        "userid|+1": 500, // 渠道编号
        "product_id|+1": 123, // 产品编号
        "name": "会员体系", // 产品名称
        "intro": "简介", // 产品简介
        "status": 0, // 开通状态: 0 已开通, 1 未开通
      }, {
        "userid": 133, // 渠道编号
        "product_id": 133, // 产品编号
        "name": "会员体系", // 产品名称
        "intro": "简介", // 产品简介
        "status": 1, // 开通状态: 0 已开通, 1 未开通
      }]
    }]
  }
}
Mock.mock(/qudao\/v1\/api\/qd\/list/, 'get', qd_list);
//渠道基本信息
var qd_base = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "userid|+1": 100, // 渠道编号
    "status": Random.boolean(5, 5, 1), // 渠道状态: 0 启用, 1 禁用
    "join_dtm": "@datetime('yyyy-MM-dd HH:mm:ss')", // 注册时间
    "email": Random.email(), // 注册邮箱
    "type": Random.natural(1, 2), // 渠道类型: 1 白牌, 2 联名
    "slsm_uid|+1": 100300, // 所属业务员ID

    "name": Random.string(10), // 渠道名称
    "short_name": Random.string(6), // 渠道简称
    "legal_name": "王二", // 法人姓名
    "legal_idnumber": Random.id(), // 法人省份证号码
    "province": Random.region(), // 所在省份
    "city": "成都市", // 所在城市
    "address": "华阳", // 商户地址
    "business_name": "李二", // 业务联系人姓名
    "business_mobile": "13012340000", // 业务联系人手机号
    "business_email": Random.email(), // 业务联系人邮箱
    "finace_name": "李二", // 财务联系人姓名
    "finace_mobile": "13012340000", // 财务联系人手机号
    "finace_email": Random.email(), // 财务联系人邮箱
    "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
    "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
    "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
    "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
    "level|1": [1, 2, 3], //渠道级别
    "currency":'344',
    "timezone":'-1000',
    "country":'EN',
    'auth_areas': [
      { "auth_province": "北京市", "auth_city": "北京市" },
      { "auth_province": "河北省", "auth_city": "唐山市" },
      { "auth_province": "天津市", "auth_city": "天津市" },
      { "auth_province": "山西省", "auth_city": "太原市" },
      { "auth_province": "河北省", "auth_city": "邯郸市" }
    ],
    "manager_name": Random.string(10),                   // 渠道经理
    "manager_mobile": /1[0-9]{10}/,          // 渠道经理电话
    "service_manager_name": Random.string(10),           // 渠道服务经理
    "service_manager_mobile": /(^(0\d{2,3}(-){0,1}){1}\d{7,8})(-\d{3,5}){0,1}$|^1[0-9]{10}$/,  // 渠道服务经理电话
  }
}
Mock.mock(/base_info/, 'get', qd_base);

//渠道关系
var qd_relation = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "records|20-200": [{
      "qd_uid|+1": 12345678, // 渠道 userid
      "name": Random.string(10),
      "short_name": Random.string(10),
      "status": Random.boolean(5, 5, 1), // 渠道状态: 0 启用, 1 禁用
      "level|1": [1, 2, 3], //渠道级别
    }], 
  }
}
Mock.mock(/qudao\/v1\/api\/qd\/\d+\/relation/, 'get', qd_relation);
//渠道账户信息
var qd_account = {
  "respcd": "0000",
  "respmsg": "OK",
  "resperr": "",
  "data": {
    "userid": 123, // 渠道编号
    "bankaccount": "623300000", // 收款账户(网点账户号)
    "bankuser": "张三", // 开户名称(网点开户名)
    "headbankname": "中国银行", // 银行总行名称
    "bankname": "朝阳门支行", // 银行开户行名称(网店名称/支行名称)
    "banktype|1": [1,2], // 结算类型(账户类型): 1 对私, 2 对公
    "bankcode": "1", // 联行号
    "settle_cycle|1": [1,2,3], // 结算方式(结算周期): 1 实时, 2 月结, 3 季度结
    "settle_base_amt": 1234550, // 起结金额, 单位: 分
    "fee": 1.5,               // 手续费, 单位: 百分比, 弃用
    "wechat_fee": 1.5, // 微信手续费
    "alipay_fee": 1.5, // 支付宝手续费
    "jd_fee": 1.5, // 京东手续费
    "qqwallet_fee": 1.5, // QQ 钱包手续费
    "swipecard_fee": 1.5, // 刷卡手续费
    "default_mchnt_fee": 1.5, // 商户默认费率
  }
}
Mock.mock(/account_info/, 'get', qd_account);