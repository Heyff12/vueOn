import Vue from 'vue'
import VueResource from 'vue-resource' //ajax请求数据
Vue.use(VueResource)
//ajax-请求--resource---get
//that--运行函数的this；url--请求连接；data--传递的数据；success_func--请求成功后的事件；error_func--请求失败后的事件；all_func--不需要请求处理的事件
let ajaxLog_get = (that, url, data, success_func, error_func, common_func, all_func) => {
  let _this = that;
  //console.log('get');
  _this.$http.get(url, {
      'params': data,
      before: function() {
        _this.loading = true;
      }
    })
    .then(function(response) {
      //console.log('get2');
      _this.loading = false;
      if (all_func) {
        all_func(data);
        return false;
      }
      let data_return = response.body;
      //console.log(data_return);
      if (data_return.respcd == '0000') {
        try {
          if (success_func) {
            success_func(data_return);
          }
        } catch (e) {
          console.error(e);
          _this.$Raven.captureException(e, {
            level: 'error', // one of 'info', 'warning', or 'error'
            logger: 'ajaxGet_function',
            tags: { git_commit: 'ajaxGet_function' }
          });
        }
      } else {
        if (data_return.respmsg) {
          _this.toastmsg = data_return.respmsg;
        } else {
          _this.toastmsg = data_return.resperr;
        }
        _this.visible_toast = true;
        if (error_func) {
          error_func(data_return);
        }
      }
    }, function(response) {
      if (common_func) {
        common_func();
      }
      _this.loading = false;
      _this.visible_toast = true;
      _this.toastmsg = _this.$t('app.timeout');
    })
    .catch(function(response) {
      if (common_func) {
        common_func();
      }
      _this.loading = false;
    });
}
let ajax_get = (that, url, data, success_func, error_func, common_func, all_func) => {
  let _this = that;
  //console.log('get');
  _this.$http.get(url, {
      'params': data,
      before: function() {
        _this.loading = true;
      }
    })
    .then(function(response) {
      //console.log('get2');
      _this.loading = false;
      if (all_func) {
        all_func(data);
        return false;
      }
      let data_return = response.body;
      //console.log(data_return);
      if (data_return.respcd == '0000') {
        if (success_func) {
          success_func(data_return);
        }
      } else {
        if (data_return.respmsg) {
          _this.toastmsg = data_return.respmsg;
        } else {
          _this.toastmsg = data_return.resperr;
        }
        _this.visible_toast = true;
        if (error_func) {
          error_func(data_return);
        }
      }
    }, function(response) {
      if (common_func) {
        common_func();
      }
      _this.loading = false;
      _this.visible_toast = true;
      _this.toastmsg = _this.$t('app.timeout');
    })
    .catch(function(response) {
      if (common_func) {
        common_func();
      }
      _this.loading = false;
    });
}
//ajax-请求--resource---post
let ajaxLog_post = (that, url, data, success_func, error_func, common_func, all_func) => {
  let _this = that;
  //console.log('get');
  _this.$http.post(url, data, {
      before: function() {
        _this.loading = true;
      }
    })
    .then(function(response) {
      //console.log('get2');
      _this.loading = false;
      if (all_func) {
        all_func(data);
        return false;
      }
      let data_return = response.body;
      //console.log(data_return);
      if (data_return.respcd == '0000') {
        try {
          if (success_func) {
            success_func(data_return);
          }
        } catch (e) {
          console.error(e);
          _this.$Raven.captureException(e, {
            level: 'error', // one of 'info', 'warning', or 'error'
            logger: 'ajaxPost_function',
            tags: { git_commit: 'ajaxPost_function' }
          });
        }
      } else {
        if (data_return.respmsg) {
          _this.toastmsg = data_return.respmsg;
        } else {
          _this.toastmsg = data_return.resperr;
        }
        _this.visible_toast = true;
        if (error_func) {
          error_func(data_return);
        }
      }
    }, function(response) {
      if (common_func) {
        common_func();
      }
      _this.loading = false;
      _this.visible_toast = true;
      _this.toastmsg = _this.$t('app.timeout');
    })
    .catch(function(response) {
      if (common_func) {
        common_func();
      }
      _this.loading = false;
    });
}
let ajax_post = (that, url, data, success_func, error_func, common_func, all_func) => {
  let _this = that;
  //console.log('get');
  _this.$http.post(url, data, {
      before: function() {
        _this.loading = true;
      }
    })
    .then(function(response) {
      //console.log('get2');
      _this.loading = false;
      if (all_func) {
        all_func(data);
        return false;
      }
      let data_return = response.body;
      //console.log(data_return);
      if (data_return.respcd == '0000') {
        if (success_func) {
          success_func(data_return);
        }
      } else {
        if (data_return.respmsg) {
          _this.toastmsg = data_return.respmsg;
        } else {
          _this.toastmsg = data_return.resperr;
        }
        _this.visible_toast = true;
        if (error_func) {
          error_func(data_return);
        }
      }
    }, function(response) {
      if (common_func) {
        common_func();
      }
      _this.loading = false;
      _this.visible_toast = true;
      _this.toastmsg = _this.$t('app.timeout');
    })
    .catch(function(response) {
      if (common_func) {
        common_func();
      }
      _this.loading = false;
    });
}
//function进行log监控
let funcLog = (func, val) => {
  try {
    if (val) {
      func(val);
    } else {
      func();
    }
  } catch (e) {
    Raven.captureBreadcrumb({
      message: '获取方法或者参数错误',
      category: 'function',
    });
    Raven.captureException(e, {
      level: 'error', // one of 'info', 'warning', or 'error'
      logger: 'function',
      tags: { git_commit: 'function' }
    });
  }
}

exports.ajaxLog_get = ajaxLog_get
exports.ajaxLog_post = ajaxLog_post
exports.ajax_get = ajax_get
exports.ajax_post = ajax_post
exports.funcLog = funcLog


//测试---------------------------------------------------

//获取渠道信息列表
// get_list: function() {
//   let _this = this;
//   let post_data = {
//     'page': this.page_now,
//     'page_size': this.page_per,
//     'userid': this.searchkey.id.replace(/\s/g, ''),
//     'name': this.searchkey.name.replace(/\s/g, ''),
//     'status': this.searchkey.status,
//   };
//   this.$ajax_log.ajaxLog_get(this, this.list_url, post_data, (data_return) => {
//     // this.pages_all = data_return.data.qd_cnt;
//     // this.channels_now = data_return.data.qd_infos;
//     let new_arrry = [];
//     data_return.data.qd_infos.forEach(function(item) {
//       if (item.base.name.indexOf('s') != '-1') {
//         new_arrry.push(item);
//       }
//     });
//     this.pages_all = data_return.data.qd_cnt;
//     this.channels_now = new_arrry;
//   });
// },
