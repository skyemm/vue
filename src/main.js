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

import { Header , Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
var vm =new Vue({
    el:'#app',
    render:c=>c(app),
    router:router
})