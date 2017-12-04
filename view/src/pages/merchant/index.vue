<template>
  <div>
    <div class="right_head">
      {{$t('merchantlList.titleBank.title')}}
    </div>
    <div class="right_body">
      <el-form label-width="110px" class="demo-ruleForm" :model="searchkey" :rules="searchkey_rule" ref="searchkey">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item :label="$t('generalPro.searchBank.qdNum')" prop="id">
              <el-input v-model.trim="searchkey.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item :label="$t('generalPro.searchBank.qdName')" prop="name">
              <el-input v-model.trim="searchkey.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="7">
            <el-form-item :label="$t('generalPro.searchBank.timeRange')">
              <el-date-picker v-model="searchkey.daterange" type="daterange" align="right" :placeholder="$t('generalPro.searchBank.timeRangeD')" :picker-options="pickerOptions" :editable="false" @change="time_change">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="5">
            <el-form-item :label="$t('generalPro.searchBank.merNum')" prop="userid">
              <el-input v-model.trim="searchkey.userid"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item :label="$t('generalPro.searchBank.merName')" prop="shopname">
              <el-input v-model.trim="searchkey.shopname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item :label="$t('generalPro.searchBank.tel')" prop="mobile">
              <el-input v-model.trim="searchkey.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item :label="$t('generalPro.searchBank.salesman')" prop="slsm_name">
              <el-input v-model.trim="searchkey.slsm_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item :label="$t('generalPro.searchBank.sonMer')" prop="mchid">
              <el-input v-model.trim="searchkey.mchid"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item :label="$t('generalPro.searchBank.auditStatus')">
              <!-- <el-select v-model="searchkey.audit_statuses" :placeholder="searchkey.audit_statuses.length>0?'':$t('generalPro.searchBank.auditStatusD')" multiple>
                <el-option v-for="item in check_status" v-bind:value="item.name" v-bind:label="item.name">
                </el-option>
              </el-select> -->
              <el-select v-model="searchkey.audit_statuses" placeholder="" multiple>
                <el-option v-for="item in check_status" v-bind:value="item.name" v-bind:label="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label-width="0" class="t_c">
              <!-- <el-button type="default" @click="fresh_sub">刷新</el-button> -->
              <el-button type="primary" @click="search_sub">{{$t('app.search')}}</el-button>
              <el-button type="default" @click="download_sub" v-show="$store.state.language!=='en'">{{$t('merchantlList.searchBank.download')}}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template>
        <el-table :data="merchants_now" border stripe style="width: 100%">
          <el-table-column prop="qd_info.base.userid" :label="$t('generalPro.bodyBank.qdNum')" resizable min-width="80px" fixed>
          </el-table-column>
          <el-table-column prop="qd_info.base.name" :label="$t('generalPro.bodyBank.qdName')" resizable min-width="120px">
          </el-table-column>
          <el-table-column prop="userid" :label="$t('generalPro.bodyBank.merNum')" resizable min-width="100px">
          </el-table-column>
          <el-table-column prop="shopname" :label="$t('generalPro.bodyBank.merName')" resizable min-width="120px">
          </el-table-column>
          <el-table-column :label="$t('generalPro.bodyBank.merFee')" resizable min-width="100px">
            <template scope="scope">
              <div v-if="scope.row.fee_ratios || scope.row.settle_cycle">
                <el-popover trigger="click" placement="bottom-end" popper-class="popover_new">
                  <p class="title">{{$t('merchantlList.bodyBank.feeDetail')}}</p>
                  <ul>
                    <template v-if="scope.row.fee_ratios">
                      <li>{{$t('merchantlList.bodyBank.feeWeixin')}}：<span class="orange">{{middle_fee.wechat_fee | percent_f }}</span></li>
                      <li>{{$t('merchantlList.bodyBank.feeBao')}}：<span class="orange">{{middle_fee.alipay_fee | percent_f }}</span></li>
                      <li>{{$t('merchantlList.bodyBank.feeJd')}}：<span class="orange">{{middle_fee.jd_fee | percent_f }}</span></li>
                      <li>{{$t('merchantlList.bodyBank.feeQQ')}}：<span class="orange">{{middle_fee.qqwallet_fee | percent_f }}</span></li>
                      <li>{{$t('merchantlList.bodyBank.feeCard')}}：<span class="orange">{{middle_fee.swipecard_fee | percent_f }}</span></li>
                    </template>
                    <template v-if="scope.row.settle_cycle">
                      <li>{{$t('merchantlList.bodyBank.settleCycle')}}：<span class="orange">{{scope.row.settle_cycle}}</span></li>
                    </template>
                  </ul>
                  <span slot="reference" class="hover_color" @click="scan_fee(scope.row)">{{$t('app.clickScan')}}</span>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('generalPro.bodyBank.ownerNname')" resizable min-width="100px">
          </el-table-column>
          <el-table-column prop="mobile" :label="$t('generalPro.bodyBank.tel')" resizable min-width="130px">
          </el-table-column>
          <el-table-column prop="jointime" :label="$t('generalPro.bodyBank.regTime')" resizable min-width="170px">
          </el-table-column>
          <el-table-column prop="audit_status" :label="$t('generalPro.bodyBank.auditStatus')" resizable min-width="100px">
            <!-- <template scope="scope">
                            <span v-if="scope.row.audit_status==2">失败</span>
                            <span v-if="scope.row.audit_status==1">成功</span>
                            <span v-if="scope.row.audit_status==0">拒绝</span>
                            <span v-else>审核中</span>
                        </template> -->
          </el-table-column>
          <el-table-column :label="$t('generalPro.bodyBank.failureCause')" resizable min-width="100px">
            <template scope="scope">
              <!-- <div v-if="scope.row.audit_status=='拒绝' || scope.row.audit_status=='失败'"> -->
              <div v-if="scope.row.audit_statuscd=='0' || scope.row.audit_statuscd=='2'">
                <el-popover trigger="click" placement="bottom-end" popper-class="popover_new">
                  <p class="title">{{$t('generalPro.bodyBank.failureCause')}}</p>
                  <ul>
                    <li><span class="orange">{{scope.row.audit_memo}}</span></li>
                  </ul>
                  <span slot="reference" class="hover_color">{{$t('app.clickScan')}}</span>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" :label="$t('generalPro.bodyBank.merStatus')" resizable min-width="100px">
            <template scope="scope">
              <span v-if="scope.row.status">{{$t('generalPro.bodyBank.inactiveS')}}</span>
              <span v-else>{{$t('generalPro.bodyBank.activeS')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="slsm_name" :label="$t('generalPro.bodyBank.salesman')" resizable min-width="100px">
          </el-table-column>
          <el-table-column prop="mchid" :label="$t('generalPro.bodyBank.sonMer')" resizable min-width="100px">
          </el-table-column>
          <el-table-column :label="$t('app.operate')" resizable min-width="320px" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.status">
                <el-button type="info" @click="open_chan(scope.row.userid)">{{$t('generalPro.bodyBank.active')}}</el-button>
              </template>
              <template v-else>
                <el-button type="warning" @click="stop_chan(scope.row.userid)">{{$t('generalPro.bodyBank.deactive')}}</el-button>
              </template>
              <el-button type="info" @click="scan_merchant(scope.row.userid)" v-show="$store.state.language!=='en'">{{$t('app.scan')}}</el-button>
              <!-- <el-button type="warning" @click="mend_merchant(scope.row.userid)" v-show="$store.state.language!=='en'">{{$t('app.modify')}}</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="block t_r mar_t20">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page_now" :page-sizes="[20,50,100,200,250]" :page-size="page_per" layout="total, sizes, prev, pager, next" :total="pages_all">
        </el-pagination>
      </div>
    </div>
    <load :visible="loading"></load>
    <toast :msg="toastmsg" :visible="visible_toast" @on-visible-change="onVisibleChange" @on-msg-change="onMsgChange"></toast>
    <!-- 取消使用elementUI弹框样式 -->
    <!-- <el-dialog v-model="opratedialog" size="tiny">
            <span class="dialog_text">
                您确认要<i class="orange" v-if="oprate_if">开启</i><i class="orange" v-else>注销</i>该商户？
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="opratedialog = false">取 消</el-button>
                <el-button type="primary" @click="mend_chan">确 定</el-button>
            </span>
        </el-dialog> -->
    <bounced :visible="opratedialog">
      <p class="bounced_text">
        {{$t('merchantlList.bodyBank.tipS')}} <i class="orange" v-if="oprate_if">{{$t('generalPro.bodyBank.open')}}</i><i class="orange" v-else>{{$t('generalPro.bodyBank.closeDeactive')}}</i> {{$t('merchantlList.bodyBank.tipE')}}？
      </p>
      <p slot="footer">
        <span class="bounced_button bounced_sure" @click="mend_chan">{{$t('app.sure')}}</span>
        <span class="bounced_button bounced_cancle" @click="opratedialog = false">{{$t('app.cancle')}}</span>
      </p>
    </bounced>
    <bounced :visible="merchantDetailDia" :newclass="large_bounced">
      <span slot="header">{{$t('merchantlList.bodyBank.merch_detail')}}<i class="close"  @click="merchantDetailDia = false"></i></span>
      <el-form label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <p class="title">{{$t('merchantlList.bodyBank.baseInfo')}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.merch_style')">
              <!-- {{merchantDetail.base.type}} -->
              <el-select v-model.number="merchantDetail.base.type" placeholder="" :disabled="true">
                <el-option v-for="item in mchnttypes.records" v-bind:value="item.tp" v-bind:label="item.text">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.mobile')">{{merchantDetail.base.mobile}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.signed_entity')">{{merchantDetail.base.signed_entity}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.legal_name')">{{merchantDetail.base.legal_name}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.legal_idnumber')">{{merchantDetail.base.legal_idnumber}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="clearfix_liner1"></div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <p class="title">{{$t('merchantlList.bodyBank.bankInfo')}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.province')">{{merchantDetail.account.bankprovince}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.city')">{{merchantDetail.account.bankcity}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.accountname')">{{merchantDetail.account.bankuser}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.headbankname')">{{merchantDetail.account.headbankname}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.bankname')">{{merchantDetail.account.bankname}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.bankaccount')">{{merchantDetail.account.bankaccount | hide_code}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.bank_mobile')">{{merchantDetail.account.bankmobile}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.banktype')">
              <el-select v-model.number="merchantDetail.account.banktype" placeholder="" :disabled="true">
                <el-option v-for="banktype in banktypes_d.records" v-bind:value="banktype.tp" v-bind:label="banktype.text">
                </el-option>
              </el-select>
              <!-- <template v-if="merchantDetail.account.banktype==1">{{$t('generalPro.options.toPrivate')}}</template>
              <template v-if="merchantDetail.account.banktype==2">{{$t('generalPro.options.toPublic')}}</template>
              <template v-else></template> -->
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.bankstatus')">
              <!-- {{merchantDetail.account.bankstatus}} -->
              <el-select v-model.number="merchantDetail.account.bankstatus" placeholder="" :disabled="true">
                <el-option v-for="item in cardstatuses.records" v-bind:value="item.status" v-bind:label="item.text">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="clearfix_liner1"></div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <p class="title">{{$t('merchantlList.bodyBank.shopInfo')}}</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.receiptname')">{{merchantDetail.shop.receiptname}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.accountname')">{{merchantDetail.shop.accountname}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.mcc')">{{merchantDetail.shop.mcc_desc}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.province')">{{merchantDetail.shop.province}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.city')">{{merchantDetail.shop.city}}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8">
            <el-form-item :label="$t('merchantlList.bodyBank.address')">{{merchantDetail.shop.address}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </bounced>
    <bounced :visible="mendDetail" :newclass="big_bounced">
      <span slot="header"><i class="close"  @click="close_mendD"></i></span>
      <el-form :model="mendData" :rules="merchantDetailRules" ref="mendData" label-width="160px" class="demo-ruleForm">
        <el-form-item :label="$t('merchantlList.bodyBank.bankOwnerName')" prop="bankuser">
          <el-input v-model="mendData.bankuser" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('merchantlList.bodyBank.cardType')" prop="cardtype">
          <el-select v-model.number="mendData.cardtype" placeholder="" disabled>
            <el-option v-for="item in cardtypes.records" v-bind:value="item.tp" v-bind:label="item.text">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('merchantlList.bodyBank.settleType')" prop="banktype">
          <el-select v-model.number="mendData.banktype" placeholder="">
            <el-option v-for="banktype in banktypes.records" v-bind:value="banktype.tp" v-bind:label="banktype.text">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('merchantlList.bodyBank.bank_mobile')" prop="bankmobile">
          <el-input v-model="mendData.bankmobile"></el-input>
        </el-form-item>
        <el-form-item :label="$t('merchantlList.bodyBank.bank_city')" required>
          <el-col :span="11">
            <el-form-item prop="bankprovince">
              <el-select v-model="mendData.bankprovince" placeholder="" v-on:change="select_pro" v-on:visible-change="if_reset_branchbank=true" filterable>
                <el-option v-for="province in pro_city" v-bind:areaid="province.areaid" v-bind:value="province.areaname" v-bind:label="province.areaname">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="line_sel_fen" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="bankcity">
              <el-select v-model="mendData.bankcity" placeholder="" v-on:change="select_city" v-on:visible-change="if_reset_branchbank=true" filterable>
                <el-option v-for="city in citys" v-bind:cityid="city.cityid" v-bind:value="city.cityname" v-bind:label="city.cityname">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('merchantlList.bodyBank.getMoneyBank')" prop="headbankname">
          <el-select v-model="mendData.headbankname" placeholder="" v-on:change="select_bank" v-on:visible-change="if_reset_branchbank=true" filterable>
            <el-option v-for="headbankname in headbanks" v-bind:bankid="headbankname.headbankid" v-bind:value="headbankname.headbankname" v-bind:label="headbankname.headbankname">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('merchantlList.bodyBank.bankname')" prop="bankname">
          <el-select v-model="mendData.bankname" placeholder="" v-on:change="select_bankbranch" popper-class="no_nomatch" filterable>
            <el-option v-for="bankname in branchbanks" v-bind:datacode="bankname.bankcode" v-bind:value="bankname.name" v-bind:label="bankname.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('merchantlList.bodyBank.bankAccountName')" prop="bankaccount">
          <el-input v-model="mendData.bankaccount"></el-input>
        </el-form-item>
        <el-form-item label="">
          <span class="bounced_button bounced_sure bounced_sure_right" @click="mend_sure('mendData')">{{$t('app.saveSure')}}</span>
        </el-form-item>
      </el-form>
    </bounced>
    <bounced :visible="mendialog">
      <p class="bounced_text">
        {{$t('app.ifSureMend')}}
      </p>
      <p slot="footer">
        <span class="bounced_button bounced_sure" @click="mend_sure_sure">{{$t('app.sure')}}</span>
        <span class="bounced_button bounced_cancle" @click="mendialog = false">{{$t('app.cancle')}}</span>
      </p>
    </bounced>
  </div>
</template>
<script>
import yanzheng from '../../method/yanzheng'
export default {
  name: 'merchant_index',
  data() {
    return {
      opratedialog: false, //开启、停用弹框是否开启
      oprate_if: true, //true代表开启，false代表停用
      oprate_data: '', //弹框需要传入的代码
      loading: false, //load是否显示
      bounced_show: true, //弹框是否显示
      toastmsg: '', //toast提示文字
      visible_toast: false, //toast是否显示
      merchantDetailDia: false, //商户详情弹框是否开启
      large_bounced: 'large_bounced', //商户详情弹框样式
      mendDetail: false, //修改商户详情弹框是否开启
      big_bounced: 'big_bounced', //修改商户详情弹框样式
      pro_city: [], //ajax获取
      citys: [],
      city_id: '', ////为了获取对应省份城市的银行--中间参数
      headbank_id: '', ////为了获取对应省份城市的银行--中间参数--总行id
      bankname_mid: '', //控制银行支行赋值--取消使用
      branchbank_if: false, //支行是否执行
      headbanks: [], //ajax获取
      branchbanks: [], //ajax获取
      mendialog: false, //商户修改--是否确认弹框是否开启
      mendMerchantId: '', //当前修改的商户id  
      if_reset_branchbank: false, //是否重置分行的值
      banktypes: {}, //ajax获取 清算类型 
      cardtypes: {}, //ajax获取 银行卡类型  
      banktypes_d: {}, //ajax获取 清算类型 --详情展示  
      mchnttypes: {}, //ajax获取 商户类型列表 --详情展示  
      cardstatuses: {}, //ajax获取 银行卡状态列表 --详情展示
      mendData: {
        bankmobile: '', //银行预留手机号码
        bankprovinceid: '', // 省份代码
        bankprovince: '', //省份
        bankcityid: '', // 城市代码
        bankcity: '', //城市
        headbankid: '', // 开户行总行 id
        headbankname: '', //开户银行
        bankcode: '', // 开户行联行号
        bankname: '', //开户支行
        bankaccount: '', //银行账号
        banktype: '', //清算类型, 对私=1, 对公=2
        cardtype: '', //卡类型, 借记卡=1, 信用卡=2
        bankuser: '', //持卡人姓名
      }, //商户详情-修改内容    
      merchantDetail: {
        base: {
          type: '', //商户类型
          mobile: '', //手机号码
          signed_entity: '', //签约实体
          legal_name: '', //法人代表
          legal_idnumber: '', //身份证号码
        }, //基本信息
        account: {
          bankprovince: '', //省份
          bankcity: '', //城市
          bankuser: '', //账户名称
          headbankname: '', //开户银行
          bankname: '', //开户支行
          bankmobile: '', //银行预留手机号码
          bankaccount: '', //银行账号
          banktype: '', //清算类型
          bankstatus: '', //银行卡状态
          bankprovinceid: '', // 省份代码
          bankcityid: '', // 城市代码
          headbankid: '', // 开户行总行 id
          bankcode: '', // 开户行联行号
          bankuser: '', //持卡人姓名
        }, //账户信息
        shop: {
          receiptname: '', //收据名称
          accountname: '', //账户名称
          mcc: '', //mcc     
          mcc_desc: "",
          province: '', //省份
          city: '', //城市
          address: '', //收据名称
        }, //店铺信息
      }, //商户详情内容
      merchantDetailRules: {
        bankmobile: [{
          required: true,
          pattern: /^1[0-9]{10}$/,
          message: this.$t('yanzheng.tel'),
          trigger: 'blur'
        }],
        bankaccount: [{
          required: true,
          pattern: /^[0-9]{1,50}$/,
          message: this.$t('yanzheng.bankaccount'),
          trigger: 'blur'
        }],
        bankuser: [{
          required: true,
          //pattern: /^[\u4e00-\u9fa5]{1,30}$/,
          pattern: /^\D{1,25}$/,
          message: this.$t('yanzheng.cardOwnerName'),
          trigger: 'blur'
        }],
        banktype: [{
          type: "number",
          required: true,
          message: this.$t('yanzheng.selBankType'),
          trigger: 'change'
        }],
        cardtype: [{
          type: "number",
          required: true,
          message: this.$t('yanzheng.selCardType'),
          trigger: 'change'
        }],
        headbankname: [{
          required: true,
          message: this.$t('yanzheng.selBank'),
          trigger: 'change'
        }],
        bankname: [{
          required: true,
          message: this.$t('yanzheng.selBranchBank'),
          trigger: 'change'
        }],
        bankprovince: [{
          required: true,
          message: this.$t('yanzheng.selProvince'),
          trigger: 'change'
        }],
        bankcity: [{
          required: true,
          message: this.$t('yanzheng.selCity'),
          trigger: 'change'
        }],
      },
      searchkey: {
        id: '',
        name: '',
        userid: '',
        shopname: '',
        mobile: '',
        stime: '',
        etime: '',
        daterange: '',
        slsm_name: '',
        mchid: '',
        audit_statuses: [],
      },
      merchants: [],
      list_url: location.protocol + '//' + location.host + '/qudao/v1/api/mchnt/list', //获取商户列表  
      down_url: location.protocol + '//' + location.host + '/qudao/v1/api/mchnt/list/download', //下载   
      chan_url: location.protocol + '//' + location.host + '/qudao/v1/api/mchnt/', // 注销   
      status_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/mchnt_audit_status', // 获取审核状态列表 
      common_url: location.protocol + '//' + location.host + '/qudao/v1/api/mchnt/', //获取商户详情 /修改商户详情--公用 
      qd_areacities_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/areacities', //省份城市列表
      qd_headbanks_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/headbanks', //银行总行列表
      qd_branchbanks_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/branchbanks', //银行支行列表 
      qd_banktypes_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/banktypes', //结算类型   
      qd_cardtypes_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/cardtypes', //银行卡类型   
      qd_mchnttypes_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/mchnttypes', //商户类型列表      
      qd_cardstatuses_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/cardstatuses', //银行卡状态列表                                 
      pages_all: 0, //总信息数
      page_per: 20, //每页信息数
      page_now: 1, //当前页数
      pages: 1, //总页数
      merchants_mid: [], //搜索后的总信息
      merchants_now: [], //当前展示信息
      check_status: [], //审核状态
      middle_fee: {
        "wechat_fee": '',
        "alipay_fee": '',
        "jd_fee": '',
        "qqwallet_fee": '',
        "swipecard_fee": '',
      }, //商户费率-中转参数，scope不能直接识别2级信息scope.row.fee_ratios.wechat_fee
      pickerOptions: {
        disabledDate: (time) => time.getTime() > Date.now(),
        shortcuts: [{
          text: this.$t('generalPro.dateBank.lastWeek'),
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: this.$t('generalPro.dateBank.lastMonth'),
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: this.$t('generalPro.dateBank.lastThreeM'),
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      searchkey_rule: {
        id: [{
          required: false,
          pattern: /^[0-9\s]{0,300}$/,
          message: this.$t('yanzheng.qdNum'),
          trigger: 'blur'
        }],
        name: yanzheng.test_qd_name(this.$t('generalPro.bodyBank.qdName'), 1, 30, false, 'blur', this),
        userid: [{
          required: false,
          pattern: /^[0-9\s]{0,300}$/,
          message: this.$t('yanzheng.merNum'),
          trigger: 'blur'
        }],
        shopname: [{
          required: false,
          pattern: /^[\u4e00-\u9fa5a-zA-Z0-9\s]{1,20}$/,
          message: this.$t('yanzheng.merName'),
          trigger: 'blur'
        }],
        mobile: [{
          required: false,
          pattern: /^1[0-9]{10}$/,
          message: this.$t('yanzheng.tel'),
          trigger: 'blur'
        }],
        slsm_name: [{
          required: false,
          pattern: /^[\u4e00-\u9fa5a-zA-Z0-9\s]{1,20}$/,
          message: this.$t('yanzheng.salesman'),
          trigger: 'blur'
        }],
        mchid: [{
          required: false,
          pattern: /^[a-zA-Z0-9\s]{1,128}$/,
          message: this.$t('yanzheng.sonMer'),
          trigger: 'blur'
        }],
      },
    }
  },
  created: function() {
    this.get_checkStatus(); //获取审核状态
    this.get_area(); //获取省份城市 
    this.get_banktypes(); //获取结算类型  
    this.get_cardtypes(); //获取银行卡类型 
    this.get_mchnttypes(); //获取商户类型列表 
    this.get_cardstatuses(); //获取银行卡状态列表
    //this.get_list(); //获取商户列表 --首次在审核状态成功后执行
  },
  watch: {
    // merchants_mid: function(val, oldVal) {
    //     var _this = this;
    //     _this.pages_all = _this.merchants_mid.length;
    //     _this.page_now = 1;
    //     _this.merchants_now = _this.merchants_mid.slice(0, _this.page_now * _this.page_per);
    // },
    branchbank_if: function(val, oldVal) {
      if (this.branchbank_if) {
        this.get_banks(); //获取总行 
      }
    }, //省份获取成功后-获取总行
    city_id: function(val, oldVal) {
      if (this.city_id > 0 && this.headbank_id > 0) {
        this.get_branchbank(); //获取支行
      } else {
        this.branchbanks = []; //清空支行
      }
    }, //城市id或者总行id发生变化后-获取支行
    headbank_id: function(val, oldVal) {
      if (this.city_id > 0 && this.headbank_id > 0) {
        this.get_branchbank(); //获取支行
      } else {
        this.branchbanks = []; //清空支行
      }
    }, //城市id或者总行id发生变化后-获取支行
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
    //查看费率
    scan_fee: function(val) {
      if (val.fee_ratios === null) {
        this.middle_fee = {
          "wechat_fee": '',
          "alipay_fee": '',
          "jd_fee": '',
          "qqwallet_fee": '',
          "swipecard_fee": '',
        };
      } else {
        this.middle_fee = val.fee_ratios;
      }
    },
    //获取商户列表
    get_list: function() {
      let _this = this;
      let post_data = {
        'page': _this.page_now,
        'page_size': _this.page_per,
        'mchnt_uid': _this.searchkey.userid.replace(/\s/g, ''),
        'mchnt_name': _this.searchkey.shopname.replace(/\s/g, ''),
        'mchnt_mobile': _this.searchkey.mobile.replace(/\s/g, ''),
        'mchnt_s_join_dtm': _this.searchkey.stime,
        'mchnt_e_join_dtm': _this.searchkey.etime,
        'qd_uid': _this.searchkey.id.replace(/\s/g, ''),
        'qd_name': _this.searchkey.name.replace(/\s/g, ''),
        'slsm_name': _this.searchkey.slsm_name.replace(/\s/g, ''),
        'mchnt_mchid': _this.searchkey.mchid.replace(/\s/g, ''),
        'audit_statuses': _this.searchkey.audit_statuses.join(','),
      };
      this.$ajax_log.ajax_get(this, this.list_url, post_data, (data_return) => {
        _this.pages_all = data_return.data.mchnt_cnt;
        _this.merchants_now = data_return.data.mchnt_infos;
      });
      // this.$http.get(this.list_url, {
      //     'params': post_data,
      //     before: function() {
      //       _this.loading = true;
      //     }
      //   })
      //   .then(function(response) {
      //     _this.loading = false;
      //     let data_return = response.body;
      //     if (data_return.respcd == '0000') {
      //       // _this.merchants = data_return.data;
      //       // _this.merchants_mid = _this.merchants;
      //       // _this.pages_all = _this.merchants_mid.length;
      //       // _this.merchants_now = _this.merchants_mid.slice((_this.page_now - 1) * _this.page_per, _this.page_now * _this.page_per);
      //       _this.pages_all = data_return.data.mchnt_cnt;
      //       _this.merchants_now = data_return.data.mchnt_infos;
      //     } else {
      //       if (data_return.respmsg) {
      //         _this.toastmsg = data_return.respmsg;
      //       } else {
      //         _this.toastmsg = data_return.resperr;
      //       }
      //       _this.visible_toast = true;
      //     }
      //   }, function(response) {
      //     _this.loading = false;
      //     _this.visible_toast = true;
      //     _this.toastmsg = '网络超时!';
      //   })
      //   .catch(function(response) {
      //     _this.loading = false;
      //   });
      //列表测试数据--仅供测试
      //_this.getdata_test();
    },
    //时间变化
    time_change(val) {
      if (val.length == 0) {
        this.searchkey.stime = '';
        this.searchkey.etime = '';
      } else {
        let timerange = val.split(' - ');
        this.searchkey.stime = timerange[0] + ' 00:00:00';
        this.searchkey.etime = timerange[1] + ' 23:59:59';
      }
    },
    //提交查询
    search_sub: function() {
      // var _this = this;
      // _this.merchants_mid = [];
      // var key_id = this.searchkey.id;
      // var key_name = this.searchkey.name;
      // var key_userid = this.searchkey.userid;
      // var key_shopname = this.searchkey.shopname;
      // var key_mobile = this.searchkey.mobile;
      // var key_date = this.searchkey.daterange;
      // console.log(this.searchkey);
      // var key_stime = 0,
      //     key_etime = new Date().getTime();
      // if (key_date[0]) {
      //     var k_stime = _this.get_date(key_date[0]) + ' 00:00:00';
      //     var k_etime = _this.get_date(key_date[1]) + ' 23:59:59';
      //     key_stime = new Date(k_stime).getTime();
      //     key_etime = new Date(k_etime).getTime();
      // }
      // for (let i = 0; i < _this.merchants.length; i++) {
      //     let id = _this.merchants[i].qd_info.base.userid.toString();
      //     let name = _this.merchants[i].qd_info.base.name;
      //     let userid = _this.merchants[i].userid.toString();
      //     let shopname = _this.merchants[i].shopname;
      //     let mobile = _this.merchants[i].mobile;
      //     let jointime = new Date(_this.merchants[i].jointime).getTime();
      //     if (id.indexOf(key_id) != '-1' && name.indexOf(key_name) != '-1' && userid.indexOf(key_userid) != '-1' && shopname.indexOf(key_shopname) != '-1' && mobile.indexOf(key_mobile) != '-1' && key_etime >= jointime && jointime >= key_stime) {
      //         _this.merchants_mid.push(_this.merchants[i]);
      //     }
      // }
      // return _this.merchants_mid;
      this.$refs.searchkey.validate((valid) => {
        if (valid) {
          this.get_list();
        } else {
          return false;
        }
      });
      // this.get_list();
    },
    //下载
    download_sub: function() {
      this.$refs.searchkey.validate((valid) => {
        if (valid) {
          let _this = this;
          let post_data = {
            'mchnt_uid': _this.searchkey.userid.replace(/\s/g, ''),
            'mchnt_name': _this.searchkey.shopname.replace(/\s/g, ''),
            'mchnt_mobile': _this.searchkey.mobile.replace(/\s/g, ''),
            'mchnt_s_join_dtm': _this.searchkey.stime,
            'mchnt_e_join_dtm': _this.searchkey.etime,
            'qd_uid': _this.searchkey.id.replace(/\s/g, ''),
            'qd_name': _this.searchkey.name.replace(/\s/g, ''),
            'slsm_name': _this.searchkey.slsm_name.replace(/\s/g, ''),
            'mchnt_mchid': _this.searchkey.mchid.replace(/\s/g, ''),
            'audit_statuses': _this.searchkey.audit_statuses,
          };
          let url = this.down_url + '?';
          let data;
          for (data in post_data) {
            url += data + '=' + post_data[data] + '&';
          }
          url = url.substr(0, url.length - 1);
          window.open(url);
        } else {
          return false;
        }
      });
    },
    get_date: function(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      return year + '/' + month + '/' + day;
    },
    handleSizeChange(val) {
      let _this = this;
      //console.log(`每页 ${val} 条`);
      _this.page_per = val;
      _this.page_now = 1;
      // _this.merchants_now = _this.merchants_mid.slice((_this.page_now - 1) * _this.page_per, _this.page_now * _this.page_per);
      this.get_list();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      let _this = this;
      _this.page_now = val;
      // _this.merchants_now = _this.merchants_mid.slice((_this.page_now - 1) * _this.page_per, _this.page_now * _this.page_per);
      this.get_list();
    },
    //开启渠道状态
    open_chan: function(val) {
      let _this = this;
      _this.oprate_data = val;
      _this.oprate_if = true;
      _this.opratedialog = true;
    },
    //关闭渠道状态
    stop_chan: function(val) {
      let _this = this;
      _this.oprate_data = val;
      _this.oprate_if = false;
      _this.opratedialog = true;
    },
    //操作事件
    mend_chan: function() {
      let _this = this;
      let userid = _this.oprate_data;
      let status;
      _this.opratedialog = false; //关闭弹框
      if (_this.oprate_if) {
        status = 0; //需要开启该状态
      } else {
        status = 1;
      }
      let post_data = {
        'status': status,
      };
      this.$ajax_log.ajax_post(this, this.chan_url + userid + '/status', post_data, (data_return) => {
        _this.get_list();
      });
      // this.$http.post(this.chan_url + userid + '/status', post_data, {
      //     before: function() {
      //       _this.loading = true;
      //     }
      //   })
      //   .then(function(response) {
      //     _this.loading = false;
      //     let data_return = response.body;
      //     if (data_return.respcd == '0000') {
      //       _this.get_list();
      //     } else {
      //       if (data_return.respmsg) {
      //         _this.toastmsg = data_return.respmsg;
      //       } else {
      //         _this.toastmsg = data_return.resperr;
      //       }
      //       _this.visible_toast = true;
      //     }
      //   }, function(response) {
      //     _this.loading = false;
      //     _this.visible_toast = true;
      //     _this.toastmsg = '网络超时!';
      //   })
      //   .catch(function(response) {
      //     _this.loading = false;
      //   });
    },
    //获取审核状态
    get_checkStatus: function() {
      var _this = this;
      this.$ajax_log.ajax_get(this, this.status_url, '', (data_return) => {
        _this.check_status = data_return.data.records;
        _this.get_list(); //获取商户列表
      });
      // this.$http.get(this.status_url, {
      //         before: function() {
      //             _this.loading = true;
      //         }
      //     })
      //     .then(function(response) {
      //         _this.loading = false;
      //         var data_return = response.body;
      //         if (data_return.respcd == '0000') {
      //             _this.check_status = data_return.data.records;
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
    },
    //清空并刷新--更改成ajax提交，取消使用
    fresh_sub: function() {
      var _this = this;
      _this.searchkey = {
        id: '',
        name: '',
        userid: '',
        shopname: '',
        mobile: '',
        stime: '',
        etime: '',
        daterange: '',
      }; //清空搜索内容
      _this.page_now = 1; //页数回到第一页
      _this.get_list(); //获取最新列表
    },
    //点击查看商户信息
    scan_merchant: function(id) {
      var _this = this;
      //获取商户详情
      this.get_merchant(id, (data_return) => {
        _this.merchantDetailDia = true; //打开弹框
        _this.merchantDetail = data_return.data; //赋值  
      });
    },
    //点击修改商户信息
    mend_merchant: function(id) {
      var _this = this;
      this.if_reset_branchbank = false; //将重置支行--设为false
      this.bankname_mid = '';
      this.mendMerchantId = id; //设置修改的id
      //获取商户详情
      this.get_merchant(id, (data_return) => {
        let bankstatus = data_return.data.account.bankstatus;
        if (bankstatus < 3) {
          this.visible_toast = true;
          this.toastmsg = this.$t('merchantlList.bodyBank.noMend');
          return false; //不能修改
        }
        this.mendData.bankmobile = data_return.data.account.bankmobile;
        this.mendData.bankaccount = data_return.data.account.bankaccount;
        this.mendData.banktype = data_return.data.account.banktype;
        //this.mendData.cardtype = data_return.data.account.cardtype>=1?data_return.data.account.cardtype:1;
        this.mendData.cardtype = 1; //默认借记卡
        this.mendData.bankuser = data_return.data.account.bankuser;
        this.mendData.bankcode = data_return.data.account.bankcode;
        this.mendData.bankprovince = data_return.data.account.bankprovince;
        this.mendData.headbankname = data_return.data.account.headbankname;
        this.bankname_mid = data_return.data.account.bankname;
        setTimeout(() => {
          this.mendData.bankcity = data_return.data.account.bankcity;
        }, 0);
        setTimeout(() => {
          this.mendData.bankname = data_return.data.account.bankname;
          _this.mendDetail = true; //打开弹框 
        }, 0)
        // _this.mendData = data_return.data.account; //赋值 
        // _this.mendDetail = true; //打开弹框 
      });
    },
    //点击关闭修改弹框按钮--取消使用，党重新复制时，会完全覆盖
    close_mendD() {
      this.mendDetail = false;
      this.bankname_mid = '';
      this.if_reset_branchbank = false; //将重置支行--设为false
      //this.mendData = {}; //清空弹框数据
    },
    //修改确认
    mend_sure: function(formName) {
      var _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.mendDetail = false; //关闭弹框
          this.mendialog = true; //打开确认弹框
        } else {
          return false;
        }
      });
    },
    mend_sure_sure: function() {
      var _this = this;
      this.mendialog = false; //关闭确认弹框
      //提交商户详情的修改
      this.$ajax_log.ajax_post(this, this.common_url + this.mendMerchantId + '/modify', this.mendData, (data_return) => {
        _this.visible_toast = true;
        _this.toastmsg = _this.$t('app.fixSuccess');
        _this.get_list();
      });
    },
    //获取某个商户信息
    get_merchant: function(id, func) {
      var _this = this;
      //获取商户详情
      this.$ajax_log.ajax_get(this, this.common_url + id + '/detail', '', (data_return) => {
        func(data_return);
      });
    },
    //省份值变化后，市也变化
    select_pro: function() {
      for (let i = 0; i < this.pro_city.length; i++) {
        if (this.pro_city[i].areaname == this.mendData.bankprovince) {
          this.mendData.bankprovinceid = this.pro_city[i].areaid;
          this.citys = this.pro_city[i].cities;
          //如果不是手动选择更改省份，则不对市进行赋值
          if (!this.if_reset_branchbank) {
            return false; //当重置支行字段为false时，不重置内容（点击下拉菜单时，置为true）
          }
          setTimeout(() => {
            this.mendData.bankcity = this.citys[0].cityname;
            this.city_id = this.citys[0].cityid;
            this.mendData.bankcityid = this.citys[0].cityid;
            // console.log('省份变化');
            // console.log(this.mendData); 
          }, 0);
          return false;
        } else {
          this.citys = [];
        }
      }
    },
    //市值也变化，求id
    select_city: function() {
      for (let i = 0; i < this.citys.length; i++) {
        if (this.citys[i].cityname == this.mendData.bankcity) {
          this.city_id = this.citys[i].cityid;
          this.mendData.bankcityid = this.citys[i].cityid;
          // console.log('市变化');
          // console.log(this.mendData);
          return false;
        }
      }
    },
    //获取省份城市列表
    get_area: function() {
      var _this = this;
      this.$ajax_log.ajax_get(this, this.qd_areacities_url, { 'no_whole_country': 1 }, (data_return) => {
        _this.pro_city = data_return.data.records;
        //设置初始值
        //_this.mendData.bankprovince = _this.pro_city[0].areaname;
        _this.citys = _this.pro_city[0].cities;
        _this.city_id = _this.citys[0].cityid;
        //_this.mendData.bankcity = _this.citys[0].cityname;
        _this.branchbank_if = true;
      });
    },
    //获取银行总行列表
    get_banks: function() {
      var _this = this;
      this.$ajax_log.ajax_get(this, this.qd_headbanks_url, '', (data_return) => {
        _this.headbanks = data_return.data.records;
        _this.headbank_id = _this.headbanks[0].headbankid;
        //设置初始值 
        // _this.mendData.headbankname = _this.headbanks[0].headbankname;
        // _this.mendData.headbankid = _this.headbanks[0].headbankid;
        // if (_this.city_id.length <= 0) {
        //   _this.city_id = _this.pro_city[0].cities[0].cityid;
        // }
      });
    },
    //获取支行列表
    get_branchbank: function() {
      var _this = this;
      let postdata = {
        'headbankid': this.headbank_id,
        'cityid': this.city_id,
      };
      this.$ajax_log.ajax_get(this, this.qd_branchbanks_url, postdata, (data_return) => {
        _this.branchbanks = data_return.data.records;
        //设置初始值
        if (!_this.if_reset_branchbank) {
          setTimeout(() => {
            _this.mendData.bankname = _this.bankname_mid;
          }, 0);
          return false; //当重置支行字段为false时，不重置内容（点击下拉菜单时，置为true）
        }
        setTimeout(() => {
          if (_this.branchbanks.length <= 0) {
            _this.mendData.bankname = '';
            _this.mendData.bankcode = '';
          } else {
            _this.mendData.bankname = _this.branchbanks[0].name;
            _this.mendData.bankcode = _this.branchbanks[0].bankcode;
          }
        }, 0);
      });
    },
    //总行变化后，调整支行
    select_bank: function() {
      var _this = this;
      for (let i = 0; i < _this.headbanks.length; i++) {
        if (_this.headbanks[i].headbankname == _this.mendData.headbankname) {
          _this.headbank_id = _this.headbanks[i].headbankid;
          _this.mendData.headbankid = _this.headbanks[i].headbankid;
          break;
        }
      }
    },
    //zhi行变化后，调整支行code
    select_bankbranch: function() {
      var _this = this;
      for (let i = 0; i < _this.branchbanks.length; i++) {
        if (_this.branchbanks[i].name == _this.mendData.bankname) {
          _this.mendData.bankcode = _this.branchbanks[i].bankcode;
          return false;
        }
      }
    },
    //获取结算类型
    get_banktypes: function() {
      var _this = this;
      this.$ajax_log.ajax_get(this, this.qd_banktypes_url, '', (data_return) => {
        _this.banktypes = data_return.data;
        _this.banktypes_d = data_return.data;
        //设置初始值
        //_this.mendData.banktype = _this.banktypes.records[0].tp;
      });
    },
    //获取银行卡类型类型
    get_cardtypes: function() {
      var _this = this;
      this.$ajax_log.ajax_get(this, this.qd_cardtypes_url, '', (data_return) => {
        _this.cardtypes = data_return.data;
        //设置初始值
        //_this.mendData.cardtype = _this.cardtypes.records[0].tp;
      });
    },
    //获取银商户类型列表
    get_mchnttypes: function() {
      var _this = this;
      this.$ajax_log.ajax_get(this, this.qd_mchnttypes_url, '', (data_return) => {
        _this.mchnttypes = data_return.data;
      });
    },
    //获取银行卡状态列表
    get_cardstatuses: function() {
      var _this = this;
      this.$ajax_log.ajax_get(this, this.qd_cardstatuses_url, '', (data_return) => {
        _this.cardstatuses = data_return.data;
      });
    },
    //列表测试数据--仅供测试
    getdata_test() {
      let _this = this;
      _this.merchants_now = [{
        "qd_info": {
          "base": {
            "userid": 123, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道01", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 渠道基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 45556, // 商户编号
        "shopname": "百度超市", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 0, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 123, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道02", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 业务员基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 23343456, // 商户编号
        "shopname": "百度", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 1, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 123, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道03", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 渠道基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 2266456, // 商户编号
        "shopname": "阿里", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 0, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 12345, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道01", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 渠道基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 8456, // 商户编号
        "shopname": "发发", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 1, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 12322, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道01", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 渠道基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 345699, // 商户编号
        "shopname": "超市", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 1, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 123, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道01", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 渠道基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 45556, // 商户编号
        "shopname": "百度超市", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 0, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 123, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道02", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 业务员基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 23343456, // 商户编号
        "shopname": "百度", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 1, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 123, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道03", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 渠道基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 2266456, // 商户编号
        "shopname": "阿里", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 0, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 12345, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道01", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 渠道基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 8456, // 商户编号
        "shopname": "发发", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 1, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 12322, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道01", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 渠道基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 345699, // 商户编号
        "shopname": "超市", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 1, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 123, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道01", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 渠道基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 45556, // 商户编号
        "shopname": "百度超市", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 0, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 123, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道02", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 业务员基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 23343456, // 商户编号
        "shopname": "百度", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 1, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 123, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道03", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 渠道基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 2266456, // 商户编号
        "shopname": "阿里", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 0, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 12345, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道01", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 渠道基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 8456, // 商户编号
        "shopname": "发发", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 1, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 12322, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道01", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 渠道基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 345699, // 商户编号
        "shopname": "超市", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 1, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 123, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道01", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 渠道基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 45556, // 商户编号
        "shopname": "百度超市", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 0, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 123, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道02", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 业务员基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 23343456, // 商户编号
        "shopname": "百度", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 1, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 123, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道03", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 渠道基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 2266456, // 商户编号
        "shopname": "阿里", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 0, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 12345, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道01", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 渠道基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 8456, // 商户编号
        "shopname": "发发", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 1, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }, {
        "qd_info": {
          "base": {
            "userid": 12322, // 渠道编号
            "status": 0, // 渠道状态: 0 启用, 1 禁用
            "join_dtm": "2016-01-01 12:22:23", // 注册时间
            "mobile": "13072842233", // 注册手机号(登录名)
            "email": "chen@qfpay.com", // 注册邮箱
            "type": 1, // 渠道类型: 1 白牌, 2 联名
            "slsm_uid": 123, // 所属业务员ID

            "name": "四川渠道01", // 渠道名称
            "short_name": "川01", // 渠道简称
            "legal_name": "王二", // 法人姓名
            "legal_idnumber": "511325197001013333", // 法人省份证号码
            "province": "四川省", // 所在省份
            "city": "成都市", // 所在城市
            "address": "华阳", // 商户地址
            "business_name": "李二", // 业务联系人姓名
            "business_mobile": "13012340000", // 业务联系人手机号
            "business_email": "lier@qfpay.com", // 业务联系人邮箱
            "finace_name": "李二", // 财务联系人姓名
            "finace_mobile": "13012340000", // 财务联系人手机号
            "finace_email": "lier@qfpay.com", // 财务联系人邮箱
            "logo_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业LOGO的URL
            "icon_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 企业ICON
            "business_license_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 营业执照
            "bank_account_url": "https://qudao.qfpay.com/qudao/upload/pic/sdfsd.pic", // 开户许可证
          }
        }, // 渠道基本信息
        "slsm_info": {}, // 业务员基本信息
        "userid": 345699, // 商户编号
        "shopname": "超市", // 商户名称
        "name": "张三", // 法人名称
        "mobile": "13012341111", // 商户手机号码
        "status": 1, // 商户状态
        "jointime": "2016-01-01 12:22:23", // 注册时间
        "fee_ratios": { // 费率
          "wechat_fee": 12,
          "alipay_fee": 34,
          "jd_fee": 56,
          "qqwallet_fee": 78,
          "swipecard_fee": 90,
        }, //商户费率
        "audit_memo": "失败原因详情--网络问题-失败原因详情-网络故障-失败原因详情1",
      }];
      // _this.merchants_mid = _this.merchants;
      // _this.pages_all = _this.merchants_mid.length;
      // _this.merchants_now = _this.merchants_mid.slice((_this.page_now - 1) * _this.page_per, _this.page_now * _this.page_per);
    },
  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
@import "../../css/common/const";
span.hover_color {
  &:hover {
    color: @orange;
  }
}

.mechant {
  .bounced_my_body {
    .el-form-item__label {
      color: @grey;
    }
  }
}

.big_bounced {
  p.title {
    font-size: 16px;
    margin-bottom: 22px;
    padding-left: 20px;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    &:before {
      content: '';
      width: 3px;
      height: 14px;
      position: absolute;
      left: 0;
      background: @orange;
      top: 2px;
    }
  }
}

.line_sel_fen {
  text-align: center;
}

</style>
