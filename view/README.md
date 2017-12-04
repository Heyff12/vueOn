# manage

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 模拟数据--  
1、mock文件夹内为模拟的请求数据，其中page_app.js是页面通用的数据请求，基本信息和最新信息弹框内容；    
2、新建模拟数据——在mock文件新建一个js文件，命名mock_+'模块名'，模块名保持与pages文件夹下面的栏目文件名一致  
3、引入新建的mock_*.js,在page_app.js中添加代码require('./mock_*');  
4、模拟数据的写法参考https://github.com/nuysoft/Mock/wiki/Getting-Started  

# 新建栏目，例子——栏目名称test--  
1、构建文件夹———— 在pages文件夹下面新建一个文件夹——test  
2、在文件夹下面新建页面——index.vue，在该文件的js中定义文件组建名称——name: 'test',  
3、构建路由———— 在route文件夹下面的index.js中，添加如下代码  
``` bash
# 引入页面  
import test from '../pages/test'  
# 添加路径  
{ path: '/test', name: 'test', component: test },   
```
4、在导航栏加入该栏目——在app.vue相应位置添加  

# 公共组建--  
1、components文件夹下面的index.js文件是公用组建  
 ``` bash
# load--loading加载图标；在.vue文件中的引入和使用   
<load :visible="loading"></load> 
data(){
	retrun{
		loading: false, //load是否显示，默认不显示  
	}
} 

# toast--提示信息，3s后自动隐藏；在.vue文件中的引入  
<toast :msg="toastmsg" :visible="visible_toast" @on-visible-change="onVisibleChange" @on-msg-change="onMsgChange"></toast> 
data(){
	retrun{
		toastmsg: '', //toast提示文字
      	visible_toast: false, //toast是否显示 ，默认不显示 
	}
} 
methods:{
	//监听toast是否可见的值得变化
    onVisibleChange(val) {
      this.visible_toast = val; //④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
    },
    //监听toast内容的值得变化
    onMsgChange(val) {
      this.toastmsg = val; //④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
    },
}

# bounced--弹框样式；在.vue文件中的引入  
<bounced :visible="dialogslsm" :newclass="big_bounced">
      <span slot="header">'自定义，用来放置弹框名字，可以不要，后面i是关闭弹框按钮'<i class="close"  @click="dialogslsm = false"></i></span>
      <div>
      	/*自定义内容*/
      </div>
      <p slot="footer">
          /*自定义内容，用来放置弹框按钮，可以不要*/
      </p>
</bounced>
data(){
	retrun{
		dialogslsm: false, //弹框默认不显示
      	big_bounced: 'big_bounced', //自定义弹框样式，该属性是 类名，big_bounced代表弹框样式显示较大 
	}
} 
```
2、filter文件夹下面的index.js文件是公用过滤组建  
3、method文件夹下面的*.js文件是公用函数方法  
   ajax_log.js定义了通用的ajax请求的方法；
   yanzheng.js 通用的验证方法    



# 多语言，duoyuw文件夹---  
1、新建语言，比如日语，新建ja.js,内容格式  
``` bash
import jaLocale from 'element-ui/lib/locale/lang/ja'//引入elementUI中的自定义的多语言文档，该文档涵盖日期插件、表格插件、下拉菜单插件的多语言显示
export default {
  //自定义需要的文案
  ...jaLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)//使用elementUI的内容
}   
``` 
2、在index.js中引入  
``` bash
import ja from './ja'
export default {
 	...
  ja: ja
}   
``` 
3、在.vue文件的使用  
``` bash
#  文件替换    
{{$t('...')}} 
#  js代码中文件替换   
this.$t('...')  
``` 


# 多语言，原理--- 
1、涉及页面--main.js（初始化语言）    app.vue（语言切换）   login/index.vue（语言切换）   
2、主要以localstorage.lang为主；cookie.lang用于跟后台数据交互的语言传输   
3、币种唯一，跟当前语言环境无关；币种根据首页的info请求确定，同时保存store.state.currency    
4、切换语言后的弊端：a 不会重新向后台发起请求--（后台翻译的列表文案等不会及时变化）  
                   b 表单验证的错误提示信息不会发生变化  
                   c 图标的轴信息不会发生变化   



# 多语言，隐藏栏目--- 
需要的导航
1. 昨日数据 （全部）
2. 商户管理   不用下载  不用修改
3. 业务员管理  不用下载
4. 交易管理

不需要
渠道管理
统计报表
结算管理
公告管理
培训资料



标了不用下载的表，隐藏下载按钮






