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

//导入vuex
import Vuex from 'vuex'
//安装vuex
Vue.use(Vuex)

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
    //定义vuex实例
    //每次进入软件。肯定会调用main.js在调用的时候，先从本地存储中把购物车的数据读出来放到store中
    //var shopCar = JSON.parse(localStorage.getItem('car' || '[]'))
var shopCar = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
    state: {
        //shopcount: 0,
        shopCar: shopCar //将购物车中的商品数据，存储到一个数组中，一个商品对应一个对象
            //{id:null,count:null,price:null,flag:false}
    },
    mutations: {
        // setShopCount(state, newCount) {
        //     state.shopcount += newCount;
        //     // console.log(state.shopcount);
        // },

        //some()是对数组中每一项运行给定函数，如果该函数对任一项返回true，则返回true。
        //every()是对数组中每一项运行给定函数，如果该函数对每一项返回true,则返回true.
        addToCar(state, obj) {
            var flag = false;
            //判断现存的数组中是否存在该商品
            state.shopCar.some(item => {
                if (item.id == obj.id) {
                    item.count += parseInt(obj.count)
                    flag = true
                    return true
                }
            })
            if (flag == false) {
                state.shopCar.push(obj)
            }
            //更新car之后将数据更新到本地存储
            localStorage.setItem('car', JSON.stringify(state.shopCar))
        },
        //增加商品数量
        // addcount(state, id) {
        //     state.shopCar.forEach(el => {
        //             if (el.id === id) {
        //                 el.id += 1
        //             }
        //         })
        //         //更新car之后将数据更新到本地存储
        //     localStorage.setItem('car', JSON.stringify(state.shopCar))
        // },
        //增加商品数量
        // downcount(state, id) {
        //     state.shopCar.forEach(el => {
        //             if (el.id === id) {
        //                 el.id -= 1
        //             }
        //         })
        //         //更新car之后将数据更新到本地存储
        //     localStorage.setItem('car', JSON.stringify(state.shopCar))
        // },

        //设置商品数量
        setcount(state, arr) {
            state.shopCar.forEach(el => {
                    if (parseInt(el.id) === arr.id) {
                        el.count = arr.count
                    }
                })
                //更新car之后将数据更新到本地存储
            localStorage.setItem('car', JSON.stringify(state.shopCar))
        },
        //根据id获取id对应商品的数量
        // getcount(state, id) {
        //     // console.log("getcount" + id)
        //     // var count = null
        //     state.shopCar.forEach(el => {
        //         if (parseInt(el.id) === id) {
        //             console.log("get" + el.count)
        //             return el.count;
        //         }
        //     })
        // }
        //绑定选择按钮，改变flag值
        changeflag(state, id) {
            var flag = false
            state.shopCar.some(el => {
                    if (parseInt(el.id) === id) {
                        el.flag = !el.flag
                        flag = el.flag
                    }
                })
                //更新car之后将数据更新到本地存储
            localStorage.setItem('car', JSON.stringify(state.shopCar))
            return flag
        },
        //删除操作
        deletecar(state, id) {
            // 根据Id，从store 中的购物车中删除对应的那条商品数据
            state.shopCar.some((item, i) => {
                    if (item.id == id) {
                        state.shopCar.splice(i, 1)
                        return true;
                    }
                })
                // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.shopCar))
        }
    },
    getters: {
        //相对于计算属性，也相对于filters
        getAllCount(state) {
            var c = 0
            state.shopCar.forEach(el => {
                c += el.count;
            })
            return c
        },
        // find() 方法为数组中的每个元素都调用一次函数执行：
        //当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
        //如果没有符合条件的元素返回 undefined
        //注意: find() 对于空数组，函数是不会执行的。
        //注意: find() 并没有改变数组的原始值。

        //根据id获取id对应商品的数量
        getcount: (state) => (id) => {
            var count = null
            state.shopCar.some(el => {
                if (parseInt(el.id) === id) {
                    // console.log("get" + el.count)
                    count = el.count
                    return true;
                }
            })
            return count
        },
        //绑定选择按钮，获取flag值
        getflag: (state) => (id) => {
            var f = null
            state.shopCar.some(el => {
                if (parseInt(el.id) == id) {
                    f = el.flag
                    return true;
                }
            })
            return f
        },
        getselectCount(state) {
            var count = 0
            state.shopCar.forEach(el => {
                if (el.flag === true) {
                    count += el.count
                }
            })
            return count
        },
        getselectPrice(state) {
            var price = 0
            state.shopCar.forEach(el => {
                if (el.flag === true) {
                    price += (el.price * el.count)
                }
            })
            return price
        }
    }
})
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router: router,
    store: store
})