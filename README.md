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

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast提示用户 评论内容不能为空
4. 通过 vue-resource 发送一个请求，把评论内容提交给 服务器
5. 当发表评论OK后，重新刷新列表，以查看最新的评论
 + 如果调用 getComments 方法重新刷新评论列表的话，可能只能得到 最后一页的评论，前几页的评论获取不到
 + 换一种思路： 当评论成功后，在客户端，手动拼接出一个 最新的评论对象，然后 调用 数组的 unshift 方法， 把最新的评论，追加到  data 中 comments 的开头；这样，就能 完美实现刷新评论列表的需求；

## 改造图片分析 按钮为 路由的链接并显示对应的组件页面

## 绘制 图片列表 组件页面结构并美化样式
 1. 制作 顶部的滑动条
 2. 制作 底部的图片列表
### 制作顶部滑动条的坑们：
 1. 需要借助于 MUI 中的 tab-top-webview-main.html 
 2. 需要把 slider 区域的 mui-fullscreen 类去掉
 3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下：
  + 导入 mui.js 
  + 调用官方提供的 方式 去初始化：
  ```
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  ```
 4. 我们在初始化 滑动条 的时候，导入的 mui.js ，但是，控制台报错： `Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`
  + 经过我们合理的推测，觉得，可能是 mui.js 中用到了 'caller', 'callee', and 'arguments' 东西，但是， webpack 打包好的 bundle.js 中，默认是启用严格模式的，所以，这两者冲突了；
  + 解决方案： 1. 把 mui.js 中的 非严格 模式的代码改掉；但是不现实； 2. 把 webpack 打包时候的严格模式禁用掉；
  + 最终，我们选择了 plan B  移除严格模式： 使用这个插件 babel-plugin-transform-remove-strict-mode
 5. 刚进入 图片分享页面的时候， 滑动条无法正常工作， 经过我们认真的分析，发现， 如果要初始化 滑动条，必须要等 DOM 元素加载完毕，所以，我们把 初始化 滑动条 的代码，搬到了 mounted 生命周期函数中；
 6. 当 滑动条 调试OK后，发现， tabbar 无法正常工作了，这时候，我们需要把 每个 tabbar 按钮的 样式中  `mui-tab-item` 重新改一下名字；
 7. 获取所有分类，并渲染 分类列表；

### 制作图片列表区域
1. 图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的 组件 `lazy-load`
2. 根据`lazy-load`的使用文档，尝试使用
3. 渲染图片列表数据

### 实现了 图片列表的 懒加载改造和 样式美化

## 实现了 点击图片 跳转到 图片详情页面
1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染为 哪种元素

## 实现 详情页面的布局和美化，同时获取数据渲染页面

## 实现 图片详情中 缩略图的功能
1. 使用 插件 vue-preview 这个缩略图插件
2. 获取到所有的图片列表，然后使用 v-for 指令渲染数据
3. 注意： img标签上的class不能去掉
4. 注意： 每个 图片数据对象中，必须有 w 和 h 属性