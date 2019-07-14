//1.导入vue-router 包
import VueRouter from 'vue-router'

import home from './components/tabbar/HomeContainer.vue'
import member from './components/tabbar/MemberContainer.vue'
import search from './components/tabbar/SearchContainer.vue'
import shopcar from './components/tabbar/ShopcarContainer.vue'


//3.创建一个路由对象
var router=new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
    {path:'/home',component:home},
    {path:'/search',component:search},
    {path:'/member',component:member},
    {path:'/shopcar',component:shopcar},
    ],
    linkActiveClass:'mui-active'//覆盖路由默认的高亮的类，默认的是router-link-active
})
//把路由对象暴露出去
export default router