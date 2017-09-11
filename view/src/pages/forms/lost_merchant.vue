<template>
    <div>
        <div class="right_head">
            {{$t('forLost.titleBank.title')}}
        </div>
        <div class="right_body">
            <el-form label-width="100px" class="demo-ruleForm" :model="searchkey" :rules="searchkey_rule" ref="searchkey">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="12" :lg="5">
                        <el-form-item :label="$t('generalPro.searchBank.merName')" prop="mchnt_name">
                            <el-input v-model.trim="searchkey.mchnt_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="5">
                        <el-form-item :label="$t('generalPro.searchBank.salesman')" prop="slsm_name">
                            <el-input v-model.trim="searchkey.slsm_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="4">
                        <el-form-item label-width="0" class="t_c">
                            <el-button type="primary" @click="search_sub">{{$t('app.search')}}</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template>
                <el-table :data="salesmen_now" border stripe style="width: 100%">
                    <el-table-column prop="mchnt_name" :label="$t('generalPro.bodyBank.merName')" resizable min-width="80px">
                    </el-table-column>
                    <el-table-column prop="legal_name" :label="$t('generalPro.bodyBank.owner')" resizable min-width="120px">
                    </el-table-column>
                    <el-table-column prop="mobile" :label="$t('generalPro.bodyBank.telphone')" resizable min-width="100px">
                    </el-table-column>
                    <el-table-column prop="last_trade_time" :label="$t('generalPro.bodyBank.lastTradeTime')" resizable min-width="170px">
                    </el-table-column>
                    <el-table-column prop="slsm_name" :label="$t('generalPro.bodyBank.salesman')" resizable>
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
    </div>
</template>
<script>
//import mock from '../../../mock/mock_form'
export default {
    name: 'lost_merchant',
    data() {
        return {
            loading: false, //load是否显示
            toastmsg: '', //toast提示文字
            visible_toast: false, //toast是否显示    
            searchkey: {
                mchnt_name: '',
                slsm_name: '',
            },
            salesmen: [],
            slsm_url: location.protocol + '//' + location.host + '/qudao/v1/api/statistic/lost_mchnts', //获取业务员管理列表 
            down_url: location.protocol + '//' + location.host + '/qudao/v1/api/slsm/list/download', //下载    
            pages_all: 0, //总信息数
            page_per: 20, //每页信息数
            page_now: 1, //当前页数
            pages: 1, //总页数
            salesmen_mid: [], //搜索后的总信息
            salesmen_now: [], //当前展示信息
            searchkey_rule: {
                mchnt_name: [{
                    required: false,
                    pattern: /^[\u4e00-\u9fa5a-zA-Z0-9\s]{1,30}$/,
                    message: this.$t('yanzheng.merNameL'),
                    trigger: 'blur'
                }],
                slsm_name: [{
                    required: false,
                    pattern: /^[\u4e00-\u9fa5a-zA-Z0-9\s]{1,30}$/,
                    message: this.$t('yanzheng.salesmanL'),
                    trigger: 'blur'
                }],
            },
        }
    },
    created: function() {
        this.get_list(); //获取商户列表 
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
        //获取业务员管理列表
        get_list: function() {
            let _this = this;
            let post_data = {
                'page': _this.page_now,
                'page_size': _this.page_per,
                'mchnt_name': _this.searchkey.mchnt_name.replace(/\s/g,''),
                'slsm_name': _this.searchkey.slsm_name.replace(/\s/g,''),
            };
            this.$ajax_log.ajax_get(this, this.slsm_url, post_data, (data_return) => {
                _this.pages_all = data_return.data.total_cnt;
                _this.salesmen_now = data_return.data.records;
            });
            // this.$http.get(this.slsm_url, {
            //         'params': post_data,
            //         before: function() {
            //             _this.loading = true;
            //         }
            //     })
            //     .then(function(response) {
            //         _this.loading = false;
            //         let data_return = response.body;
            //         if (data_return.respcd == '0000') {
            //             _this.pages_all = data_return.data.total_cnt;
            //             _this.salesmen_now = data_return.data.records;
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
        //提交查询
        search_sub: function() {
            this.$refs.searchkey.validate((valid) => {
                if (valid) {
                    this.get_list();
                } else {
                    return false;
                }
            });
            // this.get_list();
        },
        //更改每页显示信息条数
        handleSizeChange(val) {
            let _this = this;
            //console.log(`每页 ${val} 条`);
            _this.page_per = val;
            _this.page_now = 1;
            this.get_list();
        },
        //获取当前页信息
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            let _this = this;
            _this.page_now = val;
            this.get_list();
        },
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
h1.dialog_h1 {
    width: auto;
    display: block;
    text-align: conter;
    font-size: 18px;
    font-weight: bold;
    line-height: 30px;
    padding: 0;
    position: relative;
    top: -26px;
    position: relative;
    z-index: -1;
}

p.dialog_p {
    line-height: 35px;
    margin-top: 20px;
    text-align: center;
}
</style>
