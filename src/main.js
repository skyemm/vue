//入口文件
import Vue from 'vue'
import app from './app.vue'

//导入路由
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
    //导入router.js组件
import router from './router.js'

//导入vue-resource
import VueResource from 'vue-resource'
//安装vue-resource
Vue.use(VueResource)
    //设置根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
    //全局设置post时候表单数据格式
Vue.http.options.emulateJSON = true;

//按需导入
// import { Header , Swipe, SwipeItem,Button,Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload)

import MintUI from "mint-ui"
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入图片样式
import './css/info-img.scss'

//全局过滤器，全局都可以用
Vue.filter("dataFormat", function(datestr, pattern) {
    var dt = new Date(datestr);

    var y = dt.getFullYear();
    var m = (dt.getMonth() + 1).toString().padStart(2, "0");
    /*ES6中的自动填充padStart(),第一个参数是最大长度,第二个参数的填充值*/
    var d = dt.getDate();

    /*				return `${y}-${m}-${d}`;*/
    /*				return y+'-'+m+'-'+d*/
    if (pattern.toLowerCase() === 'yyyy-mm-dd') {
        return y + '-' + m + '-' + d;
    } else {
        var h = dt.getHours();
        var mm = dt.getMinutes();
        var s = dt.getSeconds();
        return `${y}-${m}-${d} ${h}:${mm}:${s}`;
    }
})
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router: router
})