//1.导入vue-router 包
import VueRouter from 'vue-router'

import home from './components/tabbar/HomeContainer.vue'
import member from './components/tabbar/MemberContainer.vue'
import search from './components/tabbar/SearchContainer.vue'
import shopcar from './components/tabbar/ShopcarContainer.vue'
import newsList from './components/news/newsList.vue'
import newinfo from './components/news/NewsInfo.vue'
import photosList from './components/photos/photosList.vue'
import photosInfo from './components/photos/photosInfo.vue'
import shoppingList from './components/shopping/shoppingList.vue'
import shoppingInfo from './components/shopping/shoppingInfo.vue'
import shoppingDesc from './components/shopping/shoppingDesc.vue'
import shoppingcomments from './components/shopping/shoppingComment.vue'
// import carList from './components/cars/carsList.vue'


//3.创建一个路由对象
var router = new VueRouter({
        routes: [
            { path: '/', redirect: '/home' },
            { path: '/home', component: home },
            { path: '/search', component: search },
            { path: '/member', component: member },
            { path: '/shopcar', component: shopcar },
            { path: '/home/newsList', component: newsList },
            { path: '/home/newsinfo/:id', component: newinfo },
            { path: '/home/photosList', component: photosList },
            { path: '/home/photosInfo/:id', component: photosInfo },
            { path: '/home/shoppingList', component: shoppingList },
            { path: '/home/shoppingList/:id', component: shoppingInfo, name: "shoppingInfo" },
            { path: '/home/shoppingDesc/:id', component: shoppingDesc },
            { path: '/home/shoppingComment/:id', component: shoppingcomments },
            // { path: '/shopcar/carsList', component: carList },
        ],
        linkActiveClass: 'mui-active' //覆盖路由默认的高亮的类，默认的是router-link-active
    })
    //把路由对象暴露出去
export default router