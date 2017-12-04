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
import '../mock/page_app.js'

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
//增加cookie的语言设置
import cookie from './method/cookie' //cookie设置方法
//设置当前语言默认值--localStorage 
//初始语言根据浏览器语言获取，(根据全局变量 language，取消该变量)语言版本从localStorage.lang获取；
//货币符号从返回的信息获取并做了store全局变量--跟当前语言没有关系
//语言包的js的名字应该与浏览器语言的 language 一致
//设置cookie的lang值，用于跟后台传输当前语言类型
let langNow;
let language_lan = navigator.browserLanguage?navigator.browserLanguage:navigator.language; //获取浏览器语言
let language = language_lan.split('-')[0];
if(language!=='zh' && language!=='en' ){
  language='zh';
}
if (localStorage.lang && localStorage.lang!="undefined") {
  cookie.SetCookie('lang', localStorage.lang, 1);//初始化cookie的lang值
  langNow = localStorage.lang;
  store.commit('t_language',localStorage.lang);//初始化language全局变量
} else {
  localStorage.lang = language;//初始化storage
  cookie.SetCookie('lang', language, 1);//初始化cookie的lang值
  store.commit('t_language',language);//初始化language全局变量
  langNow = language;//初始化语言设置
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
