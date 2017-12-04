<template>
    <div>
        <div class="right_head">
            {{$t('tradelDetail.titleBank.title')}} --
            <span v-if="detail.trade_status_desc=='成功'" class="orange">{{detail.trade_status_desc}}</span><span class="red" v-else>{{detail.trade_status_desc}}</span> 
        </div>
        <div class="right_body">
            <el-form ref="trade" label-width="125px" class="demo-ruleForm">
                <el-row>
                    <div class="step_show detail_page">
                        <el-col :xs="24" :sm="24" :md="12" :lg="8">
                            <el-form-item :label="$t('generalPro.searchBank.merNum')">
                                <span class="word">{{detail.mchnt_uid}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="8">
                            <el-form-item :label="$t('generalPro.searchBank.merName')">
                                <span class="word">{{detail.mchnt_name}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="8">
                            <el-form-item :label="$t('generalPro.searchBank.salesmanName')">
                                <span class="word">{{detail.slsm_name}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="8">
                            <el-form-item :label="$t('generalPro.searchBank.tradeNum')">
                                <span class="word">{{detail.trade_syssn}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="8">
                            <el-form-item :label="$t('generalPro.searchBank.orig_ssn')">
                                <span class="word">{{detail.orig_ssn}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="8">
                            <el-form-item :label="$t('generalPro.searchBank.orderNum')">
                                <span class="word">{{detail.out_trade_no}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="8">
                            <el-form-item :label="$t('generalPro.searchBank.tradePrice')">
                                <span class="word">{{$store.state.currency}}{{detail.trade_amt | crash_format($store.state.currency)}}</span>
                            </el-form-item>
                        </el-col>
                       <!--  <el-col :xs="24" :sm="24" :md="12" :lg="8">
                            <el-form-item label="手续费：">
                                <span class="word">{{(detail.trade_fee/100).toFixed(2)}}元</span>
                            </el-form-item>
                        </el-col> -->
                        <el-col :xs="24" :sm="24" :md="12" :lg="8">
                            <el-form-item :label="$t('generalPro.searchBank.tradeTime')">
                                <span class="word">{{detail.trade_dtm}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="8">
                            <el-form-item :label="$t('generalPro.searchBank.tradeStyle')">
                                <span class="word">{{detail.trade_type}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="8">
                            <el-form-item :label="$t('generalPro.searchBank.tradeStatus')">
                                <span class="word">{{detail.trade_status_desc}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="8">
                            <el-form-item :label="$t('generalPro.searchBank.tradeDes')">
                                <span class="word">{{detail.trade_msg}}</span>
                            </el-form-item>
                    </div>
                    <div class="m_t_20 t_c">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24">
                            <el-button @click="goback">{{$t('app.return')}}</el-button>
                        </el-col>
                    </div>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'trade_detail',
    data() {
        return {
            detail: {
                "qudao_uid": 0, // 渠道 userid
                "qudao_name": "", // 渠道名
                "mchnt_uid": 0, // 商户 userid
                "mchnt_name": "", // 商户名
                "trade_syssn": "", // 交易流水号
                "orig_ssn": "", // 原交易流水号
                "trade_amt": 0, // 交易金额, 单位为分
                "trade_fee": 0, // 手续费, 单位分
                "trade_dtm": "", // 交易时间
                "trade_type": "", // 交易类型
                "trade_status": "", // 交易状态
                "trade_status_desc": "", // 交易状态描述
                "trade_msg": "", // 交易失败原因
                "mchnt_mobile": "", // 手机号
                "slsm_name": "", // 业务员姓名
            },
        }
    },
    created: function() {
        this.detail = this.$store.state.trade_detail;
    },
    methods: {
        goback: function() {
            this.$router.go(-1);
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
</style>
