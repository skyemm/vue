#项目说明

##[开源协议之间的区别](https://blog.csdn.net/xiaodaima2016/article/details/83645854)

##修改了一下下
##加一行
##制作首页app组件
1.完成Header区域，使用的是Mint-UI中的Header组件
2.制作底部Tabbar区域使用的是MUI的Tabbar.html
+在制作购物车小图标时，操作相对会多一点
+先把扩展图标的css样式，拷贝到项目中
+拷贝扩展字体库的ttf文件到项目中
+为购物车小图标添加如下样式"mui-icon mui-icon-extra mui-icon-extra-cart"
3.要在中间区域放置一个router-view来展示路由匹配到的组件

#该着tabbr为router-link

##设置路由高亮

##点击tabbar中的路由连接，展示对应的路由组件

##制作首页轮播图数据
1.获取数据，如何获取数据，使用vue-resource  cnpm i vue-resource -S
2.使用vue-resource的this.$http.get获取数据
3.获取到的数据，要保存到data身上
4.使用v-for进行循环播放数据
