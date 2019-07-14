var path =require('path')

//在内存中，根据指定的模板页面，生成一份内存中的首页并自动把打包好的bundle注入到页面底部
//如果要配置插件，需要在导出的对象中挂载一个plugins节点
var htmlwebpackPlugins = require('html-webpack-plugin')

module.exports={
    entry:path.join(__dirname,'./src/main.js'),//入口文件
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js',//指定输出文件名称
    },
    plugins: [//所有的webpack插件的配置节点
        new htmlwebpackPlugins({
            template:path.join(__dirname,'./src/index.html'),//指定模板文件的路径
            filename:'index.html',//设置生成的内存文件的名称
        }),
      ],
      module:{
          rules:[
              {test:/\.css$/,use:['style-loader','css-loader']},//处理css文件的loader
              {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
              //处理图片路径的url
              {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=7631&name=[hash:8]-[name].[ext]'},//file-loader是url-loader的内部依赖，不需要引入
              //limit给定的值是图片大小，单位是byte，如果我们引用的图片，大于或者等于给定的limit值，则不会被转为base64格式的字符串
              //如果图片的大小小于给定的limit值，则会被转为base64的字符串
              {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},//处理字体文件的loader
              {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},//配置babel-loader来转换ES6或者ES7语法
              {test:/\.vue$/,use:'vue-loader'},
          ]
      },
      resolve:{
          alias:{//修改vue被导入时包的路径---方式2
            //   "vue$":'vue/dist/vue.js'
          }
      }
}
