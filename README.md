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

##改造九宫格区域样式

##改造新闻资讯路由链接

##新闻资讯页面制作
1.绘制界面  media-list.html
2.使用vue-resource获取数据
3.渲染真实数据

##实现新闻内容跳转
1.把列表中的每一项改造为一个router-link，同时在跳转的时候提供一个唯一的id标识符
2.创建新闻详情的组件页面newsInfo.vue
3.在路由模块，将新闻详情的路由地址和组件页面对应起来

##实现新闻详情的 页面布局 和 数据渲染

##单独封装一个comment评论组件
1.先创建一个comment子组件
2.在需要的页面导入comment组件
import comment from '../'
3.在父组件中使用components属性，将comment组件注册为自己的子组件
4.将注册子组件的时候的注册名  以标签的形式，在页面中引用即可

##获取所有的评论数据，加载到页面中

##实现点击加载更多评论
1.为加载更多按钮，绑定点击事件，再事件中请求下一页数据
2.点击加载更多，pageIndex++,然后重新调用this.getcomment()方法重新获取最新一页的数据

##发表评论
1.把文本框做双向数据绑定
2.为发表按钮绑定一个事件
3.校验评论内容是否为空，如果为空，则提示内容不能为空
4.通过通过vue-resource发送一个请求，把评论内容提交给用户
5.刷新页面，已查看最新评论
