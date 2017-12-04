<template>
  <div>
    <!-- 图片上传，保存ajax -->
    <div class="right_head">
      {{$t('generalPro.bodyBank.baseInfo')}}
    </div>
    <div class="right_body">
      <el-form :model="base" :rules="rules" ref="base" label-width="125px" class="demo-ruleForm">
        <el-row>
          <div class="step_show">
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.qdType')" prop="type">
                <el-select v-model="base.type" disabled>
                  <el-option v-for="channel in channels.records" v-bind:value="channel.tp" v-bind:label="channel.text">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.qdName2')" prop="name">
                <el-input v-model="base.name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.qdShortName')" prop="short_name">
                <el-input v-model="base.short_name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <div class="clearfix_liner1"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.ownerNname')" prop="legal_name">
                <el-input v-model="base.legal_name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.ownerId')" prop="legal_idnumber">
                <el-input v-model="base.legal_idnumber" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.tel2')" prop="mobile">
                <el-input v-model="base.mobile" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.country')" prop="country">
                <el-input v-model="base.country" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.timeZone')" prop="timezone">
                <el-input v-model="base.timezone" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.currency')" prop="currency">
                <el-input v-model="base.currency" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.regEmail')" prop="email">
                <el-input v-model="base.email" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <div class="clearfix_liner1"></div>
            </el-col>
            <template v-for="(item,index) in base.auth_areas">
              <el-col :xs="24" :sm="24" :md="12" :lg="8">
                <el-form-item :label="$t('generalPro.bodyBank.authProvince')" :prop="'auth_areas.' + index + '.auth_province'" :key="item.key" :rules="[{required: true,message:$t('yanzheng.authProSel'),trigger: 'change'}]">
                  <el-input v-model="item.auth_province" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8">
                <el-form-item :label="$t('generalPro.bodyBank.authCity')" :prop="'auth_areas.' + index + '.auth_city'" :key="item.key" :rules="[{required: false,message: $t('yanzheng.authCitySel'),trigger: 'change'}]">
                  <el-input v-model="item.auth_city" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24"></el-col>
            </template>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <div class="clearfix_liner1"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.salesmanTel')" prop="slsm_mobile">
                <el-input v-model="base.slsm_mobile" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <!-- <el-form-item label="所在省份" prop="province">
                                <el-select v-model="base.province" placeholder="请选择所在省份" disabled v-on:change="select_pro">
                                    <el-option v-for="province in pro_city" v-bind:areaid="province.areaid" v-bind:value="province.areaname" v-bind:label="province.areaname">
                                    </el-option>
                                </el-select>
                            </el-form-item> -->
              <el-form-item :label="$t('generalPro.bodyBank.province')" prop="province">
                <el-input v-model="base.province" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <!-- <el-form-item label="所在城市" prop="city">
                                <el-select v-model="base.city" placeholder="请选择所在城市" disabled>
                                    <el-option v-for="city in citys" v-bind:cityid="city.cityid" v-bind:value="city.cityname" v-bind:label="city.cityname">
                                    </el-option>
                                </el-select>
                            </el-form-item> -->
              <el-form-item :label="$t('generalPro.bodyBank.city')" prop="city">
                <el-input v-model="base.city" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <div class="clearfix_liner1"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.businessMan')" prop="business_name">
                <el-input v-model="base.business_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.tel2')" prop="business_mobile">
                <el-input v-model="base.business_mobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.businessEmail')" prop="business_email">
                <el-input v-model="base.business_email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.financialMan')" prop="finace_name">
                <el-input v-model="base.finace_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.tel2')" prop="finace_mobile">
                <el-input v-model="base.finace_mobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.financialEmail')" prop="finace_email">
                <el-input v-model="base.finace_email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <div class="clearfix_liner1"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.qdManager')" prop="manager_name">
                <el-input v-model="base.manager_name" :placeholder="$t('generalPro.bodyBank.familyName')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.qdManagerTel')" prop="manager_mobile">
                <el-input v-model="base.manager_mobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <div class="clearfix"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.serverManager')" prop="service_manager_name">
                <el-input v-model="base.service_manager_name" :placeholder="$t('generalPro.bodyBank.familyName')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.serverManagerTel')" prop="service_manager_mobile">
                <el-input v-model="base.service_manager_mobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <div class="clearfix_liner1"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.companyLogo')" prop="logo_url">
                <div class="el_pic" id="logo_url">
                  <dl>
                    <form name="regis_pic0" id="regis_pic0" enctype="multipart/form-data">
                      <dd class="opload_img" id="preview0">
                        <img data-mame="logo_url" v-bind:src="base.logo_url" @click="showpic($event)">
                      </dd>
                      <dd class="tips"><i class="el-icon-warning"></i></dd>
                      <dd class="ipload disa">
                        <input type="file" name="logo_url" size="32" accept="image/png,image/jpg,image/jpeg" class="file file_style" value="" v-on:change="upload_pic($event,0,'logo_url')" disabled="disabled" />{{$t('generalPro.bodyBank.uploadFile')}}
                      </dd>
                      <input type="hidden" name="tag" value="logo_url" />
                      <input type="hidden" name="category" value="2" />
                      <input type="hidden" name="source" value="1" />
                    </form>
                  </dl>
                </div>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.companyIcon')" prop="icon_url">
                <div class="el_pic" id="icon_url">
                  <dl>
                    <form name="regis_pic3" id="regis_pic3" enctype="multipart/form-data">
                      <dd class="opload_img" id="preview3">
                        <img data-mame="icon_url" v-bind:src="base.icon_url" @click="showpic($event)">
                      </dd>
                      <dd class="tips"><i class="el-icon-warning"></i></dd>
                      <dd class="ipload disa">
                        <input type="file" name="icon_url" size="32" accept="image/png,image/jpg,image/jpeg" class="file file_style" value="" v-on:change="upload_pic($event,3,'icon_url')" disabled="disabled" />{{$t('generalPro.bodyBank.uploadFile')}}
                      </dd>
                      <input type="hidden" name="tag" value="icon_url" />
                      <input type="hidden" name="category" value="2" />
                      <input type="hidden" name="source" value="1" />
                    </form>
                  </dl>
                </div>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.businessLicense')" prop="business_license_url">
                <div class="el_pic" id="business_license_url">
                  <dl>
                    <form name="regis_pic1" id="regis_pic1" enctype="multipart/form-data">
                      <dd class="opload_img" id="preview1">
                        <img data-mame="business_license_url" v-bind:src="base.business_license_url" @click="showpic($event)">
                      </dd>
                      <dd class="tips"><i class="el-icon-warning"></i></dd>
                      <dd class="ipload disa">
                        <input type="file" name="business_license_url" size="32" accept="image/png,image/jpg,image/jpeg" class="file file_style" value="" v-on:change="upload_pic($event,1,'business_license_url')" disabled="disabled" />{{$t('generalPro.bodyBank.uploadFile')}}
                      </dd>
                      <input type="hidden" name="tag" value="business_license_url" />
                      <input type="hidden" name="category" value="2" />
                      <input type="hidden" name="source" value="1" />
                    </form>
                  </dl>
                </div>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8">
              <el-form-item :label="$t('generalPro.bodyBank.openAccounts')" prop="bank_account_url">
                <div class="el_pic" id="bank_account_url">
                  <dl>
                    <form name="regis_pic2" id="regis_pic2" enctype="multipart/form-data">
                      <dd class="opload_img" id="preview2">
                        <img data-mame="bank_account_url" v-bind:src="base.bank_account_url" @click="showpic($event)">
                      </dd>
                      <dd class="tips"><i class="el-icon-warning"></i></dd>
                      <dd class="ipload disa">
                        <input type="file" name="bank_account_url" size="32" accept="image/png,image/jpg,image/jpeg" class="file file_style" value="" v-on:change="upload_pic($event,2,'bank_account_url')" disabled="disabled" />{{$t('generalPro.bodyBank.uploadFile')}}
                      </dd>
                      <input type="hidden" name="tag" value="bank_account_url" />
                      <input type="hidden" name="category" value="2" />
                      <input type="hidden" name="source" value="1" />
                    </form>
                  </dl>
                </div>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="16">
              <el-form-item :label="$t('generalPro.bodyBank.qdAddr')" prop="address">
                <el-input v-model="base.address"></el-input>
              </el-form-item>
            </el-col>
          </div>
          <div class="m_t_20 t_c">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <el-button type="primary" @click="mend('base')">{{$t('app.modify')}}</el-button>
              <el-button @click="goback">{{$t('app.return')}}</el-button>
            </el-col>
          </div>
        </el-row>
      </el-form>
    </div>
    <el-dialog title="" v-model="big_pic_show">
      <div class="big_pic"><img v-bind:src="big_pic_url"></div>
    </el-dialog>
    <load :visible="loading"></load>
    <toast :msg="toastmsg" :visible="visible_toast" @on-visible-change="onVisibleChange" @on-msg-change="onMsgChange"></toast>
  </div>
</template>
<script>
import yanzheng from '../../method/yanzheng'
export default {
  name: 'channel_base',
  data() {
    return {
      big_pic_show: false, //大图弹框是否显示
      big_pic_url: '', //弹框中大图绑定的地址
      loading: false, //load是否显示
      toastmsg: '', //提示文字
      visible_toast: false, //toast是否显示
      email_pre: '', //可以不用，没有预注册接口
      mobile_pre: '', //可以不用，没有预注册接口
      idnumber_pre: '', //可以不用，没有预注册接口
      channels: {}, //ajax获取
      pro_city: [], //ajax获取
      citys: [],
      pro_authcity: [], //ajax获取
      authcitys: [],
      base: {
        "email": "", // 注册邮箱
        "type": '', // 渠道类型: 1 白牌, 2 联名
        "slsm_uid": '', // 所属业务员ID, 可空
        "slsm_mobile": '', //所属业务员手机号
        "mobile": '',

        "name": "", // 渠道名称
        "short_name": "", // 渠道简称
        "legal_name": "", // 法人姓名
        "legal_idnumber": "", // 法人省份证号码
        "province": "", // 所在省份
        "city": "", // 所在城市
        "address": "", // 商户地址
        "business_name": "", // 业务联系人姓名
        "business_mobile": "", // 业务联系人手机号
        "business_email": "", // 业务联系人邮箱
        "finace_name": "", // 财务联系人姓名
        "finace_mobile": "", // 财务联系人手机号
        "finace_email": "", // 财务联系人邮箱
        "logo_url": "/qudao/v1/static/login/img/ic_img.png", // 企业LOGO的URL
        "icon_url": "/qudao/v1/static/login/img/ic_img.png", // 企业ICON
        "business_license_url": "/qudao/v1/static/login/img/ic_img.png", // 营业执照
        "bank_account_url": "/qudao/v1/static/login/img/ic_img.png", // 开户许可证
        "country": "", // 国家
        "timezone": "", // 时区
        "currency": "", // 币种
        'auth_areas': [{ "auth_province": "", "auth_city": "" }], //地址列表-----------地址列表
        "manager_name": "", // 渠道经理
        "manager_mobile": "", // 渠道经理电话
        "service_manager_name": "", // 渠道服务经理
        "service_manager_mobile": "", // 渠道服务经理电话
      },
      qd_types_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/qd_types', //渠道类型
      qd_areacities_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/areacities', //省份城市列表
      qd_info_url: location.protocol + '//' + location.host + '/qudao/v1/api/qd/' + this.$route.params.userid + '/base_info', //渠道类型                                                  
      channels_over: false, //渠道调用完成为true
      pro_over: false, //省份调用完成为true
      rules: {
        name: yanzheng.test_qd_name(this.$t('generalPro.bodyBank.qdName'), 1, 30, true, 'blur', this),
        short_name: yanzheng.test_qd_name(this.$t('generalPro.bodyBank.qdShortName'), 1, 30, true, 'blur', this),
        legal_name: yanzheng.test_chinese(this.$t('generalPro.bodyBank.ownerNname'), 1, 4, true, 'blur', this),
        email: yanzheng.test_email(true, 'blur', this),
        mobile: yanzheng.test_tel(this.$t('generalPro.bodyBank.tel2'), true, 'blur', this),
        legal_idnumber: yanzheng.test_idNumber(true, 'blur', this),
        type: yanzheng.test_select(this.$t('generalPro.bodyBank.qdType'), true, 'change', this, "number"),
        slsm_mobile: yanzheng.test_tel(this.$t('generalPro.bodyBank.salesmanTel'), true, 'blur', this),
        business_name: yanzheng.test_chinese(this.$t('generalPro.bodyBank.businessMan'), 1, 4, true, 'blur', this),
        business_mobile: yanzheng.test_tel(this.$t('generalPro.bodyBank.tel2'), true, 'blur', this),
        business_email: yanzheng.test_email(false, 'blur', this),
        finace_name: yanzheng.test_chinese(this.$t('generalPro.bodyBank.financialMan'), 1, 4, false, 'blur', this),
        finace_mobile: yanzheng.test_tel(this.$t('generalPro.bodyBank.tel2'), false, 'blur', this),
        finace_email: yanzheng.test_email(false, 'blur', this),
        address: yanzheng.test_any(this.$t('generalPro.bodyBank.qdAddr'), 1, 100, true, 'blur', this),
        province: yanzheng.test_select(this.$t('generalPro.bodyBank.province'), true, 'change', this),
        city: yanzheng.test_select(this.$t('generalPro.bodyBank.city'), true, 'change', this),
        logo_url: [{
          required: true,
          pattern: /^(http)/,
          message: this.$t('yanzheng.picture'),
          trigger: 'change'
        }],
        icon_url: [{
          required: true,
          pattern: /^(http)/,
          message: this.$t('yanzheng.picture'),
          trigger: 'change'
        }],
        business_license_url: [{
          required: false,
          pattern: /(?=\/qudao\/v1\/static\/login\/img\/ic_img.png)|(^(http))/,
          message: this.$t('yanzheng.picture'),
          trigger: 'change'
        }],
        bank_account_url: [{
          required: false,
          pattern: /(?=\/qudao\/v1\/static\/login\/img\/ic_img.png)|(^(http))/,
          message: this.$t('yanzheng.picture'),
          trigger: 'change'
        }],
        country: yanzheng.test_select(this.$t('generalPro.bodyBank.country'), true, 'change', this),
        timezone: yanzheng.test_select(this.$t('generalPro.bodyBank.timeZone'), true, 'change', this),
        currency: yanzheng.test_select(this.$t('generalPro.bodyBank.currency'), true, 'change', this),
        manager_name: yanzheng.test_chinese(this.$t('generalPro.bodyBank.qdManagerName'), 1, 4, false, 'blur', this),
        manager_mobile: yanzheng.test_tel(this.$t('generalPro.bodyBank.qdManagerTel'), false, 'blur', this),
        service_manager_name: yanzheng.test_chinese(this.$t('generalPro.bodyBank.serverManagerName'), 1, 4, false, 'blur', this),
        service_manager_mobile: yanzheng.test_telephone(this.$t('generalPro.bodyBank.serverManagerTel'), false, 'blur', this),
      },
    }
  },
  created: function() {
    this.get_qdtypes(); //获取渠道类型   
    //this.get_area(); //获取省份城市--省份城市不能修改，故不获取城市列表
  },
  watch: {
    channels_over: function(val, oldVal) {
      let _this = this;
      // if (_this.channels_over && _this.pro_over) {
      //     _this.get_info(); //获取基本信息--省份城市不能修改，故不判断城市列表已获取完
      // }
      if (_this.channels_over) {
        _this.get_info(); //获取基本信息
      }
    },
    pro_over: function(val, oldVal) {
      //获取省份城市--省份城市不能修改，故不获取城市列表--停用
      let _this = this;
      if (_this.channels_over && _this.pro_over) {
        _this.get_info(); //获取基本信息
      }
    },
    // 'base.province': function(val, oldVal) {
    //     for (var i = 0; i < this.pro_city.length; i++) {
    //         if (this.pro_city[i].areaname == this.base.province) {
    //             this.citys = this.pro_city[i].cities;
    //             this.base.city = this.base.city;
    //             return false;
    //         } else {
    //             this.citys = [];
    //         }
    //     }
    // },
  },
  methods: {
    //监听toast是否可见的值得变化
    onVisibleChange(val) {
      this.visible_toast = val; //④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
    },
    //监听toast内容的值得变化
    onMsgChange(val) {
      this.toastmsg = val; //④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
    },
    goback: function() {
      this.$router.go(-1);
    },
    mend(formName) {
      var _this = this;
      //上传图片--不能上传图片，所以该函数没有使用
      var logo_url = document.getElementById('logo_url');
      var icon_url = document.getElementById('icon_url');
      var url_reg = /^(http)/;
      if (url_reg.test(_this.base.logo_url)) {
        logo_url.className = 'el_pic';
      } else {
        logo_url.className = 'el_pic error';
      }
      if (url_reg.test(_this.base.icon_url)) {
        icon_url.className = 'el_pic';
      } else {
        icon_url.className = 'el_pic error';
      }
      var business_license_url = document.getElementById('business_license_url');
      var bank_account_url = document.getElementById('bank_account_url');
      var url_reg2 = /(?=\/qudao\/v1\/static\/login\/img\/ic_img.png)|(^(http))/;
      if (url_reg2.test(_this.base.business_license_url)) {
        business_license_url.className = 'el_pic';
      } else {
        business_license_url.className = 'el_pic error';
      }
      if (url_reg2.test(_this.base.bank_account_url)) {
        bank_account_url.className = 'el_pic';
      } else {
        bank_account_url.className = 'el_pic error';
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //提交修改ajax--todo
          _this.fix_info();
        }
      });
    },
    //获取特定渠道的基本信息
    get_info: function() {
      var _this = this;
      this.$ajax_log.ajax_get(this, this.qd_info_url, '', (data_return) => {
        _this.base = data_return.data;
        //如果url为空，给图片赋默认值
        if (_this.base.logo_url.length <= 0) {
          _this.base.logo_url = '/qudao/v1/static/login/img/ic_img.png';
        }
        if (_this.base.icon_url.length <= 0) {
          _this.base.icon_url = '/qudao/v1/static/login/img/ic_img.png';
        }
        if (_this.base.business_license_url.length <= 0) {
          _this.base.business_license_url = '/qudao/v1/static/login/img/ic_img.png';
        }
        if (_this.base.bank_account_url.length <= 0) {
          _this.base.bank_account_url = '/qudao/v1/static/login/img/ic_img.png';
        }
        //给预注册的3个信息初次赋值--没有预注册，可以不用
        // _this.email_pre = _this.base.email;
        // _this.mobile_pre = _this.base.mobile;
        // _this.idnumber_pre = _this.base.legal_idnumber;
      });
      // this.$http.get(this.qd_info_url, {
      //         before: function() {
      //             _this.loading = true;
      //         }
      //     })
      //     .then(function(response) {
      //         _this.loading = false;
      //         var data_return = response.body;
      //         if (data_return.respcd == '0000') {
      //             _this.base = data_return.data;
      //             //如果url为空，给图片赋默认值
      //             if (_this.base.logo_url.length <= 0) {
      //                 _this.base.logo_url = '/qudao/v1/static/login/img/ic_img.png';
      //             }
      //             if (_this.base.icon_url.length <= 0) {
      //                 _this.base.icon_url = '/qudao/v1/static/login/img/ic_img.png';
      //             }
      //             if (_this.base.business_license_url.length <= 0) {
      //                 _this.base.business_license_url = '/qudao/v1/static/login/img/ic_img.png';
      //             }
      //             if (_this.base.bank_account_url.length <= 0) {
      //                 _this.base.bank_account_url = '/qudao/v1/static/login/img/ic_img.png';
      //             }
      //             //给预注册的3个信息初次赋值--没有预注册，可以不用
      //             // _this.email_pre = _this.base.email;
      //             // _this.mobile_pre = _this.base.mobile;
      //             // _this.idnumber_pre = _this.base.legal_idnumber;
      //         } else {
      //             if (data_return.respmsg) {
      //                 _this.toastmsg = data_return.respmsg;
      //             } else {
      //                 _this.toastmsg = data_return.resperr;
      //             }
      //             _this.visible_toast = true;
      //         }
      //     }, function(response) {
      //         _this.loading = false;
      //         _this.visible_toast = true;
      //         _this.toastmsg = '网络超时!';
      //     })
      //     .catch(function(response) {
      //         _this.loading = false;
      //     });
      // _this.base = {
      //     "userid": 123, // 渠道编号
      //     "status": 0, // 渠道状态: 0 启用, 1 禁用
      //     "join_dtm": "2016-01-01 12:22:23", // 注册时间
      //     "email": "chen@qfpay.com", // 注册邮箱
      //     "type": 2, // 渠道类型: 1 白牌, 2 联名
      //     "slsm_uid": 123, // 所属业务员ID

      //     "name": "四川渠道01", // 渠道名称
      //     "short_name": "川01", // 渠道简称
      //     "legal_name": "王二", // 法人姓名
      //     "legal_idnumber": "511325197001013333", // 法人省份证号码
      //     "province": "河南省", // 所在省份
      //     "city": "郑州市", // 所在城市
      //     "address": "郑州市金水区", // 商户地址
      //     "business_name": "李二", // 业务联系人姓名
      //     "business_mobile": "13012340000", // 业务联系人手机号
      //     "business_email": "lier@qfpay.com", // 业务联系人邮箱
      //     "finace_name": "李二", // 财务联系人姓名
      //     "finace_mobile": "13012340000", // 财务联系人手机号
      //     "finace_email": "lier@qfpay.com", // 财务联系人邮箱
      //     "logo_url": "", // 企业LOGO的URL
      //     "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
      //     "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
      //     "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
      // };
      //设置初始值
      //_this.base.type = _this.channels.default;
    },
    //修改特定渠道的基本信息
    fix_info: function() {
      let _this = this;
      let post_data = _this.base;
      //如果没有上传一下两个图片，设置值为空
      if (_this.base.business_license_url == '/qudao/v1/static/login/img/ic_img.png') {
        _this.base.business_license_url = '';
      }
      if (_this.base.bank_account_url == '/qudao/v1/static/login/img/ic_img.png') {
        _this.base.bank_account_url = '';
      }
      this.$ajax_log.ajax_post(this, this.qd_info_url, post_data, (data_return) => {
        _this.visible_toast = true;
        _this.toastmsg = _this.$t('channelList.bodyBank.fixSuccess');
        if (_this.base.business_license_url.length <= 0) {
          _this.base.business_license_url = '/qudao/v1/static/login/img/ic_img.png';
        }
        if (_this.base.bank_account_url.length <= 0) {
          _this.base.bank_account_url = '/qudao/v1/static/login/img/ic_img.png';
        }
      }, (data_return) => {
        if (_this.base.business_license_url.length <= 0) {
          _this.base.business_license_url = '/qudao/v1/static/login/img/ic_img.png';
        }
        if (_this.base.bank_account_url.length <= 0) {
          _this.base.bank_account_url = '/qudao/v1/static/login/img/ic_img.png';
        }
      }, (data_return) => {
        if (_this.base.business_license_url.length <= 0) {
          _this.base.business_license_url = '/qudao/v1/static/login/img/ic_img.png';
        }
        if (_this.base.bank_account_url.length <= 0) {
          _this.base.bank_account_url = '/qudao/v1/static/login/img/ic_img.png';
        }
      });
      // this.$http.post(this.qd_info_url, post_data, {
      //         before: function() {
      //             _this.loading = true;
      //         }
      //     })
      //     .then(function(response) {
      //         _this.loading = false;
      //         let data_return = response.body;
      //         if (data_return.respcd == '0000') {
      //             _this.visible_toast = true;
      //             _this.toastmsg = '修改成功!';
      //         } else {
      //             if (data_return.respmsg) {
      //                 _this.toastmsg = data_return.respmsg;
      //             } else {
      //                 _this.toastmsg = data_return.resperr;
      //             }
      //             _this.visible_toast = true;
      //         }
      //         if (_this.base.business_license_url.length <= 0) {
      //             _this.base.business_license_url = '/qudao/v1/static/login/img/ic_img.png';
      //         }
      //         if (_this.base.bank_account_url.length <= 0) {
      //             _this.base.bank_account_url = '/qudao/v1/static/login/img/ic_img.png';
      //         }
      //     }, function(response) {
      //         _this.loading = false;
      //         _this.visible_toast = true;
      //         _this.toastmsg = '网络超时!';
      //         if (_this.base.business_license_url.length <= 0) {
      //             _this.base.business_license_url = '/qudao/v1/static/login/img/ic_img.png';
      //         }
      //         if (_this.base.bank_account_url.length <= 0) {
      //             _this.base.bank_account_url = '/qudao/v1/static/login/img/ic_img.png';
      //         }
      //     })
      //     .catch(function(response) {
      //         _this.loading = false;
      //         if (_this.base.business_license_url.length <= 0) {
      //             _this.base.business_license_url = '/qudao/v1/static/login/img/ic_img.png';
      //         }
      //         if (_this.base.bank_account_url.length <= 0) {
      //             _this.base.bank_account_url = '/qudao/v1/static/login/img/ic_img.png';
      //         }
      //     });
    },
    //获取渠道类型列表
    get_qdtypes: function() {
      var _this = this;
      this.$ajax_log.ajax_get(this, this.qd_types_url, '', (data_return) => {
        _this.channels = data_return.data;
        //设置初始值
        _this.base.type = _this.channels.default;
        _this.channels_over = true;
      });
      // this.$http.get(this.qd_types_url, {
      //         before: function() {
      //             _this.loading = true;
      //         }
      //     })
      //     .then(function(response) {
      //         _this.loading = false;
      //         var data_return = response.body;
      //         if (data_return.respcd == '0000') {
      //             _this.channels = data_return.data;
      //             //设置初始值
      //             _this.base.type = _this.channels.default;
      //             _this.channels_over = true;
      //         } else {
      //             if (data_return.respmsg) {
      //                 _this.toastmsg = data_return.respmsg;
      //             } else {
      //                 _this.toastmsg = data_return.resperr;
      //             }
      //             _this.visible_toast = true;
      //         }
      //     }, function(response) {
      //         _this.loading = false;
      //         _this.visible_toast = true;
      //         _this.toastmsg = '网络超时!';
      //     })
      //     .catch(function(response) {
      //         _this.loading = false;
      //     });
      // _this.channels = {
      //     "records": [{
      //         "tp": 0,
      //         "text": ""
      //     }, {
      //         "tp": 1,
      //         "text": "白牌"
      //     }, {
      //         "tp": 2,
      //         "text": "联名"
      //     }, ],
      //     "default": 1 // 默认tp
      // };
      // //设置初始值
      // _this.base.type = _this.channels.default;
      // _this.channels_over = true;
    },
    //点击查看大图，目前未使用改功能
    showpic: function(e) {
      this.big_pic_url = e.target.currentSrc;
      this.big_pic_show = true;
    },
    //授权省份值变化后，授权市也变化
    select_authpro: function() {
      for (let i = 0; i < this.pro_authcity.length; i++) {
        if (this.pro_authcity[i].areaname == this.base.auth_province) {
          this.authcitys = this.pro_authcity[i].cities;
          this.base.auth_city = this.authcitys[0].cityname;
          return false;
        } else {
          this.authcitys = [];
        }
      }
    },
    //省份值变化后，市也变化
    select_pro: function() {
      for (var i = 0; i < this.pro_city.length; i++) {
        if (this.pro_city[i].areaname == this.base.province) {
          this.citys = this.pro_city[i].cities;
          this.base.city = this.citys[0].cityname;
          return false;
        } else {
          this.citys = [];
        }
      }
    },
    //获取省份城市列表，目前未使用改功能
    get_area: function() {
      var _this = this;
      this.$ajax_log.ajax_get(this, this.qd_areacities_url, '', (data_return) => {
        _this.pro_city = data_return.data.records;
        //设置初始值
        _this.base.province = _this.pro_city[0].areaname;
        _this.citys = _this.pro_city[0].cities;
        _this.base.city = _this.citys[0].cityname;
        _this.pro_over = true;
      });
      // this.$http.get(this.qd_areacities_url, {
      //         before: function() {
      //             _this.loading = true;
      //         }
      //     })
      //     .then(function(response) {
      //         _this.loading = false;
      //         var data_return = response.body;
      //         if (data_return.respcd == '0000') {
      //             _this.pro_city = data_return.data.records;
      //             //设置初始值
      //             _this.base.province = _this.pro_city[0].areaname;
      //             _this.citys = _this.pro_city[0].cities;
      //             _this.base.city = _this.citys[0].cityname;
      //             _this.pro_over = true;
      //         } else {
      //             if (data_return.respmsg) {
      //                 _this.toastmsg = data_return.respmsg;
      //             } else {
      //                 _this.toastmsg = data_return.resperr;
      //             }
      //             _this.visible_toast = true;
      //         }
      //     }, function(response) {
      //         _this.loading = false;
      //         _this.visible_toast = true;
      //         _this.toastmsg = '网络超时!';
      //     })
      //     .catch(function(response) {
      //         _this.loading = false;
      //     });
      // _this.pro_city = [{
      //     "areaid": 13, //省id
      //     "areaname": '河北省', //省
      //     "cities": [{
      //         "cityid": 1301, //市id
      //         "cityname": "石家庄市" //市
      //     }, {
      //         "cityid": 1302, //市id
      //         "cityname": "秦皇岛市" //市
      //     }]
      // }, {
      //     "areaid": 14, //省id
      //     "areaname": '河南省', //省
      //     "cities": [{
      //         "cityid": 1401, //市id
      //         "cityname": "娄阳市", //市
      //     }, {
      //         "cityid": 1402, //市id
      //         "cityname": "洛阳市", //市
      //     }, {
      //         "cityid": 1403, //市id
      //         "cityname": "郑州市", //市
      //     }]
      // }, {
      //     "areaid": 15, //省id
      //     "areaname": '四川省', //省
      //     "cities": [{
      //         "cityid": 1501, //市id
      //         "cityname": "成都市" //市
      //     }]
      // }, {
      //     "areaid": 16, //省id
      //     "areaname": '湖南省', //省
      //     "cities": [{
      //         "cityid": 1601, //市id
      //         "cityname": "长沙市" //市
      //     }, {
      //         "cityid": 1602, //市id
      //         "cityname": "秦皇岛市" //市
      //     }]
      // }, {
      //     "areaid": 17, //省id
      //     "areaname": '新疆', //省
      //     "cities": [{
      //         "cityid": 1701, //市id
      //         "cityname": "哈萨克" //市
      //     }]
      // }, ];
      // //设置初始值
      // _this.base.province = _this.pro_city[0].areaname;
      // _this.citys = _this.pro_city[0].cities;
      // _this.base.city = _this.citys[0].cityname;
      // _this.pro_over = true;
    },
    //上传图片--图片禁止修改，目前未使用改功能
    upload_pic: function(e, n, name) {
      //console.log(e)
      var _this = this;
      var a = 0;
      var MAXWIDTH = 200;
      var MAXHEIGHT = 300;
      var div = document.getElementById('preview' + n);
      var file = e.target;
      //console.log(e.target.files[0]);
      var file_ajax = file.files[0];
      var file_name = file_ajax.name;
      var file_size = file_ajax.size;
      var file_type = file_ajax.type;
      if (file_size > 1024 * 1024 * 10) {
        _this.visible_toast = true;
        _this.toastmsg = _this.$t('yanzheng.pictureLength');
        div.className = 'opload_img error_data';
        return false;
      } else {
        div.className = 'opload_img';
      }
      if (file.files.length > 0) {
        if (file.files && file.files[0]) {
          var img = div.firstChild;
          img.onload = function() {
            var rect = _this.clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
            //img.style.marginLeft = rect.left+'px';
            //img.style.marginTop = rect.top + 'px';
          }
          var reader = new FileReader();
          reader.onload = function(evt) {
            img.src = evt.target.result;
            var quality = 50;
            img.src = _this.compress(img, quality).src;
          }
          reader.readAsDataURL(file.files[0]);
        } else //兼容IE
        {
          var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
          file.select();
          var src = document.selection.createRange().text;
          div.innerHTML = '<img id=imghead' + n + '>';
          var img = document.getElementById('imghead' + n);
          img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
          var rect = _this.clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
          status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
          div.innerHTML = "<div id=divhead" + n + " style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
        }
      }
      var formdata = new FormData(document.getElementById('regis_pic' + n));
      var file = document.getElementById('regis_pic' + n)[0].files[0];
      //console.log(file);
      formdata.append('file', file);
      formdata.append('file_name', file_name);
      formdata.append('file_size', file_size);
      formdata.append('file_type', file_type);
      formdata.append('category', 2);
      formdata.append('source', 1);
      formdata.append('tag', name);
      formdata.append('userid', _this.userid);
      //console.log(formdata);
      // let post_data = {
      //     'category': 2,
      //     'source': 1,
      //     'tag': name,
      //     'file': file,
      //     'userid': _this.userid,
      // };
      // console.log(post_data);
      this.$ajax_log.ajax_post(this, this.uploadfile_url, formdata, (data_return) => {
        let div = document.getElementById(name);
        _this.base[name] = data_return.data.url;
        //document.getElementById('imghead' + n).src=data_return.data.url;
        div.className = 'el_pic';
      }, (data_return) => {
        let div = document.getElementById(name);
        div.className = 'el_pic';
      }, (data_return) => {
        let div = document.getElementById(name);
        div.className = 'el_pic';
      });
      // this.$http.post(this.uploadfile_url, formdata, {
      //         before: function() {
      //             _this.loading = true;
      //         }
      //     })
      //     .then(function(response) {
      //         _this.loading = false;
      //         let data_return = response.body;
      //         let div = document.getElementById(name);
      //         if (data_return.respcd == '0000') {
      //             _this.base[name] = data_return.data.url;
      //             //document.getElementById('imghead' + n).src=data_return.data.url;
      //             div.className = 'el_pic';
      //         } else {
      //             div.className = 'el_pic error';
      //             if (data_return.respmsg) {
      //                 _this.toastmsg = data_return.respmsg;
      //             } else {
      //                 _this.toastmsg = data_return.resperr;
      //             }
      //             _this.visible_toast = true;
      //         }
      //     }, function(response) {
      //         let div = document.getElementById(name);
      //         div.className = 'el_pic error';
      //         _this.loading = false;
      //         _this.visible_toast = true;
      //         _this.toastmsg = '网络超时!';
      //     })
      //     .catch(function(response) {
      //         let div = document.getElementById(name);
      //         div.className = 'el_pic';
      //         _this.loading = false;
      //     });
    },
    //设置图片宽高和位置--图片禁止修改，目前未使用改功能
    clacImgZoomParam: function(maxWidth, maxHeight, width, height) {
      var param = {
        top: 0,
        left: 0,
        width: width,
        height: height
      };
      if (width > maxWidth || height > maxHeight) {
        var rateWidth = width / maxWidth;
        var rateHeight = height / maxHeight;

        if (rateWidth > rateHeight) {
          param.width = maxWidth;
          param.height = Math.round(height / rateWidth);
        } else {
          param.width = Math.round(width / rateHeight);
          param.height = maxHeight;
        }
      }
      param.left = Math.round((maxWidth - param.width) / 2);
      param.top = Math.round((maxHeight - param.height) / 2);
      return param;
    },
    //图片压缩--图片禁止修改，目前未使用改功能
    compress: function(source_img_obj, quality, output_format) {
      var mime_type = "image/jpeg";
      if (output_format != undefined && output_format == "png") {
        mime_type = "image/png";
      }
      var cvs = document.createElement('canvas');
      //naturalWidth真实图片的宽度
      cvs.width = source_img_obj.naturalWidth;
      cvs.height = source_img_obj.naturalHeight;
      var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
      var newImageData = cvs.toDataURL(mime_type, quality / 100);
      var result_image_obj = new Image();
      result_image_obj.src = newImageData;
      return result_image_obj;
    },
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">


</style>
