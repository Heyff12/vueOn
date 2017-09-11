<template>
  <div>
    <!-- 图片上传，保存ajax -->
    <div class="right_head">
      新增渠道
    </div>
    <div class="right_body">
      <div class="right_body_inner">
        <ul class="step_ul">
          <li v-bind:class="{tab:li_one}" v-on:click="showli_one">第一步</li>
          <li v-bind:class="{tab:li_one2}" v-on:click="showli_one2">第二步</li>
          <li v-bind:class="{tab:li_two}" v-on:click="showli_tow">第三步</li>
          <li v-bind:class="{tab:li_three}" v-on:click="showli_three">第四步</li>
        </ul>
        <div class="step_show" v-show="li_one">
          <p class="title">基本信息</p>
          <div class="step_show_inner">
            <el-form :model="base" :rules="rules" ref="base1" label-width="110px" class="demo-ruleForm">
              <el-row :gutter="20">
                <input type="hidden" name="userid" v-model="userid">
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="渠道类型" prop="type">
                    <el-select v-model="base.type" placeholder="请选择渠道类型">
                      <el-option v-for="channel in channels.records" v-bind:value="channel.tp" v-bind:label="channel.text">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="渠道名称" prop="name">
                    <el-input v-model="base.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="渠道简称" prop="short_name">
                    <el-input v-model="base.short_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                  <div class="clearfix_liner1"></div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="法人姓名" prop="legal_name">
                    <el-input v-model="base.legal_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="法人身份证号" prop="legal_idnumber">
                    <el-input v-model="base.legal_idnumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="base.mobile" placeholder="手机号为渠道识别码"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="国家" prop="country">
                    <el-select v-model="base.country" placeholder="请选择国家">
                      <el-option v-for="channel in countries.records" v-bind:value="channel.code" v-bind:label="channel.text">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="时区" prop="timezone">
                    <el-select v-model="base.timezone" placeholder="请选择时区">
                      <el-option v-for="channel in timezones.records" v-bind:value="channel" v-bind:label="channel">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="币种" prop="currency">
                    <el-select v-model="base.currency" placeholder="请选择币种">
                      <el-option v-for="channel in currencys.records" v-bind:value="channel.code" v-bind:label="channel.text">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="注册邮箱" prop="email">
                    <el-input v-model="base.email"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                  <div class="clearfix_liner1"></div>
                  <div class="add_quyu">
                    <el-button type="primary" icon="plus" @click="add_quyu"  :disabled="pro_authcity_len<=0">增加授权区域</el-button>
                  </div>
                </el-col>
                <template v-for="(item,index) in base.auth_areas">
                  <el-col :xs="24" :sm="24" :md="12" :lg="8">
                    <el-form-item label="授权省份" :prop="'auth_areas.' + index + '.auth_province'" :key="item.key"  :rules="[{required: true,message: '请选择所在授权省份',trigger: 'change'}]">
                      <el-select v-model="item.auth_province" placeholder="请选择授权省份" v-on:change="select_authpro(index)" filterable>
                        <el-option v-for="auth_province in pro_authcity" v-bind:areaid="auth_province.areaid" v-bind:value="auth_province.areaname" v-bind:label="auth_province.areaname">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="8">
                    <el-form-item label="授权市" :prop="'auth_areas.' + index + '.auth_city'" :key="item.key" :rules="[{required: false,message: '请选择所在授权城市',trigger: 'change'}]">
                      <el-select v-model="item.auth_city" placeholder="请选择授权城市" filterable>
                        <el-option v-for="auth_city in authcitys[index].citys" v-bind:cityid="auth_city.cityid" v-bind:value="auth_city.cityname" v-bind:label="auth_city.cityname">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="24"></el-col>
                </template>
                <div class="clearfix"></div>
                <div class="t_c mar_t20">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-button @click="resetForm('base1')">重置</el-button>
                    <el-button type="primary" @click="one_next('base1')">下一步</el-button>
                  </el-col>
                </div>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="step_show" v-show="li_one2">
          <p class="title">基本信息</p>
          <div class="step_show_inner">
            <el-form :model="base" :rules="rules" ref="base" label-width="125px" class="demo-ruleForm">
              <el-row>
                <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8">
                                    <el-form-item label="所属业务员userid" prop="slsm_uid">
                                        <el-input v-model.number="base.slsm_uid"></el-input>
                                    </el-form-item>
                            </el-col> -->
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="业务员手机号" prop="slsm_mobile">
                    <el-input v-model="base.slsm_mobile"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="所在省份" prop="province">
                    <el-select v-model="base.province" placeholder="请选择所在省份" v-on:change="select_pro" filterable>
                      <el-option v-for="province in pro_city" v-bind:areaid="province.areaid" v-bind:value="province.areaname" v-bind:label="province.areaname">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="所在城市" prop="city">
                    <el-select v-model="base.city" placeholder="请选择所在城市" v-on:change="select_city" filterable>
                      <el-option v-for="city in citys" v-bind:cityid="city.cityid" v-bind:value="city.cityname" v-bind:label="city.cityname">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                  <div class="clearfix_liner1"></div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="业务联系人" prop="business_name">
                    <el-input v-model="base.business_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="手机号" prop="business_mobile">
                    <el-input v-model="base.business_mobile"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="业务邮箱" prop="business_email">
                    <el-input v-model="base.business_email"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="财务联系人" prop="finace_name">
                    <el-input v-model="base.finace_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="手机号" prop="finace_mobile">
                    <el-input v-model="base.finace_mobile"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="财务邮箱" prop="finace_email">
                    <el-input v-model="base.finace_email"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="clearfix_liner1"></div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                <el-form-item label="渠道经理" prop="manager_name">
                    <el-input v-model="base.manager_name" placeholder="姓名"></el-input>
                </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                    <el-form-item label="渠道经理手机号" prop="manager_mobile">
                        <el-input v-model="base.manager_mobile"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="clearfix"></div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                    <el-form-item label="服务经理" prop="service_manager_name">
                        <el-input v-model="base.service_manager_name" placeholder="姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                    <el-form-item label="服务经理电话" prop="service_manager_mobile">
                        <el-input v-model="base.service_manager_mobile"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                  <div class="clearfix_liner1"></div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="企业LOGO" prop="logo_url">
                    <div class="el_pic" id="logo_url">
                      <dl>
                        <form name="regis_pic0" id="regis_pic0" enctype="multipart/form-data">
                          <dd class="opload_img" id="preview0">
                            <img data-mame="logo_url" v-bind:src="base.logo_url" v-on:click="showpic($event)">
                          </dd>
                          <dd class="tips"><i class="el-icon-warning"></i></dd>
                          <dd class="ipload">
                            <input type="file" name="logo_url" size="32" accept="image/png,image/jpg,image/jpeg" class="file file_style" value="" v-on:change="upload_pic($event,0,'logo_url')" />上传文件
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
                  <el-form-item label="企业ICON" prop="icon_url">
                    <div class="el_pic" id="icon_url">
                      <dl>
                        <form name="regis_pic3" id="regis_pic3" enctype="multipart/form-data">
                          <dd class="opload_img" id="preview3">
                            <img data-mame="icon_url" v-bind:src="base.icon_url" v-on:click="showpic($event)">
                          </dd>
                          <dd class="tips"><i class="el-icon-warning"></i></dd>
                          <dd class="ipload">
                            <input type="file" name="icon_url" size="32" accept="image/png,image/jpg,image/jpeg" class="file file_style" value="" v-on:change="upload_pic($event,3,'icon_url')" />上传文件
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
                  <el-form-item label="营业执照" prop="business_license_url">
                    <div class="el_pic" id="business_license_url">
                      <dl>
                        <form name="regis_pic1" id="regis_pic1" enctype="multipart/form-data">
                          <dd class="opload_img" id="preview1">
                            <img data-mame="business_license_url" v-bind:src="base.business_license_url" v-on:click="showpic($event)">
                          </dd>
                          <dd class="tips"><i class="el-icon-warning"></i></dd>
                          <dd class="ipload">
                            <input type="file" name="business_license_url" size="32" accept="image/png,image/jpg,image/jpeg" class="file file_style" value="" v-on:change="upload_pic($event,1,'business_license_url')" />上传文件
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
                  <el-form-item label="开户许可证" prop="bank_account_url">
                    <div class="el_pic" id="bank_account_url">
                      <dl>
                        <form name="regis_pic2" id="regis_pic2" enctype="multipart/form-data">
                          <dd class="opload_img" id="preview2">
                            <img data-mame="bank_account_url" v-bind:src="base.bank_account_url" v-on:click="showpic($event)">
                          </dd>
                          <dd class="tips"><i class="el-icon-warning"></i></dd>
                          <dd class="ipload">
                            <input type="file" name="bank_account_url" size="32" accept="image/png,image/jpg,image/jpeg" class="file file_style" value="" v-on:change="upload_pic($event,2,'bank_account_url')" />上传文件
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
                  <el-form-item label="渠道地址" prop="address">
                    <el-input v-model="base.address"></el-input>
                  </el-form-item>
                </el-col>
                <div class="clearfix"></div>
                <div class="t_c mar_t20">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-button @click="showli_one">上一步</el-button>
                    <el-button type="primary" @click="one2_next('base')">下一步</el-button>
                  </el-col>
                </div>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="step_show" v-show="li_two">
          <p class="title">账户信息</p>
          <div class="step_show_inner">
            <el-form :model="account" :rules="rules_account" ref="account" label-width="145px" class="demo-ruleForm">
              <el-row>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="收款人姓名" prop="bankuser">
                    <el-input v-model="account.bankuser"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="银行账户" prop="bankaccount">
                    <el-input v-model="account.bankaccount"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="总行名称" prop="headbankname">
                    <el-select v-model="account.headbankname" placeholder="请选择总行" v-on:change="select_bank" filterable>
                      <el-option v-for="headbankname in headbanks" v-bind:bankid="headbankname.headbankid" v-bind:value="headbankname.headbankname" v-bind:label="headbankname.headbankname" v-on:click="bankid($event)">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <input type="hidden" name="" v-model="account.bankcode">
                  <el-form-item label="支行名称" prop="bankname">
                    <el-select v-model="account.bankname" placeholder="请选择支行" v-on:change="select_bankbranch" filterable>
                      <el-option v-for="bankname in branchbanks" v-bind:datacode="bankname.bankcode" v-bind:value="bankname.name" v-bind:label="bankname.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                  <div class="clearfix_liner1"></div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="结算类型" prop="banktype">
                    <el-select v-model.number="account.banktype" placeholder="请选择结算类型">
                      <el-option v-for="banktype in banktypes.records" v-bind:value="banktype.tp" v-bind:label="banktype.text">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="结算方式" prop="settle_cycle">
                    <el-select v-model.number="account.settle_cycle" placeholder="请选择结算方式" disabled>
                      <el-option v-for="cycle in settle_cycle.records" v-bind:value="cycle.tp" v-bind:label="cycle.text">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="起结金额" prop="settle_base_amt">
                    <el-input v-model.number="account.settle_base_amt">
                      <template slot="append">元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8">
                                    <el-form-item label="手续费" prop="fee">
                                        <el-input v-model.number="account.fee">
                                            <template slot="append">%</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col> -->
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="微信成本费率" prop="wechat_fee">
                    <el-input v-model.number="account.wechat_fee">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="支付宝成本费率" prop="alipay_fee">
                    <el-input v-model.number="account.alipay_fee">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="QQ钱包成本费率" prop="qqwallet_fee">
                    <el-input v-model.number="account.qqwallet_fee">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="京东钱包成本费率" prop="jd_fee">
                    <el-input v-model.number="account.jd_fee">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="刷卡成本费率" prop="swipecard_fee">
                    <el-input v-model.number="account.swipecard_fee">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                  <el-form-item label="商户默认费率" prop="default_mchnt_fee">
                    <el-input v-model.number="account.default_mchnt_fee">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <div class="clearfix"></div>
                <div class="t_c mar_t20">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-button @click="showli_one2">上一步</el-button>
                    <el-button type="primary" @click="two_next('account')">下一步</el-button>
                  </el-col>
                </div>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="step_show" v-show="li_three">
          <p class="title">增值产品</p>
          <div class="step_show_inner">
            <template>
              <el-table ref="multipleTable" :data="products" border stripe style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="product_id" label="产品编号" resizable min-width="120px">
                </el-table-column>
                <el-table-column prop="name" label="产品名称" resizable min-width="100px">
                </el-table-column>
                <el-table-column prop="intro" label="产品简介" resizable min-width="170px">
                </el-table-column>
              </el-table>
            </template>
            <div class="mar_t20 t_c">
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                  <el-button @click="showli_tow">上一步</el-button>
                  <el-button type="primary" @click="three_save">保存</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
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
  name: 'channel_index',
  data() {
    var checkamt = (rule, value, callback) => {
      // if (!value) {
      //     return callback(new Error('请输入起结金额'));
      // }
      //let reg = /^[0-9]{0,9}$/;
      let reg = /^[0-9]{0,9}(\.{1}\d{1,2}){0,1}$/;
      //value = value.toString().replace(/\D/g, '');
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('请输入数字值,最大9位数'));
        } else {
          callback();
        }
      }, 100);
    };
    var check_fee_has = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入成本费率'));
      }
      let reg = /^[0-9]{0,2}(\.{1}\d{1,2}){0,1}$/;
      //value = value.toString().replace(/\D/g, '');
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('成本费率填写错误'));
        } else {
          callback();
        }
      }, 100);
    };
    var check_fee = (rule, value, callback) => {
      let reg = /^[0-9]{0,2}(\.{1}\d{1,2}){0,1}$/;
      //value = value.toString().replace(/\D/g, '');
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('成本费率填写错误'));
        } else if (value > 0 && value < 0.38) {
          callback(new Error('商户默认费率最低0.38%， 即≥0.38'));
        } else {
          callback();
        }
      }, 100);
    };
    return {
      big_pic_show: false, //大图弹框是否显示
      big_pic_url: '', //弹框中大图绑定的地址
      loading: false, //load是否显示
      toastmsg: '', //提示文字
      visible_toast: false, //toast是否显示
      bank_error: false, //银行是否选择
      bankname_error: false, //分行是否选择
      one_over: false, //第一步是否验证通过
      one2_over: false, //第一步半是否验证通过
      two_over: false, //第二部是否验证通过
      li_one: true, //第一步 展示true，失效false
      li_one2: false,
      li_two: false, //第二步 展示true，失效false
      li_three: false, //第三步 展示true，失效false
      email_pre: '',
      mobile_pre: '',
      idnumber_pre: '',
      branchbank_if: false, //支行是否执行
      check_all: false, //全选
      check_one: [], //tr中列表是否选中
      channels: {}, //ajax获取
      banktypes: {}, //ajax获取
      settle_cycle: {}, //ajax获取
      pro_city: [], //ajax获取
      citys: [],
      headbanks: [], //ajax获取
      branchbanks: [], //ajax获取
      products: [], //ajax获取
      userid: "", // 渠道预注册接口返回的userid, hashids.encode之后的userid//ajax获取
      city_id: '', //为了获取对应省份城市的银行--中间参数
      countries: {}, //ajax获取
      timezones: {}, //ajax获取
      currencys: {}, //ajax获取
      pro_authcity: [], //ajax获取-----------获取的授权地址--所有信息
      authcitys: [{ 'citys': [] }], //存储地址列表的省-区域的列表值
      authcountys: [{ 'countys': [] }], //存储地址列表的省-区域的列表值
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
        'auth_areas': [{ "auth_province": "", "auth_city": ""}], //地址列表-----------地址列表
        "manager_name": "",                   // 渠道经理
        "manager_mobile": "",          // 渠道经理电话
        "service_manager_name": "",           // 渠道服务经理
        "service_manager_mobile": "",  // 渠道服务经理电话
      },
      account: {
        "bankaccount": "", // 收款账户(网点账户号)
        "bankuser": "", // 开户名称(网点开户名)
        "headbankname": "", // 银行总行名称
        "bankname": "", // 银行开户行名称(网店名称/支行名称)
        "bankcode": "", //分行code
        "banktype": '', // 结算类型(账户类型): 1 对私, 2 对公
        "settle_cycle": '', // 结算方式(结算周期): 1 实时, 2 月结, 3 季度结
        "settle_base_amt": '', // 起结金额, 单位: 分
        "fee": '', // 手续费, 单位: 百分比
        "wechat_fee": '', // 微信手续费
        "alipay_fee": '', // 支付宝手续费
        "jd_fee": '', // 京东手续费
        "qqwallet_fee": '', // QQ 钱包手续费
        "swipecard_fee": '', // 刷卡手续费
        "default_mchnt_fee": '', //商户默认费率
      },
      product: [], // 要开通的增值产品(product_id)列表
      headbankid: '', //中间值-总行id
      qd_types_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/qd_types', //渠道类型
      qd_country_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/countries', //国家
      qd_timezone_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/timezones', //时区
      qd_currency_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/currencies', //币种
      qd_areacities_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/areacities', //省份城市列表
      qd_headbanks_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/headbanks', //银行总行列表
      qd_branchbanks_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/branchbanks', //银行支行列表
      qd_banktypes_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/banktypes', //结算类型
      qd_cycle_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/settle_cycle', //结算方式列表
      products_url: location.protocol + '//' + location.host + '/qudao/v1/api/tools/products', //获取产品列表
      productsnew_url: location.protocol + '//' + location.host + '/qudao/v1/api/qd/product_info', //获取产品列表
      userid_url: location.protocol + '//' + location.host + '/qudao/v1/api/qd/precreate', //获取userid
      create_url: location.protocol + '//' + location.host + '/qudao/v1/api/qd/create', //提交数据
      uploadfile_url: location.protocol + '//' + location.host + '/util/v1/uploadfile', //上传图片 
      loginuserid_url: location.protocol + '//' + location.host + '/qudao/v1/api/qd/info', //获取当前渠道信息--登陆后的userid
      rules: {
        name: yanzheng.test_qd_name('渠道名称', 1, 30, true, 'blur'),
        short_name: yanzheng.test_qd_name('渠道简称', 1, 30, true, 'blur'),
        legal_name: [{
          required: true,
          pattern: /^[\u4e00-\u9fa5]{1,4}$/,
          message: '请输入法人名称，长度在 1 到 4 个字符',
          trigger: 'blur'
        }],
        email: [{
          type: 'email',
          required: true,
          message: '请填写正确的邮箱',
          trigger: 'blur'
        }],
        mobile: [{
          required: true,
          pattern: /^1[0-9]{10}$/,
          message: '请填写正确的手机号',
          trigger: 'blur'
        }],
        legal_idnumber: [{
          required: true,
          pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
          message: '请填写正确的身份证号',
          trigger: 'blur'
        }],
        type: [{
          type: "number",
          required: true,
          message: '请选择渠道类型',
          trigger: 'change'
        }],
        slsm_uid: [{
          type: "number",
          required: false,
          message: '请填写正确的所属业务员',
          trigger: 'blur'
        }],
        slsm_mobile: [{
          required: true,
          pattern: /^1[0-9]{10}$/,
          message: '请填写正确的手机号',
          trigger: 'blur'
        }],
        business_name: [{
          required: true,
          pattern: /^[\u4e00-\u9fa5]{1,4}$/,
          message: '请输入业务联系人，长度在 1 到 4 个字符',
          trigger: 'blur'
        }],
        business_mobile: [{
          required: true,
          pattern: /^1[0-9]{10}$/,
          message: '请填写正确的手机号',
          trigger: 'blur'
        }],
        business_email: [{
          type: 'email',
          required: false,
          message: '请填写正确的邮箱',
          trigger: 'blur'
        }],
        finace_name: [{
          required: false,
          pattern: /^[\u4e00-\u9fa5]{1,4}$/,
          message: '请输入业务联系人，长度在 1 到 4 个字符',
          trigger: 'blur'
        }],
        finace_mobile: [{
          required: false,
          pattern: /^1[0-9]{10}$/,
          message: '请填写正确的手机号',
          trigger: 'blur'
        }],
        finace_email: [{
          type: 'email',
          required: false,
          message: '请填写正确的邮箱',
          trigger: 'blur'
        }],
        address: [{
          required: true,
          message: '请填写正确的地址',
          trigger: 'blur'
        }, {
          min: 1,
          max: 100,
          message: '长度在 1 到 100 个字符',
          trigger: 'blur'
        }],
        province: [{
          required: true,
          message: '请选择所在省份',
          trigger: 'change'
        }],
        city: [{
          required: true,
          message: '请选择所在城市',
          trigger: 'change'
        }],
        logo_url: [{
          required: true,
          pattern: /^(http)/,
          message: '图片格式为“png/jpg/jepg”,不能大于10M!',
          trigger: 'change'
        }],
        icon_url: [{
          required: true,
          pattern: /^(http)/,
          message: '图片格式为“png/jpg/jepg”,不能大于10M!',
          trigger: 'change'
        }],
        business_license_url: [{
          required: false,
          pattern: /(?=\/qudao\/v1\/static\/login\/img\/ic_img.png)|(^(http))/,
          message: '图片格式为“png/jpg/jepg”,不能大于10M!',
          trigger: 'change'
        }],
        bank_account_url: [{
          required: false,
          pattern: /(?=\/qudao\/v1\/static\/login\/img\/ic_img.png)|(^(http))/,
          message: '图片格式为“png/jpg/jepg”,不能大于10M!',
          trigger: 'change'
        }],
        country: [{
          required: true,
          message: '请选择国家',
          trigger: 'change'
        }],
        timezone: [{
          required: true,
          message: '请选择时区',
          trigger: 'change'
        }],
        currency: [{
          required: true,
          message: '请选择币种',
          trigger: 'change'
        }],
        auth_province: [{
          required: true,
          message: '请选择所在省份',
          trigger: 'change'
        }],
        auth_city: [{
          required: false,
          message: '请选择所在城市',
          trigger: 'change'
        }],
        manager_name: yanzheng.test_chinese('渠道经理姓名',1,4,false,'blur'),
        manager_mobile: yanzheng.test_tel('渠道经理手机号',false,'blur'),
        service_manager_name:yanzheng.test_chinese('服务经理姓名',1,4,false,'blur'),
        service_manager_mobile: yanzheng.test_telephone('服务经理电话',false,'blur'),
      },
      rules_account: {
        bankuser: [{
          required: true,
          pattern: /^[\u4e00-\u9fa5]{1,30}$/,
          message: '请输入收款账户，长度在 1 到 30 个字符',
          trigger: 'blur'
        }],
        bankaccount: [{
          required: true,
          pattern: /^[0-9]{1,50}$/,
          message: '请输入银行账号，长度在 1 到 50 个字符',
          trigger: 'blur'
        }],
        settle_base_amt: [{
          validator: checkamt,
          // type: 'number',
          // required: false,
          // len:8,
          // message: '请输入起结金额，长度在 1 到 8 个字符',
          trigger: 'blur'
        }],
        fee: [{
          type: 'number',
          required: true,
          max: 100,
          message: '请输入手续费',
          trigger: 'blur'
        }],
        banktype: [{
          type: "number",
          required: false,
          message: '请选择结算类型',
          trigger: 'change'
        }],
        settle_cycle: [{
          type: "number",
          required: false,
          message: '请选择结算方式',
          trigger: 'change'
        }],
        headbankname: [{
          required: true,
          message: '请选择总行',
          trigger: 'change'
        }],
        bankname: [{
          required: true,
          message: '请选择支行',
          trigger: 'change'
        }],
        wechat_fee: [{
          validator: check_fee_has,
          // type: 'number',
          required: true,
          // max: 100,
          // message: '请输入手续费',
          trigger: 'blur'
        }],
        alipay_fee: [{
          validator: check_fee_has,
          // type: 'number',
          required: true,
          // max: 100,
          // message: '请输入手续费',
          trigger: 'blur'
        }],
        jd_fee: [{
          validator: check_fee_has,
          // type: 'number',
          required: true,
          // max: 100,
          // message: '请输入手续费',
          trigger: 'blur'
        }],
        qqwallet_fee: [{
          validator: check_fee_has,
          // type: 'number',
          required: true,
          // max: 100,
          // message: '请输入手续费',
          trigger: 'blur'
        }],
        swipecard_fee: [{
          validator: check_fee_has,
          // type: 'number',
          required: true,
          // max: 100,
          // message: '请输入手续费',
          trigger: 'blur'
        }],
        default_mchnt_fee: [{
          validator: check_fee,
          // type: 'number',
          // required: false,
          // max: 100,
          // message: '请输入手续费',
          trigger: 'blur'
        }],
      },
    }
  },
  created: function() {
    this.get_qdtypes(); //获取渠道类型  
    this.get_country(); //获取国家 
    this.get_timezone(); //获取时区 
    this.get_currency(); //获取币种      
    this.get_banktypes(); //获取结算类型       
    this.get_cycle(); //获取结算方式      
    this.get_area(); //获取省份城市 
    this.get_autharea(); //获取授权身份城市
    //this.get_products(); //获取产品列表--获取userid后调用--已取消
    this.get_products_new(); //获取产品列表
    //设置下拉选项的初始值
    this.account.settle_base_amt = (this.account.settle_base_amt / 100).toFixed(0);
    //给预注册的3个信息初次赋值
    this.email_pre = this.base.email;
    this.mobile_pre = this.base.mobile;
    this.idnumber_pre = this.base.legal_idnumber;
    //this.get_branchbank();//测试
  },
  computed:{
      pro_authcity_len:function(){
          return this.pro_authcity.length;
      }
  },
  watch: {
    // product: {
    //     handler: function(val, oldVal) {
    //         if (this.product.length === this.products.length) {
    //             this.check_all = true;
    //         } else {
    //             this.check_all = false;
    //         }
    //     },
    //     deep: true
    // },
    branchbank_if: function(val, oldVal) {
      if (this.branchbank_if) {
        this.get_banks(); //获取总行 
      }
    },
    city_id: function(val, oldVal) {
      this.get_banks(); //获取总行 
    },
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
    //步数切换
    showli_one: function() {
      this.li_one = true;
      this.li_one2 = false;
      this.li_two = false;
      this.li_three = false;
    },
    showli_one2: function() {
      this.li_one = false;
      this.li_one2 = true;
      this.li_two = false;
      this.li_three = false;
    },
    showli_tow: function() {
      this.li_one = false;
      this.li_one2 = false;
      this.li_two = true;
      this.li_three = false;
    },
    showli_three: function() {
      this.li_one = false;
      this.li_one2 = false;
      this.li_two = false;
      this.li_three = true;
    },
    //省份值变化后，市也变化
    select_pro: function() {
      for (let i = 0; i < this.pro_city.length; i++) {
        if (this.pro_city[i].areaname == this.base.province) {
          this.citys = this.pro_city[i].cities;
          this.base.city = this.citys[0].cityname;
          this.city_id = this.citys[0].cityid;
          return false;
        } else {
          this.citys = [];
        }
      }
    },
    //市值也变化，求id
    select_city: function() {
      for (let i = 0; i < this.citys.length; i++) {
        if (this.citys[i].cityname == this.base.city) {
          this.city_id = this.citys[i].cityid;
          return false;
        }
      }
    },
    //总行变化后，调整支行
    select_bank: function() {
      var _this = this;
      let select_op = '';
      for (let i = 0; i < _this.headbanks.length; i++) {
        if (_this.headbanks[i].headbankname == _this.account.headbankname) {
          select_op = _this.headbanks[i].headbankid;
          break;
        }
      }
      // var index = e.target.selectedIndex;
      // var select_op = e.target[index].attributes.areaid.value;
      //console.log(select_op);
      let post_data = {
        'headbankid': select_op,
        'cityid': _this.city_id,
      };
      _this.get_branchbank(post_data);
    },
    //zhi行变化后，调整支行code
    select_bankbranch: function() {
      var _this = this;
      let select_op = '';
      for (let i = 0; i < _this.branchbanks.length; i++) {
        if (_this.branchbanks[i].name == _this.account.bankname) {
          _this.account.bankcode = _this.branchbanks[i].bankcode;
          return false;
        }
      }
      //console.log(_this.account.bankcode);
      // var index = e.target.selectedIndex;
      // this.account.bankcode = e.target[index].attributes.datacode.value;
    },
    //上传图片
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
        _this.toastmsg = '图片不能大于10M!';
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
      this.$http.post(this.uploadfile_url, formdata, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(function(response) {
          _this.loading = false;
          let data_return = response.body;
          let div = document.getElementById(name);
          if (data_return.respcd == '0000') {
            _this.base[name] = data_return.data.url;
            //document.getElementById('imghead' + n).src=data_return.data.url;
            div.className = 'el_pic';
          } else {
            div.className = 'el_pic error';
            if (data_return.respmsg) {
              _this.toastmsg = data_return.respmsg;
            } else {
              _this.toastmsg = data_return.resperr;
            }
            _this.visible_toast = true;
          }
        }, function(response) {
          let div = document.getElementById(name);
          div.className = 'el_pic error';
          _this.loading = false;
          _this.visible_toast = true;
          _this.toastmsg = '网络超时!';
        })
        .catch(function(response) {
          let div = document.getElementById(name);
          div.className = 'el_pic';
          _this.loading = false;
        });
    },
    //点击查看大图
    showpic: function(e) {
      this.big_pic_url = e.target.currentSrc;
      this.big_pic_show = true;
    },
    one_next(formName) {
      var _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (_this.email_pre !== _this.base.email || _this.mobile_pre !== _this.base.mobile || _this.idnumber_pre !== _this.base.legal_idnumber) {
            _this.get_userid();
          } else {
            _this.showli_one2();
          }
          _this.one_over = true;
        } else {
          _this.one_over = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    one2_next(formName) {
      var _this = this;
      // var logo_error = false,
      //     icon_error = false;
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
          _this.one2_over = true;
          _this.showli_tow();
        } else {
          _this.one2_over = false;
          return false;
        }
      });
    },
    two_next(formName) {
      var _this = this;
      if (_this.account.headbankname == '' || !_this.account.headbankname) {
        _this.bank_error = true;
      } else {
        _this.bank_error = false;
      }
      if (_this.account.bankname == '0' || !_this.account.bankname) {
        _this.bankname_error = true;
      } else {
        _this.bankname_error = false;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.two_over = true;
          if (!_this.bank_error && !_this.bankname_error) {
            _this.showli_three();
          }
        } else {
          _this.two_over = false;
          return false;
        }
      });
    },
    three_save: function() {
      //保存信息
      var _this = this;
      if (!_this.two_over || !_this.one_over || !_this.one2_over) {
        _this.toastmsg = '请完善前面的信息！';
        _this.visible_toast = true;
        return false;
      }
      // if (_this.product.length <= 0) {
      //     _this.toastmsg = '请选择增值产品！';
      //     _this.visible_toast = true;
      //     return false;
      // }
      _this.account.settle_base_amt = _this.account.settle_base_amt * 100; //起结金额单位换算成分
      //如果没有上传一下两个图片，设置值为空
      if (_this.base.business_license_url == '/qudao/v1/static/login/img/ic_img.png') {
        _this.base.business_license_url = '';
      }
      if (_this.base.bank_account_url == '/qudao/v1/static/login/img/ic_img.png') {
        _this.base.bank_account_url = '';
      }
      var post_data = {
        'userid': _this.userid,
        'base': _this.base,
        'account': _this.account,
        'product': _this.product,
      };
      this.$http.post(this.create_url, post_data, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(function(response) {
          _this.loading = false;
          var data_return = response.body;
          if (data_return.respcd == '0000') {
            _this.toastmsg = '保存成功！';
            _this.visible_toast = true;
            _this.$refs.base1.resetFields(); //重置第一步的信息
            _this.one_over = false; //同时设置第一步未完成
            _this.one2_over = false; //同时设置第2步未完成
            _this.two_over = false; //同时设置第3步未完成
            // _this.$refs.base.resetFields();//重置第2步的信息
            // _this.$refs.account.resetFields();//重置第3步的信息
            _this.$refs.multipleTable.clearSelection(); //清空产品选择情况
            _this.product = []; //清空产品选择情况
            _userid = '';
          } else {
            _this.account.settle_base_amt = (_this.account.settle_base_amt / 100).toFixed(0); //起结金额单位还原成元
            _this.base.business_license_url = '/qudao/v1/static/login/img/ic_img.png';//非必填图片还原默认图标
            _this.base.bank_account_url = '/qudao/v1/static/login/img/ic_img.png';
            if (data_return.respmsg) {
              _this.toastmsg = data_return.respmsg;
            } else {
              _this.toastmsg = data_return.resperr;
            }
            _this.visible_toast = true;
          }
        }, function(response) {
          _this.account.settle_base_amt = (_this.account.settle_base_amt / 100).toFixed(0); //起结金额单位还原成元
          _this.base.business_license_url = '/qudao/v1/static/login/img/ic_img.png';//非必填图片还原默认图标
          _this.base.bank_account_url = '/qudao/v1/static/login/img/ic_img.png';
          _this.loading = false;
          _this.visible_toast = true;
          _this.toastmsg = '网络超时!';
        })
        .catch(function(response) {
          _this.account.settle_base_amt = (_this.account.settle_base_amt / 100).toFixed(0); //起结金额单位还原成元
          _this.base.business_license_url = '/qudao/v1/static/login/img/ic_img.png';//非必填图片还原默认图标
          _this.base.bank_account_url = '/qudao/v1/static/login/img/ic_img.png';
          _this.loading = false;
        });
    },
    //获取特定渠道的可用的增值产品列表--取消不用
    get_products: function() {
      var _this = this;
      let postdata = {
        'qd_uid': _this.base.userid,
      };
      this.$http.get(this.products_url, {
          'params': postdata,
          before: function() {
            _this.loading = true;
          }
        })
        .then(function(response) {
          _this.loading = false;
          var data_return = response.body;
          if (data_return.respcd == '0000') {
            _this.products = data_return.data;
          } else {
            if (data_return.respmsg) {
              _this.toastmsg = data_return.respmsg;
            } else {
              _this.toastmsg = data_return.resperr;
            }
            _this.visible_toast = true;
          }
        }, function(response) {
          _this.loading = false;
          _this.visible_toast = true;
          _this.toastmsg = '网络超时!';
        })
        .catch(function(response) {
          _this.loading = false;
        });
      // _this.products = [{
      //     "product_id": 123, // 产品编号
      //     "name": "会员体系", // 产品名称
      //     "intro": "简介", // 产品简介
      // }, {
      //     "product_id": 333, // 产品编号
      //     "name": "会员体系", // 产品名称
      //     "intro": "简介", // 产品简介
      // }, {
      //     "product_id": 444, // 产品编号
      //     "name": "会员体系", // 产品名称
      //     "intro": "简介", // 产品简介
      // }, {
      //     "product_id": 555, // 产品编号
      //     "name": "会员体系", // 产品名称
      //     "intro": "简介", // 产品简介
      // }, {
      //     "product_id": 666, // 产品编号
      //     "name": "会员体系", // 产品名称
      //     "intro": "简介", // 产品简介
      // }];
    },
    //获取特定渠道的可用的增值产品列表
    get_products_new: function() {
      var _this = this;
      this.$http.get(this.productsnew_url, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(function(response) {
          _this.loading = false;
          var data_return = response.body;
          if (data_return.respcd == '0000') {
            let pro_info = data_return.data;
            for (let i = 0; i < pro_info.length; i++) {
              if (pro_info[i].status == '0') {
                _this.products.push(pro_info[i]);
              }
            }
          } else {
            if (data_return.respmsg) {
              _this.toastmsg = data_return.respmsg;
            } else {
              _this.toastmsg = data_return.resperr;
            }
            _this.visible_toast = true;
          }
        }, function(response) {
          _this.loading = false;
          _this.visible_toast = true;
          _this.toastmsg = '网络超时!';
        })
        .catch(function(response) {
          _this.loading = false;
        });
    },
    //获取userid,渠道预注册
    get_userid: function() {
      var _this = this;
      var post_data = {
        "username": _this.base.mobile,
        "email": _this.base.email,
        //"password": _this.base.legal_idnumber.substr(-6),
      };
      this.$http.post(_this.userid_url, post_data, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(function(response) {
          _this.loading = false;
          var data_return = response.body;
          if (data_return.respcd == '0000') {
            _this.userid = data_return.data.userid;
            //执行下一步并给记录内容赋值--用于监测是否再次调用预注册接口
            _this.showli_one2();
            _this.email_pre = _this.base.email;
            _this.mobile_pre = _this.base.mobile;
            _this.idnumber_pre = _this.base.legal_idnumber;
            //调用可用产品--已取消
            //_this.get_products();
          } else {
            if (data_return.respmsg) {
              _this.toastmsg = data_return.respmsg;
            } else {
              _this.toastmsg = data_return.resperr;
            }
            _this.visible_toast = true;
          }
        }, function(response) {
          _this.loading = false;
          _this.visible_toast = true;
          _this.toastmsg = '网络超时!';
        })
        .catch(function(response) {
          _this.loading = false;
        });
      // _this.userid = '125tghgjh';
      // _this.showli_one2();
    },
    //获取渠道类型列表
    get_qdtypes: function() {
      var _this = this;
      this.$http.get(this.qd_types_url, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(function(response) {
          _this.loading = false;
          var data_return = response.body;
          if (data_return.respcd == '0000') {
            _this.channels = data_return.data;
            //设置初始值
            _this.base.type = _this.channels.default;
          } else {
            if (data_return.respmsg) {
              _this.toastmsg = data_return.respmsg;
            } else {
              _this.toastmsg = data_return.resperr;
            }
            _this.visible_toast = true;
          }
        }, function(response) {
          _this.loading = false;
          _this.visible_toast = true;
          _this.toastmsg = '网络超时!';
        })
        .catch(function(response) {
          _this.loading = false;
        });
    },
    //获取国家
    get_country: function() {
      var _this = this;
      this.$http.get(this.qd_country_url, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(function(response) {
          _this.loading = false;
          var data_return = response.body;
          if (data_return.respcd == '0000') {
            _this.countries = data_return.data;
            //设置初始值
            _this.base.country = _this.countries.default;
          } else {
            if (data_return.respmsg) {
              _this.toastmsg = data_return.respmsg;
            } else {
              _this.toastmsg = data_return.resperr;
            }
            _this.visible_toast = true;
          }
        }, function(response) {
          _this.loading = false;
          _this.visible_toast = true;
          _this.toastmsg = '网络超时!';
        })
        .catch(function(response) {
          _this.loading = false;
        });
    },
    //获取时区
    get_timezone: function() {
      var _this = this;
      this.$http.get(this.qd_timezone_url, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(function(response) {
          _this.loading = false;
          var data_return = response.body;
          if (data_return.respcd == '0000') {
            _this.timezones = data_return.data;
            //设置初始值
            _this.base.timezone = _this.timezones.default;
          } else {
            if (data_return.respmsg) {
              _this.toastmsg = data_return.respmsg;
            } else {
              _this.toastmsg = data_return.resperr;
            }
            _this.visible_toast = true;
          }
        }, function(response) {
          _this.loading = false;
          _this.visible_toast = true;
          _this.toastmsg = '网络超时!';
        })
        .catch(function(response) {
          _this.loading = false;
        });
    },
    //获取币种
    get_currency: function() {
      var _this = this;
      this.$http.get(this.qd_currency_url, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(function(response) {
          _this.loading = false;
          var data_return = response.body;
          if (data_return.respcd == '0000') {
            _this.currencys = data_return.data;
            //设置初始值
            _this.base.currency = _this.currencys.default;
          } else {
            if (data_return.respmsg) {
              _this.toastmsg = data_return.respmsg;
            } else {
              _this.toastmsg = data_return.resperr;
            }
            _this.visible_toast = true;
          }
        }, function(response) {
          _this.loading = false;
          _this.visible_toast = true;
          _this.toastmsg = '网络超时!';
        })
        .catch(function(response) {
          _this.loading = false;
        });
    },
    //获取结算类型
    get_banktypes: function() {
      var _this = this;
      this.$http.get(this.qd_banktypes_url, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(function(response) {
          _this.loading = false;
          var data_return = response.body;
          if (data_return.respcd == '0000') {
            _this.banktypes = data_return.data;
            //设置初始值
            _this.account.banktype = _this.banktypes.default;
          } else {
            if (data_return.respmsg) {
              _this.toastmsg = data_return.respmsg;
            } else {
              _this.toastmsg = data_return.resperr;
            }
            _this.visible_toast = true;
          }
        }, function(response) {
          _this.loading = false;
          _this.visible_toast = true;
          _this.toastmsg = '网络超时!';
        })
        .catch(function(response) {
          _this.loading = false;
        });
    },
    //获取结算方式列表
    get_cycle: function() {
      var _this = this;
      this.$http.get(this.qd_cycle_url, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(function(response) {
          _this.loading = false;
          var data_return = response.body;
          if (data_return.respcd == '0000') {
            _this.settle_cycle = data_return.data;
            //设置初始值
            _this.account.settle_cycle = _this.settle_cycle.default;
          } else {
            if (data_return.respmsg) {
              _this.toastmsg = data_return.respmsg;
            } else {
              _this.toastmsg = data_return.resperr;
            }
            _this.visible_toast = true;
          }
        }, function(response) {
          _this.loading = false;
          _this.visible_toast = true;
          _this.toastmsg = '网络超时!';
        })
        .catch(function(response) {
          _this.loading = false;
        });
    },
    //获取省份城市列表
    get_area: function() {
      var _this = this;
      _this.$http.get(_this.qd_areacities_url, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(function(response) {
          _this.loading = false;
          var data_return = response.body;
          if (data_return.respcd == '0000') {
            _this.pro_city = data_return.data.records;
            //设置初始值
            _this.base.province = _this.pro_city[0].areaname;
            _this.citys = _this.pro_city[0].cities;
            _this.base.city = _this.citys[0].cityname;
            _this.branchbank_if = true;
          } else {
            if (data_return.respmsg) {
              _this.toastmsg = data_return.respmsg;
            } else {
              _this.toastmsg = data_return.resperr;
            }
            _this.visible_toast = true;
          }
        }, function(response) {
          _this.loading = false;
          _this.visible_toast = true;
          _this.toastmsg = '网络超时!';
        })
        .catch(function(response) {
          _this.loading = false;
        });
    },
    //获取银行总行列表
    get_banks: function() {
      var _this = this;
      _this.$http.get(_this.qd_headbanks_url, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(function(response) {
          _this.loading = false;
          var data_return = response.body;
          if (data_return.respcd == '0000') {
            _this.headbanks = data_return.data.records;
            //设置初始值 
            _this.account.headbankname = _this.headbanks[0].headbankname;
            if (_this.city_id.length <= 0) {
              _this.city_id = _this.pro_city[0].cities[0].cityid;
            }
            //获取支行
            let post_data = {
              'cityid': _this.city_id,
              'headbankid': _this.headbanks[0].headbankid,
            };
            _this.get_branchbank(post_data);
          } else {
            if (data_return.respmsg) {
              _this.toastmsg = data_return.respmsg;
            } else {
              _this.toastmsg = data_return.resperr;
            }
            _this.visible_toast = true;
          }
        }, function(response) {
          _this.loading = false;
          _this.visible_toast = true;
          _this.toastmsg = '网络超时!';
        })
        .catch(function(response) {
          _this.loading = false;
        });
      // _this.headbanks = [{
      //     "headbankid": 1111, //总行id，在获取支行列表中有用
      //     "headbankname": '中国工商银行', //总行名称
      //     "iscommon": 1, //是否常用，1为常用，0为不常用
      //     "csphone": '95555' //客服电话，默认为空
      // }, {
      //     "headbankid": 222, //总行id，在获取支行列表中有用
      //     "headbankname": '中国农业银行', //总行名称
      //     "iscommon": 1, //是否常用，1为常用，0为不常用
      //     "csphone": '95555' //客服电话，默认为空
      // }, {
      //     "headbankid": 3333, //总行id，在获取支行列表中有用
      //     "headbankname": '中国招商银行', //总行名称
      //     "iscommon": 1, //是否常用，1为常用，0为不常用
      //     "csphone": '95555' //客服电话，默认为空
      // }];
      // //设置初始值 
      // _this.account.headbankname = _this.headbanks[0].headbankname;
      // _this.get_branchbank();
    },
    //获取支行列表
    get_branchbank: function(postdata) {
      var _this = this;
      this.$http.get(this.qd_branchbanks_url, {
          'params': postdata,
          before: function() {
            _this.loading = true;
          }
        })
        .then(function(response) {
          _this.loading = false;
          var data_return = response.body;
          if (data_return.respcd == '0000') {
            _this.branchbanks = data_return.data.records;
            //设置初始值
            _this.account.bankname = _this.branchbanks[0].name;
            _this.account.bankcode = _this.branchbanks[0].bankcode;
          } else {
            if (data_return.respmsg) {
              _this.toastmsg = data_return.respmsg;
            } else {
              _this.toastmsg = data_return.resperr;
            }
            _this.visible_toast = true;
          }
        }, function(response) {
          _this.loading = false;
          _this.visible_toast = true;
          _this.toastmsg = '网络超时!';
        })
        .catch(function(response) {
          _this.loading = false;
        });
      // _this.branchbanks = [{
      //     "bankcode": "102100004898", 
      //     "name": "厦门国际银行上海分行" //支行名称
      // },{
      //     "bankcode": "10210000489811", 
      //     "name": "厦门国际银行上海分行1" //支行名称
      // },{
      //     "bankcode": "10210000489822", 
      //     "name": "厦门国际银行上海分行2" //支行名称
      // }];
      // //设置初始值
      // _this.account.bankname = _this.branchbanks[0].name;
    },
    //设置图片宽高和位置
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
    //图片压缩
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
    //选择监听事件 
    handleSelectionChange(val) {
      let _this = this;
      let select_val = val;
      _this.product = [];
      for (let i = 0; i < select_val.length; i++) {
        let id = select_val[i].product_id;
        _this.product.push(id);
      }
      //console.log(_this.product); 
    },
    //获取省份城市列表
    get_autharea: function() {
      var _this = this;
      let postdata = {
        'allow_empty_city': 1
      };
      _this.$http.get(_this.qd_areacities_url, {
          'params': postdata,
          before: function() {
            _this.loading = true;
          }
        })
        .then(function(response) {
          _this.loading = false;
          var data_return = response.body;
          if (data_return.respcd == '0000') {
            _this.pro_authcity = data_return.data.records;
            //设置初始值
            _this.authcitys[0].citys = _this.pro_authcity[0].cities;
            _this.authcountys[0].countys = _this.pro_authcity[0].cities[0].county;

            _this.base.auth_areas[0].auth_province = _this.pro_authcity[0].areaname;
            _this.base.auth_areas[0].auth_city = _this.authcitys[0].citys[0].cityname;
            _this.base.auth_areas[0].auth_county = _this.authcountys[0].countys[0].countyname;
          } else {
            if (data_return.respmsg) {
              _this.toastmsg = data_return.respmsg;
            } else {
              _this.toastmsg = data_return.resperr;
            }
            _this.visible_toast = true;
          }
        }, function(response) {
          _this.loading = false;
          _this.visible_toast = true;
          _this.toastmsg = '网络超时!';
        })
        .catch(function(response) {
          _this.loading = false;
        });
    },
    //授权省份值变化后，授权市也变化
    select_authpro: function(index) {
      for (let i = 0; i < this.pro_authcity.length; i++) {
        if (this.pro_authcity[i].areaname == this.base.auth_areas[index].auth_province) {
          this.authcitys[index].citys = this.pro_authcity[i].cities;
          //this.authcountys[index].countys = this.pro_authcity[i].cities[0].county;

          this.base.auth_areas[index].auth_city = this.authcitys[index].citys[0].cityname;
          //this.base.auth_areas[index].auth_county = this.authcountys[index].countys[0].countyname;
          return false;
        } else {
          this.authcitys[index].citys = [];
          //this.authcountys[index].countys = [];
        }
      }
    },
    //授权省份值变化后，授权市也变化
    select_authcity: function(index) {
      for (let i = 0; i < this.authcitys[index].citys.length; i++) {
        if (this.authcitys[index].citys[i].cityname == this.base.auth_areas[index].auth_city) {
          this.authcountys[index].countys = this.authcitys[index].citys[i].county;

          this.base.auth_areas[index].auth_county = this.authcountys[index].countys[0].countyname;
          return false;
        } else {
          this.authcountys[index].countys = [];
        }
      }
    },
    //添加新授权区域
    add_quyu() {
      var citys_first = this.pro_authcity[0].cities;
      //var countys_first = this.pro_authcity[0].cities[0].county;
      // var new_sca = { "auth_province": this.pro_authcity[0].areaname, "auth_city": citys_first[0].cityname, "auth_county": countys_first[0].countyname };
      var new_sca = { "auth_province": this.pro_authcity[0].areaname, "auth_city": citys_first[0].cityname};
      var new_citys = { 'citys': citys_first };
      //var new_countys = { 'countys': countys_first };
      this.authcitys.push(new_citys);
      //this.authcountys.push(new_countys);
      this.base.auth_areas.push(new_sca);
      console.log(this.base.auth_areas);
    },
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
@import "../../css/common/const";
ul.step_ul {
  width: 100%;
  height: 45px;
  line-height: 45px;
  &:after {
    content: '';
    clear: both;
  }
  li {
    width: 25%;
    float: left;
    text-align: center;
    font-size: 14px;
    border-bottom: 2px solid @element_bordercolor;
    &.tab {
      border-bottom: 2px solid @orange;
      color: @orange;
    }
  }
}

.step_show {
  width: 100%;
  padding: 20px 0;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  .step_show_inner {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
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
  .el-select {
    width: 100%;
  }
}

.big_pic {
  width: 100%;
  padding: 25px 165px;
  box-sizing: border-box;
  text-align: center;
  img {
    width: 100%;
    height: auto;
  }
}

.add_quyu {
  margin: 0 0 15px 50px;
}

</style>
