// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router' //路由

import routes from './route/' //路由参数
import store from './store/' //状态管理参数
import filter from './filter/' //过滤函数
import component from './components/' //全局组建

import VueResource from 'vue-resource' //ajax请求数据
//import 'element-theme-default'; //饿了吗主题样式
import '../theme/index.css'; //饿了吗主题样式--自定义样式#ff8100--橙色系  node_modules/.bin/et -i    node_modules/.bin/et
import ElementUI from 'element-ui' //饿了吗主题插件

//mock数据接口--本地使用---------------------------------------------------------------------------------------------
//import '../mock/page_app.js'

//测试前端报错监控---------------------------------------------------------------------------------------------
//import './monitor'
//ajax请求通用---------------------------------------------------------------------------------------------
import ajax_log from './method/ajax_log'
Vue.prototype.$ajax_log = ajax_log; //设置ajax请求全局变量


//测试多语言---------------------------------------------------------------------------------------------
import VueI18n from 'vue-i18n'
import ElementLocale from 'element-ui/lib/locale'
import messages from './duoyu/' //多语言文字
Vue.use(VueI18n);
//设置当前语言默认值--localStorage
let langNow;
if (localStorage.lang) {
  langNow = localStorage.lang;
} else {
  localStorage.lang = 'zh';
  langNow = 'zh';
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: langNow, // set locale
  messages, // set locale messages
});
ElementLocale.i18n((key, value) => i18n.t(key, value)); //为了实现element插件的多语言切换

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI);
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
});
//本地隐藏，编译访问所有页面
router.beforeEach(({ meta, path }, from, next) => {
    var { auth = true } = meta
    var isLogin = Boolean(store.state.sessionid) //true用户已登录， false用户未登录
        // console.log(auth);
        // console.log(store.state.sessionid);
        // console.log(isLogin);
    if (path == '/login') {
        store.commit('login_ify');
    } else {
        store.commit('login_ifn');
    }
    if (auth && !isLogin && path !== '/login') {
        store.commit('login_ify');
        return next({ path: '/login' })
    }
    next()
});
//Vue.http.options.emulateJSON = true;//调整contenttype值为application/x-www-form-urlencoded，其默认值是application/json
Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (response.body.respcd == 1001) {
      //store.commit('t_login_no', true);
      //window.location.href = location.protocol + '//' + location.host + '/qudao/v1/page/login.html';
      router.replace({
          path: '/login'
      });
      return false
    } else {
      return response
    }
  });
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store,
  i18n
})
