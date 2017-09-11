<template>
  <div>
    <div class="right_head">
      培训资料
    </div>
    <div class="right_body">
      <el-form label-width="110px" class="demo-ruleForm" :model="searchkey" :rules="searchkey_rule" ref="searchkey">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="文件名：" prop="name">
              <el-input v-model.trim="searchkey.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label-width="0" class="t_c">
              <el-button type="primary" @click="search_sub">查询</el-button>
              <!-- <el-button type="default" @click="publicDialog=true">上传文档</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template>
        <el-table :data="material_now" border stripe style="width: 100%">
          <el-table-column prop="name" label="文件名称" resizable min-width="120px">
          </el-table-column>
          <el-table-column prop="create_time" label="上传时间" resizable min-width="170px">
          </el-table-column>
          <el-table-column label="操作" resizable min-width="100px">
            <template scope="scope">
              <el-button type="info" @click="scanDetail(scope.row)">详情</el-button>
              <!-- <el-button type="warning" @click="delMaterial(scope.row)">删除</el-button> -->
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
    <bounced :visible="opratedialog">
      <p class="bounced_text">
        您确认要<span v-if="if_del">删除</span><span v-else>发布</span>该培训资料？
      </p>
      <p slot="footer">
        <span class="bounced_button bounced_sure" @click="mend_chan">确认</span>
        <span class="bounced_button bounced_cancle" @click="opratedialog = false">取消</span>
      </p>
    </bounced>
    <bounced :visible="publicDialog" :newclass="large_bounced">
      <span slot="header">上传文档<i class="close"  @click="publicDialog = false"></i></span>
      <el-form label-width="110px" class="demo-ruleForm form_width" ref="new_material" :model="new_material" :rules="material_rule">
        <el-form-item label="文件名称" prop="name">
          <el-input v-model="new_material.name" type="text" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-input v-model="new_material.link" type="text" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="文档说明" prop="memo">
          <el-input v-model="new_material.memo" type="textarea" :rows="6" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('new_material')">确认</el-button>
          <el-button @click="resetForm('new_material')">重置</el-button>
        </el-form-item>
      </el-form>
    </bounced>
    <bounced :visible="detaiDialog" :newclass="large_bounced">
      <span slot="header">文档详情<i class="close"  @click="detaiDialog = false"></i></span>
      <el-form label-width="110px" class="demo-ruleForm form_width" ref="scan_material" :model="scan_material">
        <el-form-item label="文件名称">{{scan_material.name}}
        </el-form-item>
        <el-form-item label="链接"><a :href="scan_material.link" target="_blank">{{scan_material.link}}</a>
        </el-form-item>
        <el-form-item label="文档说明">
          <el-input v-model="scan_material.memo" type="textarea" :rows="6" auto-complete="off"  :readonly="true"></el-input>
        </el-form-item>
      </el-form>
    </bounced>
  </div>
</template>
<script>
import yanzheng from '../../method/yanzheng'
export default {
  name: 'material',
  data() {
    return {
      loading: false, //load是否显示
      toastmsg: '', //toast提示文字
      visible_toast: false, //toast是否显示
      opratedialog: false, //增加弹框是否开启
      publicDialog: false, //发布弹框是否开启
      detaiDialog: false, //文档详情
      large_bounced: 'large_bounced', //大弹框样式
      searchkey: {
        name: '',
      },
      searchkey_rule: {
        name: yanzheng.test_any('文件名',1,30,false,'blur'),
      },
      material_now: [], //当前展示信息
      pages_all: 0, //总信息数
      page_per: 20, //每页信息数
      page_now: 1, //当前页数
      pages: 1, //总页数
      oprate_data: {}, //当前详情内容
      del_id: '', //当前要删除的id
      if_del: false, //是删除  还是  发布 的确认弹框
      list_url: location.protocol + '//' + location.host + '/qudao/v1/api/training_file/list', //获取列表  
      material_url: location.protocol + '//' + location.host + '/qudao/v1/api/announcement/create', //增加资料 --暂无该功能
      materialDel_url: location.protocol + '//' + location.host + '/qudao/v1/api/announcement/create', //增加资料 --暂无该功能
      new_material: {
        "name": '',
        "memo": '',
        "link": '',
      }, //待发布的信息
      scan_material: {
        "name": '',
        "memo": '',
        "link": '',
      }, //当前查看的详情内容
      material_rule: {
        name: yanzheng.test_any('文件名称',1,30,true,'blur'),
        memo: yanzheng.test_any('文档说明',1,500,true,'blur'),
        link: [{
          required: true,
          //pattern: /^http(s)?:\/\//,
          message: '输入正确的链接',
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
    handleSizeChange(val) {
      let _this = this;
      //console.log(`每页 ${val} 条`);
      _this.page_per = val;
      _this.page_now = 1;
      this.get_list();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      let _this = this;
      _this.page_now = val;
      this.get_list();
    },
    //获取商户列表
    get_list: function() {
      let _this = this;
      let post_data = {
        'page': _this.page_now,
        'page_size': _this.page_per,
        'name': _this.searchkey.name.replace(/\s/g, ''),
      };
      this.$http.get(this.list_url, {
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
            _this.material_now = data_return.data.records;
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
    //提交查询
    search_sub: function() {
      this.$refs.searchkey.validate((valid) => {
        if (valid) {
          this.get_list();
        } else {
          return false;
        }
      });
    },
    //查看详情
    scanDetail: function(val) {
      this.scan_material = val;
      this.detaiDialog = true;
    },
    //删除 --暂无该功能
    delMaterial: function(val) {
      this.del_id = val.id;
      this.if_del = true;
      this.opratedialog = true;
    },
    //二次确认--发表于 --暂无该功能
    mend_chan() {
      this.opratedialog = false; //关闭确认弹框
      if (this.if_del) {
        this.sureDel_ajax();
      } else {
        this.sure_ajax();
      }
    },
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.if_del = false;
          this.publicDialog = false; //关闭发布弹框
          this.opratedialog = true; //出现确认弹框
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //发布 --暂无该功能
    sure_ajax: function() {
      let _this = this;
      this.$http.post(this.material_url, _this.new_material, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(function(response) {
          _this.loading = false;
          let data_return = response.body;
          if (data_return.respcd == '0000') {
            _this.visible_toast = true;
            _this.toastmsg = '新增培训资料成功!';
            _this.$refs.new_material.resetFields(); //重置输入框
            _this.get_list();//更新列表数据
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
    //删除 --暂无该功能
    sureDel_ajax: function() {
      let _this = this;
      this.$http.post(this.materialDel_url, _this.new_material, {
          before: function() {
            _this.loading = true;
          }
        })
        .then(function(response) {
          _this.loading = false;
          let data_return = response.body;
          if (data_return.respcd == '0000') {
            _this.visible_toast = true;
            _this.toastmsg = '删除成功!';
            _this.get_list();//更新列表数据
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
