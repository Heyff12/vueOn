import Vue from 'vue'
//测试错误获取
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
Vue.prototype.$Raven = Raven; //设置全局变量
// Raven
//   .config('https://04744d00c5784cf99e46a8d4e6adac62@sentry.io/209739', {
//     // autoBreadcrumbs: {
//     //   'xhr': true, // XMLHttpRequest
//     //   'console': true, // console logging
//     //   'dom': true, // DOM interactions, i.e. clicks/typing
//     //   'location': true // url changes, including pushState/popState
//     // },
//     // debug: true,
//     // transport: function(options) {
//     //   // send data
//     //   console.log(options); //打印在控制台
//     // }
//   })
//   .addPlugin(RavenVue, Vue)
//   .install();
Raven
  .config('https://04744d00c5784cf99e46a8d4e6adac62@sentry.io/209739')
  .addPlugin(RavenVue, Vue)
  .install();
// window.onerror = function(msg, url, line, col, error) {
//   console.error(msg + '--' + url + '--' + line + '--' + col + '--' + error);
//   Raven.captureException(msg + '--' + url + '--' + line + '--' + col + '--' + error,{
//       level: 'info', // one of 'info', 'warning', or 'error'
//       logger: 'window',
//       tags: { git_commit: 'window' }
//     });
// }
window.onerror = function(msg, url, line, col, error) {
  //console.log(msg + '--' + url + '--' + line + '--' + col + '--' + error);
  //没有URL不上报！上报也不知道错误
  if (msg != "Script error." && !url) {
    return true;
  }
  //采用异步的方式
  //我遇到过在window.onunload进行ajax的堵塞上报
  //由于客户端强制关闭webview导致这次堵塞上报有Network Error
  //我猜测这里window.onerror的执行流在关闭前是必然执行的
  //而离开文章之后的上报对于业务来说是可丢失的
  //所以我把这里的执行流放到异步事件去执行
  //脚本的异常数降低了10倍
  setTimeout(function() {
    var data = {};
    //不一定所有浏览器都支持col参数
    col = col || (window.event && window.event.errorCharacter) || 0;

    data.url = url;
    data.line = line;
    data.col = col;
    if (!!error && !!error.stack) {
      //如果浏览器有堆栈信息
      //直接使用
      data.msg = error.stack.toString();
    } else if (!!arguments.callee) {
      //尝试通过callee拿堆栈信息
      var ext = [];
      var f = arguments.callee.caller,
        c = 3;
      //这里只拿三层堆栈信息
      while (f && (--c > 0)) {
        ext.push(f.toString());
        if (f === f.caller) {
          break; //如果有环
        }
        f = f.caller;
      }
      ext = ext.join(",");
      data.msg = ext;
    }
    console.log(data);
    Raven.captureException(data, {
      level: 'info', // one of 'info', 'warning', or 'error'
      logger: 'window',
      tags: { git_commit: 'window' }
    });
    //把data上报到后台！
  }, 0);
  return true;
}
//import RSVP from 'rsvp';//全局监控--无效
// RSVP.on('error', function(reason) {
//   console.log(false, reason);
// });//无效

//console.log(Raven.isSetup())//判断raven是否按照成功 true
// Raven.context(function() {
//     doSomething666(a[0])
// })//无效
// Raven.captureBreadcrumb({
//   message: 'Item added to shopping cart',
//   category: 'action',
//   data: {
//     isbn: '978-1617290541',
//     cartSize: '3'
//   }
// }); //设置面包屑错误显示--全局
//添加用户个人信息--全局
// Raven.setUserContext({
//     email: 'matt55@example.com',
//     id: '12356'
// })
// Raven.captureMessage('www.yaya12.com!')//发送消息--全局
// window.onunhandledrejection = function(evt) {
//     Raven.captureException(evt.reason);
// };
//测试例子------------------------------------------------------------------------------------------------

// function doSomething111666(val) {
//   let a = 222;
//   a = a + (val - 0);
//   //console.log(a);
// }

// function doSomethingArr(val) {
//   let a = val.toString().indexOf('/');
//   console.log(a);
// }

// function get_log(func, val) {
//   try {
//     if (val) {
//       func(val);
//     } else {
//       func();
//     }
//   } catch (e) {
//     Raven.captureBreadcrumb({
//       message: '获取方法或者参数错误',
//       category: 'function',
//       // data: {
//       //   isbn: 'function',
//       //   cartSize: '100'
//       // },      
//     });
//     Raven.captureException(e, {
//       level: 'warning', // one of 'info', 'warning', or 'error'
//       logger: 'function',
//       tags: { git_commit: 'function' }
//     });
//   }
//   //用以下方法会被 window.onerror捕获，导致内容不进行，并且浏览器无法查看报错信息
//   // if (val) {
//   //   func(val);
//   // } else {
//   //   func();
//   // }
// }
// get_log(doSomething111666, 7);
// get_log(doSomethingArr, null);
// try {
//   doSomething111666(a7);
//   //throw new Error('243325435')//无效
//   //Raven.captureMessage('ces  try!')//这try语句不执行
// } catch (e) {
//   // Raven.captureMessage('ces  try444!', {
//   //   level: 'warning', // one of 'info', 'warning', or 'error'
//   //   logger: 'my.module',
//   //   tags: { git_commit: '112233445566' }
//   // })
//   Raven.captureException(e)
//   //Raven.showReportDialog();//在web端弹出弹框
//   Raven.captureBreadcrumb({
//     message: 'Item added to shopping cart111',
//     category: 'action111',
//     data: {
//       isbn: '123456789',
//       cartSize: '31'
//     }
//   });
// }
// try {
//   doSomething777999(a[0])
// } catch (e) {
//   Raven.captureException(e)
//   Raven.captureBreadcrumb({
//     message: 'Item added to shopping cart9999',
//     category: 'action999',
//     data: {
//       isbn: '987654321',
//       cartSize: '39'
//     }
//   });
// }
// try {
//   doSomething_last(a[0])
// } catch (e) {
//   Raven.captureException(e)
//   Raven.captureBreadcrumb({
//     message: 'Item added to shopping doSomething_last',
//     category: 'doSomething_last',
//     data: {
//       isbn: 'doSomething_last',
//       cartSize: '39'
//     }
//   });
// }
////--------------------重要备注--------------------------------------------------------------------
//测试全局变量获取--设置异步执行，则可以在window.onerror时间获得监控
// let test_log = null;
// // test_log.indexOf('q');
// setTimeout(function() {
//   test_log.indexOf('q');
// }, 1000);
//ajax执行的函数window.onerror监控不到。 需要单独设置 try--catch,才能捕获-------------------------------------
// get_list: function() {
//   let _this = this;
//   let post_data = {
//     'page': _this.page_now,
//     'page_size': _this.page_per,
//     'userid': _this.searchkey.id.replace(/\s/g, ''),
//     'name': _this.searchkey.name.replace(/\s/g, ''),
//     'status': _this.searchkey.status,
//   };
//   this.$http.get(this.list_url, {
//       'params': post_data,
//       before: function() {
//         _this.loading = true;
//       }
//     })
//     .then(function(response) {
//       _this.loading = false;
//       let data_return = response.body;
//       if (data_return.respcd == '0000') {
//         // _this.channels = data_return.data;
//         // _this.channels_mid = _this.channels;
//         // _this.pages_all = _this.channels_mid.length;
//         // _this.channels_now = _this.channels_mid.slice((_this.page_now - 1) * _this.page_per, _this.page_now * _this.page_per);
//         //正式----
//         _this.pages_all = data_return.data.qd_cnt;
//         _this.channels_now = data_return.data.qd_infos;
//         //----测试log--监控--window.onerror监控不到
//           // let new_arrry=[];
//           // data_return.data.qd_infos.forEach(function(item){
//           //   console.log(item.base.name);
//           //   if(item.base.name.indexOf('s')!='-1'){
//           //     new_arrry.push(item);
//           //   }
//           // });
//           // _this.pages_all = data_return.data.qd_cnt;
//           // _this.channels_now = new_arrry;
//         //正常，可以监控到
//         // try{
//         //   let new_arrry=[];
//         //   data_return.data.qd_infos.forEach(function(item){
//         //     console.log(item.base.name);
//         //     if(item.base.name.indexOf('s')!='-1'){
//         //       new_arrry.push(item);
//         //     }
//         //   });
//         //   _this.pages_all = data_return.data.qd_cnt;
//         //   _this.channels_now = new_arrry;
//         // }catch(e){
//         //   _this.$Raven.captureException(e, {
//         //     level: 'error', // one of 'info', 'warning', or 'error'
//         //     logger: 'ajax_function',
//         //     tags: { git_commit: 'ajax_function' }
//         //   });
//         // }          
//       } else {
//         if (data_return.respmsg) {
//           _this.toastmsg = data_return.respmsg;
//         } else {
//           _this.toastmsg = data_return.resperr;
//         }
//         _this.visible_toast = true;
//       }
//     }, function(response) {
//       _this.loading = false;
//       _this.visible_toast = true;
//       _this.toastmsg = '网络超时!';
//     })
//     .catch(function(response) {
//       _this.loading = false;
//     });
//   //获取测试数据--本地
//   //_this.getdava_test();          
// },
//----测试log--监控--window.onerror监控不到
// let new_arrry=[];
// data_return.data.qd_infos.forEach(function(item){
//   console.log(item.base.name);
//   if(item.base.name.indexOf('s')!='-1'){
//     new_arrry.push(item);
//   }
// });
// _this.pages_all = data_return.data.qd_cnt;
// _this.channels_now = new_arrry;
//正常，可以监控到
// try{
//   let new_arrry=[];
//   data_return.data.qd_infos.forEach(function(item){
//     console.log(item.base.name);
//     if(item.base.name.indexOf('s')!='-1'){
//       new_arrry.push(item);
//     }
//   });
//   _this.pages_all = data_return.data.qd_cnt;
//   _this.channels_now = new_arrry;
// }catch(e){
//   _this.$Raven.captureException(e, {
//     level: 'error', // one of 'info', 'warning', or 'error'
//     logger: 'ajax_function',
//     tags: { git_commit: 'ajax_function' }
//   });
// }
