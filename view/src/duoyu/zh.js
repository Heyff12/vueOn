import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
export default {
  languages: [{
    text: '中文',
    val: 'zh'
  }, {
    text: 'English',
    val: 'en'
  }],
  menus: {
    yesterdayData: '昨日数据',
    qdManage: '渠道管理',
    addQd: '新增渠道',
    merManage: '商户管理',
    salesmanManage: '业务员管理',
    tradeManage: '交易管理',
    forms: '统计报表',
    formMerIn: '商户入网统计',
    formTrade: '商户交易统计',
    formChannel: '渠道商户入网统计',
    formCTrade: '渠道交易统计',
    formSalesman: '业务员统计',
    formLostMer: '流失商户统计',
    settle: '结算管理',
    merSettle: '商户结算单',
    qdFenrun: '渠道分润单',
    ad: '广告管理',
    aders: '广告主管理',
    notice: '公告管理',
    addNotice: '新增公告',
    meterial: '培训资料',
  },
  app: {
    logout: '退出',
    fixPass: '修改密码',
    myFenrun: '我的分润',
    backLogin: '返回登录页',
    backLogin_d: '密码修改成功，请点击“确定”按钮进入登录页重新登陆!',
    oldPass: '旧密码',
    newPass: '新密码',
    newPass2: '确认新密码',
    oldPass_input: '请输入旧密码',
    Pass_error: '密码长度在6~20之内',
    newPass_input: '请输入新密码',
    newPass2_input: '请再次输入密码',
    newPass2_error: '两次输入密码不一致!',
    noticeD: '公告详情',
    noticeTitle: '公告标题',
    noticeDetail: '公告内容',
    timeout: '网络超时',
    dataLoading: '数据加载中',
    save: '保存更改',
    sure: '确认',
    cancle: '取消',
    unitGe:'个',
    unitMoneyZh:'',//废弃
    unitMoney:'',//废弃
    search:'查询',
    clickScan:'点击查看',
    operate:'操作',
    note:'备注',
    all:'全部',
    return:'返回',
    modify:'修改',
    unitMoneyBack:'',//废弃
    scan:'查看',
    ifSureMend:'是否确认修改？',   
    saveSure:'提交确认',  
    fixSuccess:'修改成功!',              
  },
  yanzheng: {
    qdNum: '请输入渠道编号，只能包含数字',
    qdName: '请输入渠道名称，长度在 1 到 30 个字符',//暂不使用
    merNum: '请输入商户编号，只能包含数字',
    merName: '请输入商户名称，长度在 1 到 20 个字符',
    merNameL: '请输入商户名称，长度在 1 到 30 个字符',
    tel: '请填写正确的手机号',
    salesman: '请输入所属业务员，长度在 1 到 20 个字符',
    salesmanL: '请输入所属业务员，长度在 1 到 30 个字符',
    sonMer: '请输入子商户号，长度在 1 到 128 个字符',
    salesmanSel: '请选择业务员',
    salesmanNum: '请输入业务员编号，长度在 1 到 200 个数字',
    salesmanName: '请输入业务员名称，长度在 1 到 30 个字符',
    tradeNum: '请输入交易流水号，长度在 1 到 200 个数字',
    orderNum: '请输入商户订单号，长度在 1 到 128 个字符',
    timeThan: '结束时间小于开始时间',
    timeMonth: '时间区间不能跨月',
    authProSel: '请选择所在授权省份',
    authCitySel: '请选择所在授权城市',
    telAll: '手机号/座机号码均可',
    email: '请填写正确的邮箱',
    idNumber: '请填写正确的身份证号',
    picture: '图片格式为“png/jpg/jepg”,不能大于10M!',
    pictureLength: '图片不能大于10M!',
    selBank: '请选择总行',
    selBranchBank: '请选择支行',
    selProvince: '请选择所在省份',
    selCity: '请选择所在城市',
    bankaccount: '请输入银行账号，长度在 1 到 50 个字符',
    selBankType: '请选择清算类型',
    selCardType: '请选择银行卡类型',
    cardOwnerName: '请输入账户名称，长度在 1 到 25 个字符',
  },
  login: {
    qdSystem: '渠道系统',
    userLogin: '用户登录',
    login: '登陆',
    yanzhengName: '请输入用户名（手机号码/邮箱）',
    yanzhengPass: '请输密码，长度在 6 到 20 个字符',
  },
  generalPro: {
    dateBank:{
      lastWeek:'最近一周',
      lastMonth:'最近一个月',
      lastThreeM:'最近三个月', 
    },
    yanzheng:{
      input: '请输入',
      length: '长度在',
      to: '到',  
      string: '个字符', 
      chinese: '中文', 
      inputSlect: '请选择',     
    },
    options:{      
      toPrivate: '对私', 
      toPublic: '对公', 
    },
    searchBank:{
      qdNum:'渠道编号：',
      qdName:'渠道名称：',
      qdStatus:'渠道状态：', 
      active:'正常', 
      inactive:'停用', 
      timeRange:'时间区间：',
      timeRangeD:'选择日期范围',
      merNum:'商户编号：',
      merName:'商户名称：', 
      tel:'手机号：',
      salesman:'所属业务员：',
      sonMer:'子商户号：', 
      auditStatus:'审核状态：',
      auditStatusD:'请选择审核状态', //多项选择，单独处理--商户管理列表搜索栏 searchkey.audit_statuses.length>0?'':$t('generalPro.searchBank.auditStatusD')
      salesmanNum:'业务员编号：',
      salesmanName:'业务员名称：',
      salesmanStatus:'业务员状态：', 
      onJob:'在职',
      dimission:'离职',
      tradeNum:'交易流水号：', 
      orderNum:'商户订单号：',
      payStatus:'支付状态：',
      failure:'失败',
      success:'成功',
      startTime:'开始时间：', 
      endTime:'结束时间：', 
      tradePrice:'交易金额：',
      tradeTime:'交易时间：',
      tradeStyle:'交易类型：',
      tradeStatus:'交易状态：',
      tradeDes:'交易描述：',
      backout:'已撤销',
      refund:'已退款',
      reverse:'已冲正',
      orig_ssn: '原交易流水号:', 
    },
    bodyBank:{
      qdNum:'渠道编号',
      qdName:'渠道全称',
      qdName2:'渠道名称',
      qdShortName:'渠道简称',
      qdStatus:'渠道状态',
      baseInfo:'基本信息',
      accountInfo:'账户信息',
      proInfo:'增值产品',
      regTime:'注册时间',
      open:'开启',
      close:'停用',
      closeDeactive:'注销',
      merNum:'商户编号',
      merName:'商户名称',
      merFee:'商户费率',
      ownerNname:'法人名称',
      tel:'电话',
      tel2:'手机号',
      auditStatus:'审核状态',
      failureCause:'失败原因',
      merStatus:'商户状态',
      salesman:'所属业务员',
      sonMer:'子商户号',
      active:'启用',
      deactive:'注销',
      activeS:'正常', 
      inactiveS:'注销', 
      salesmanNum:'业务员编号',
      salesmanName:'业务员名称',
      salesmanStatus:'业务员状态', 
      tradeNum:'交易流水号', 
      orderNum:'商户订单号',
      tradePrice:'交易金额/',
      tradeTime:'交易时间',
      tradeStyle:'交易类型',
      tradeStatus:'交易状态',
      tradeD:'明细',
      owner: '法人', 
      telphone: '联系电话', 
      lastTradeTime: '最后交易时间', 
      proNo:'产品编号',
      proName: '产品名称', 
      proDes: '产品简介', 
      proSel: '请选择增值产品！', 
      getMoneyName: '收款人姓名', 
      bankAccount:' 银行账户',
      headBank: '总行名称', 
      headBankSel: '请选择总行', 
      bankName: '支行名称', 
      settleStyle:'结算类型',
      settleMothod: '结算方式', 
      startMoney: '起结金额', 
      wechartFee: '微信成本费率', 
      zfbFee:'支付宝成本费率',
      qqFee: 'QQ钱包成本费率', 
      jdFee: '京东钱包成本费率', 
      cardFee: '刷卡成本费率', 
      defaultFee: '商户默认费率', 
      qdType: '渠道类型', 
      ownerId: '法人身份证号', 
      country: '国家', 
      timeZone:'时区',
      currency: '币种', 
      regEmail: '注册邮箱', 
      authProvince: '授权省份', 
      authCity: '授权市', 
      salesmanTel: '业务员手机号',
      province: '所在省份', 
      city: '所在城市', 
      businessMan: '业务联系人', 
      businessEmail:'业务邮箱',
      financialMan: '财务联系人', 
      financialEmail: '财务邮箱', 
      qdManager: '渠道经理', 
      qdManagerTel: '渠道经理手机号', 
      serverManager: '服务经理',
      serverManagerTel: '服务经理电话', 
      companyLogo: '企业LOGO',
      companyIcon: '企业ICON',
      businessLicense: '营业执照',
      openAccounts: '开户许可证',
      uploadFile: '上传文件',
      qdAddr: '渠道地址',
      familyName: '姓名',
      qdManagerName: '渠道经理姓名', 
      serverManagerName: '服务经理姓名', 
      orig_ssn: '原交易流水号', 
      channel_relationships: '渠道关系',
      qdLevel: '渠道级别',
    },
  },
  home: {
    titleBank: {
      title: '昨日数据'
    },
    dataBank:{
      tradeData:'交易数据',
      newNum:'新入网商户数',
      income:'净收入',      
    },
    lineBank:{
      tradeLine:'实时交易折线图',
      merchantLine:'渠道商户入网统计折线图',
      trade_x:'分钟/HH:MM',
      trade_y:'交易金额/',
      trade_d:'交易金额统计',
      merchant_x:'最近一周/MM-dd',
      merchant_y:'入网商户数/日期',
      merchant_d:'入网商户数',
    },
  },
  channelList: {
    titleBank: {
      title: '渠道信息列表'
    },
    searchBank:{  
      download:'渠道信息下载',         
    },
    bodyBank:{
      tipS:'确定要',
      tipE:'该渠道信息吗', 
      proSuccess:'开通增值产品成功!', 
      fixSuccess:'修改成功!',      
    },
  },
  merchantlList: {
    titleBank: {
      title: '商户信息列表'
    },
    searchBank:{  
      download:'商户信息下载',         
    },
    bodyBank:{
      feeDetail:'商户费率明细',
      feeWeixin:'微信费率',
      feeBao:'支付宝费率',
      feeJd:'京东费率',
      feeQQ:'QQ钱包费率',
      feeCard:'刷卡费率',
      settleCycle:'结算周期',  
      tipS:'确定要',
      tipE:'该商户',  
      merch_detail:'商户详情',  
      baseInfo:'基本信息',
      bankInfo:'银行账户信息',  
      shopInfo:'店铺信息',  
      merch_style:'商户类型:',  
      mobile:'手机号码:',  
      signed_entity:'签约实体:',  
      legal_name:'法人代表:',    
      legal_idnumber:'身份证号码:',  
      province:'省份:',  
      city:'城市:',  
      accountname:'账户名称:',   
      headbankname:'开户银行:',  
      bankname:'开户支行:',  
      bankaccount:'银行账号:',  
      banktype:'清算类型:',   
      bank_mobile:'银行预留手机号码:',  
      bankstatus:'银行卡状态:',  
      receiptname:'收据名称:', 
      mcc:'MCC:',   
      address:'经营地址:',   
      bank_city:'银行所在城市:', 
      getMoneyBank:'收款银行:',   
      bankAccountName:'银行卡号:',  
      bankOwnerName:'账户名称:',     
      cardType:'银行卡类型:',           
      settleType:'清算类型:',           
      noMend:'银行卡已在审核中，请耐心等待', 
    },
  },
  salesmanlList: {
    titleBank: {
      title: '业务员信息列表'
    },
    searchBank:{  
      download:'业务员信息下载',         
    },
    bodyBank:{
      businessStatistics:'业务统计',  
      month:'月份', 
      merchantNum:'发展商户数', 
      auditSucess:'审核成功', 
      auditError:'审核失败', 
      auditReject:'审核拒绝',  
      tradeMoney:'交易金额', 
      inactive:'确认注销', 
      removal:'原商户迁移',   
      total:'合计',   
      unitGe: '个',
    },
  },
  tradelList: {
    titleBank: {
      title: '交易管理'
    },
    searchBank:{  
      download:'交易流水下载',         
    },
    bodyBank:{   
    },
  },
  tradelDetail: {
    titleBank: {
      title: '交易明细'
    },
  },
  formMerchantin: {
    titleBank: {
      title: '商户入网统计'
    },
    bodyBank:{ 
      selTime: '开始时间（结束时间顺延一周）', 
      timePlace: '请选择开始日期', 
      lastWeek: '最近一周/MM-dd', 
      merInNum: '商户入网数',  
    },
  },
  formMer: {
    titleBank: {
      title: '商户交易统计'
    },
    bodyBank:{ 
      lineD: '交易金额', 
      lineY: '交易金额/', 
      lineX: '时间/小时',  
    },
  },
  chanelIn: {
    titleBank: {
      title: '渠道商户入网统计'
    },
    bodyBank:{ 
      selTime: '开始时间（结束时间顺延一周）', 
      timePlace: '请选择开始日期',
      lineY: '商户入网数', 
      lineX: '最近一周/天', 
      desDate: '日期', 
      desChannel: '下级渠道总商户入网量', 
      desChannelNum: '下级渠道个数', 
      unitPerson: '人', 
      unitGe: '个',
    },
  },
  forChanelTrade: {
    titleBank: {
      title: '渠道交易统计'
    },
    bodyBank:{ 
      lineY: '交易金额/', 
      lineX: '时间/小时', 
      desDate: '日期', 
      desChannel: '下级渠道总交易量', 
      desChannelNum: '下级渠道个数', 
      unitGe: '个',
    },
  },
  forSalesman: {
    titleBank: {
      title: '业务员统计'
    },
    bodyBank:{ 
      lineY: '签约商户数/人', 
      lineX: '时间/天', 
      desDate: '日期', 
      desChannel: '业务员入网商户总数', 
      desChannelNum: '业务员个数', 
      unitPerson: '人', 
      unitGe: '个',
    },
  },
  forLost: {
    titleBank: {
      title: '流失商户统计'
    },
    bodyBank:{ 
      
    },
  },
  ...zhLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
}
