<template>
    <div>
        <div class="right_head">
            新增公告
        </div>
        <div class="right_body">
            <el-form label-width="110px" class="demo-ruleForm form_width" ref="new_notice" :model="new_notice" :rules="notice_rule">
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="new_notice.title" type="text" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="new_notice.content" type="textarea" :rows="6" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="发送渠道" prop="qd_list">
                    <el-input v-model="new_notice.qd_list" type="textarea" :rows="6" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否置顶">
                    <el-switch v-model="new_notice.istop" on-text="" off-text=""></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('new_notice')">确认</el-button>
                    <el-button @click="resetForm('new_notice')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <load :visible="loading"></load>
        <toast :msg="toastmsg" :visible="visible_toast" @on-visible-change="onVisibleChange" @on-msg-change="onMsgChange"></toast>
        <bounced :visible="opratedialog">
            <p class="bounced_text">
                您确认要发布该公告？
            </p>
            <!-- <input type="hidden" name="" v-model="notice_id"> -->
            <p slot="footer">
                <span class="bounced_button bounced_sure" @click="mend_chan">确认</span>
                <span class="bounced_button bounced_cancle" @click="opratedialog = false">取消</span>
            </p>
        </bounced>
    </div>
</template>
<script>
export default {
    name: 'addNotice',
    data() {
        return {
            loading: false, //load是否显示
            toastmsg: '', //toast提示文字
            visible_toast: false, //toast是否显示
            opratedialog: false, //增加弹框是否开启
            notice_url: location.protocol + '//' + location.host + '/qudao/v1/api/announcement/create', //增加公告 
            new_notice: {
                "title": '',
                "content": '',
                "qd_list": '',
                "istop": false,
            }, //当前选择的功能
            notice_rule: {
                title: [{
                    required: true,
                    //pattern: /^[\u4e00-\u9fa5]{1,4}$/,
                    message: '请输入公告标题',
                    trigger: 'blur'
                }, {
                    min: 1,
                    max: 50,
                    message: '长度在50个字符以内',
                    trigger: 'blur'
                }],
                content: [{
                    required: true,
                    //pattern: /^[\u4e00-\u9fa5]{1,4}$/,
                    message: '请输入公告内容',
                    trigger: 'blur'
                }, {
                    min: 1,
                    max: 1000,
                    message: '长度在1000个字符以内',
                    trigger: 'blur'
                }],
                qd_list: [{
                    required: false,
                    //pattern: /^[\d+\,{1}(?=\d+)]{0,2000}\d+$/,
                    pattern: /^[\d+\s\,{1}(?=\d+\s)]{1,2000}$/,
                    message: '输入渠道id用英文逗号分隔，如不填写任何内容，默认发送全部渠道',
                    trigger: 'blur'
                }],
            },
        }
    },
    created: function() {},
    watch: {},
    methods: {
        //监听toast是否可见的值得变化
        onVisibleChange(val) {
            this.visible_toast = val; //④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
        },
        //监听toast内容的值得变化
        onMsgChange(val) {
            this.toastmsg = val; //④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
        },
        submitForm(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //_this.sure_ajax();
                    _this.opratedialog=true;//出现确认弹框
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //二次确认
        mend_chan(){
            this.opratedialog=false;
            this.sure_ajax();
        },
        sure_ajax: function() {
            let _this = this;
            if(this.new_notice.istop){
                this.new_notice.istop=1;
            }else{
                this.new_notice.istop=0;
            }
            //console.log(_this.new_notice);
            _this.new_notice.qd_list=_this.new_notice.qd_list.replace(/\s/g,'');
            this.$http.post(this.notice_url, _this.new_notice, {
                    before: function() {
                        _this.loading = true;
                    }
                })
                .then(function(response) {
                    _this.loading = false;
                    let data_return = response.body;
                    if (data_return.respcd == '0000') {
                        _this.visible_toast = true;
                        _this.toastmsg = '新增公告成功!';
                        _this.$refs.new_notice.resetFields();//重置输入框
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
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
.el-form.form_width {
    width: 80%;
    margin: 0 auto;
    .el-button {
        width: 45%;
    }
}
</style>
