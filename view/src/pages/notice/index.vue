<template>
    <div>
        <div class="right_head">
            公告管理
        </div>
        <div class="right_body">
            <template>
                <el-table :data="salesmen_now" border stripe style="width: 100%">
                    <el-table-column prop="title" label="公告标题" resizable min-width="360px">
                        <template scope="scope">
                            <span class="top_span" v-if="scope.row.istop">置顶</span>
                            <span class="top_span" v-else></span>
                            <!-- <span class="top_span " v-if="scope.row.read">已读</span>
                            <span class="top_span red" v-else>未读</span> -->
                            <el-button type="text" @click="open_dialog(scope.row)">{{scope.row.title}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" label="创建时间" resizable min-width="120px">
                    </el-table-column>
                    <el-table-column label="操作" resizable min-width="120px">
                        <template scope="scope">                            
                            <template v-if="scope.row.can_modify"><el-button :plain="true" type="warning" @click="open_chan(scope.row)">删除</el-button></template>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block t_r mar_t20">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page_now" :page-sizes="[10,20,50,100,200,250]" :page-size="page_per" layout="total, sizes, prev, pager, next" :total="pages_all">
                </el-pagination>
            </div>
        </div>
        <load :visible="loading"></load>
        <toast :msg="toastmsg" :visible="visible_toast" @on-visible-change="onVisibleChange" @on-msg-change="onMsgChange"></toast>
        <bounced :visible="dialogslsm" :newclass="big_bounced">
            <span slot="header">公告详细<i class="close"  @click="dialogslsm = false"></i></span>
            <el-form label-width="80px" class="demo-ruleForm">
                <el-form-item label="公告标题">
                    <el-input v-model="now_notice.title" type="text" auto-complete="off" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="公告内容">
                    <el-input v-model="now_notice.content" type="textarea" :rows="6" auto-complete="off" :readonly="true"></el-input>
                </el-form-item>
            </el-form>
        </bounced>
        <bounced :visible="opratedialog">
            <p class="bounced_text">
                您确认要删除该公告？
            </p>
            <input type="hidden" name="" v-model="notice_id">
            <p slot="footer">
                <span class="bounced_button bounced_sure" @click="mend_chan">确认</span>
                <span class="bounced_button bounced_cancle" @click="opratedialog = false">取消</span>
            </p>
        </bounced>
    </div>
</template>
<script>
export default {
    name: 'notice',
    data() {
        return {
            loading: false, //load是否显示
            toastmsg: '', //toast提示文字
            visible_toast: false, //toast是否显示
            dialogslsm: false, //业务员信息弹框默认不显示 
            big_bounced: 'big_bounced', //注销弹框变大--样式 
            opratedialog: false, //删除弹框是否开启
            salesmen: [],
            slsm_url: location.protocol + '//' + location.host + '/qudao/v1/api/announcement/list', //获取列表 
            read_url: location.protocol + '//' + location.host + '/qudao/v1/api/announcement/', //发送已读 
            del_url: location.protocol + '//' + location.host + '/qudao/v1/api/announcement/', //修改公告状态--删除公告
            pages_all: 0, //总信息数
            page_per: 10, //每页信息数
            page_now: 1, //当前页数
            pages: 1, //总页数
            salesmen_mid: [], //搜索后的总信息
            salesmen_now: [], //当前展示信息
            now_notice: {
                "title": '',
                "content": '',
            }, //当前选择的功能
            notice_id: '', //当前要删除的公告id
            if_read:'',//当前要删除的公告是否已读，1为已读，0为未读
        }
    },
    created: function() {
        this.get_list(); //获取商户列表  
    },
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
        //获取业务员管理列表
        get_list: function() {
            let _this = this;
            let post_data = {
                'page': _this.page_now,
                'page_size': _this.page_per,
                'read':'',
            };
            this.$http.get(this.slsm_url, {
                    'params': post_data,
                    before: function() {
                        _this.loading = true;
                    }
                })
                .then(function(response) {
                    _this.loading = false;
                    let data_return = response.body;
                    if (data_return.respcd == '0000') {
                        _this.pages_all = data_return.data.total_cnt;
                        _this.salesmen_now = data_return.data.records;
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
            //列表测试数据--仅供测试
            //_this.getdata_test();
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
        //打开弹框
        open_dialog(row) {
            this.now_notice = {
                "title": row.title,
                "content": row.content,
            };
            this.dialogslsm = true;
            // if(!row.read){
            //     this.get_read(row);
            //     row.read=1;//设置为已读
            //     this.get_read_no();//获取未读总条数
            //     //测试数据设置
            //     // setTimeout(()=>{
            //     //     this.$store.commit('t_notice_read_no', this.$store.state.notice_read_no-1);
            //     // },1000);   
            // }
        },
        //发送查看请求--取消已读未读
        get_read(obj) {
            let _this = this;
            let id=obj.announce_id;
            this.$http.post(this.read_url + id + '/read', {
                    before: function() {
                        _this.loading = true;
                    }
                })
                .then(function(response) {
                    _this.loading = false;
                    let data_return = response.body;
                    if (data_return.respcd == '0000') {        
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
        //发送未读信息数目--取消已读未读
        get_read_no() {
            let _this = this;
            let post_data = {
                'page': 0,
                'page_size': 20,
                'read':0,
            };
            this.$http.get(this.slsm_url, {
                    'params': post_data,
                    before: function() {
                        _this.loading = true;
                    }
                })
                .then(function(response) {
                    _this.loading = false;
                    let data_return = response.body;
                    if (data_return.respcd == '0000') {
                        _this.$store.commit('t_notice_read_no', data_return.data.total_cnt);//重新设置未读信息数目
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
        //开启删除弹框
        open_chan: function(val) {
            this.notice_id = val.announce_id;
            this.if_read = val.read;
            this.opratedialog = true;
        },
        //确认删除操作事件
        mend_chan: function() {
            let _this = this;
            _this.opratedialog = false; //关闭弹框
            let post_data = {
                'status': 1,
            };
            this.$http.post(this.del_url + this.notice_id + '/status', post_data, {
                    before: function() {
                        _this.loading = true;
                    }
                })
                .then(function(response) {
                    _this.loading = false;
                    let data_return = response.body;
                    if (data_return.respcd == '0000') {
                        _this.get_list();
                        // if(!_this.if_read){
                        //     _this.get_read_no();//获取未读总条数
                        // }                        
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
        //列表测试数据--仅供测试
        getdata_test() {
            let _this = this;
            _this.salesmen = [{
                "title": "公告标题公告标题公告标题1",
                "content": "公告正文公告正文公告正文公告正文公告正文1",
                "create_time": "2017-05-01 00:00:00",
                "istop": 1, // 是否置顶
                "announce_id": 123456, // 公告 id
                "read": 0,  // 是否已读,1 为已读, 0 为未读
            }, {
                "title": "公告标题公告标题公告标题2",
                "content": "公告正文公告正文公告正文公告正文公告正文2",
                "create_time": "2017-05-01 00:00:00",
                "istop": 1, // 是否置顶
                "announce_id": 33344555, // 公告 id
                "read": 1,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题3",
                "content": "公告正文公告正文公告正文公告正文公告正文3",
                "create_time": "2017-05-01 00:00:00",
                "istop": 0, // 是否置顶
                "announce_id": 6666666, // 公告 id
                "read": 0,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题4",
                "content": "公告正文公告正文公告正文公告正文公告正文4",
                "create_time": "2017-05-01 00:00:00",
                "istop": 1, // 是否置顶
                "announce_id": 8888888, // 公告 id
                "read": 1,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题5",
                "content": "公告正文公告正文公告正文公告正文公告正文5",
                "create_time": "2017-05-01 00:00:00",
                "istop": 0, // 是否置顶
                "announce_id": 123456, // 公告 id
                "read": 0,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题6",
                "content": "公告正文公告正文公告正文公告正文公告正文6",
                "create_time": "2017-05-01 00:00:00",
                "istop": 1, // 是否置顶
                "announce_id": 123456, // 公告 id
                "read": 1,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题7",
                "content": "公告正文公告正文公告正文公告正文公告正文7",
                "create_time": "2017-05-01 00:00:00",
                "istop": 1, // 是否置顶
                "announce_id": 123456, // 公告 id
                "read": 0,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题8",
                "content": "公告正文公告正文公告正文公告正文公告正文8",
                "create_time": "2017-05-01 00:00:00",
                "istop": 0, // 是否置顶
                "announce_id": 123456, // 公告 id
                "read": 0,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题9",
                "content": "公告正文公告正文公告正文公告正文公告正文9",
                "create_time": "2017-05-01 00:00:00",
                "istop": 1, // 是否置顶
                "announce_id": 123456, // 公告 id
                "read": 0,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题10",
                "content": "公告正文公告正文公告正文公告正文公告正文10",
                "create_time": "2017-05-01 00:00:00",
                "istop": 0, // 是否置顶
                "announce_id": 7777790, // 公告 id
                "read": 0,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题11",
                "content": "公告正文公告正文公告正文公告正文公告正文11",
                "create_time": "2017-05-01 00:00:00",
                "istop": 1, // 是否置顶
                "announce_id": 123456, // 公告 id
                "read": 0,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题",
                "content": "公告正文公告正文公告正文公告正文公告正文",
                "create_time": "2017-05-01 00:00:00",
                "istop": 1, // 是否置顶
                "announce_id": 123456, // 公告 id
                "read": 0,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题",
                "content": "公告正文公告正文公告正文公告正文公告正文",
                "create_time": "2017-05-01 00:00:00",
                "istop": 0, // 是否置顶
                "announce_id": 123456, // 公告 id
                "read": 0,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题",
                "content": "公告正文公告正文公告正文公告正文公告正文",
                "create_time": "2017-05-01 00:00:00",
                "istop": 1, // 是否置顶
                "announce_id": 12322, // 公告 id
                "read": 1,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题",
                "content": "公告正文公告正文公告正文公告正文公告正文",
                "create_time": "2017-05-01 00:00:00",
                "istop": 0, // 是否置顶
                "announce_id": 123236, // 公告 id
                "read": 0,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题",
                "content": "公告正文公告正文公告正文公告正文公告正文",
                "create_time": "2017-05-01 00:00:00",
                "istop": 1, // 是否置顶
                "announce_id": 44456, // 公告 id
                "read": 1,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题",
                "content": "公告正文公告正文公告正文公告正文公告正文",
                "create_time": "2017-05-01 00:00:00",
                "istop": 1, // 是否置顶
                "announce_id": 5555456, // 公告 id
                "read": 0,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题",
                "content": "公告正文公告正文公告正文公告正文公告正文",
                "create_time": "2017-05-01 00:00:00",
                "istop": 0, // 是否置顶
                "announce_id": 666656, // 公告 id
                "read": 0,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题",
                "content": "公告正文公告正文公告正文公告正文公告正文",
                "create_time": "2017-05-01 00:00:00",
                "istop": 1, // 是否置顶
                "announce_id": 88856, // 公告 id
                "read": 1,  // 是否已读
            }, {
                "title": "公告标题公告标题公告标题",
                "content": "公告正文公告正文公告正文公告正文公告正文",
                "create_time": "2017-05-01 00:00:00",
                "istop": 0, // 是否置顶
                "announce_id": 77756, // 公告 id
                "read": 0,  // 是否已读
            }];
            _this.salesmen_mid = _this.salesmen;
            _this.pages_all = _this.salesmen_mid.length;
            _this.salesmen_now = _this.salesmen_mid.slice((_this.page_now - 1) * _this.page_per, _this.page_now * _this.page_per);
        },
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
.top_span {
    display: inline-block;
    width: 40px;
}
</style>
