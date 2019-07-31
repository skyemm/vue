<template>
  <div class="shoppingInfo">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="flag" ref="ball"></div>
    </transition>
    <!-- 轮播图 -->
    <!-- <div class="sw-content">
      <div class="sw-body">
        <mt-swipe :auto="3000">
          <mt-swipe-item v-for="item in lunbotu" v-bind:key="item.img">
            <img :src="item.img" />
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>-->
    <!-- 轮播图组件  父组件向子组件传值 -->
    <div class="sw-content">
      <div class="sw-body">
        <swiper v-bind:lunbopr="lunbotu"></swiper>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="info-content">
      <p class="title">{{goodsInfo.title}}</p>
      <div class="info-body">
        <p class="price">
          <span class="old">市场价:￥{{goodsInfo.market_price}}</span>
          <span class="new">销售价:￥{{goodsInfo.sell_price}}</span>
        </p>
        <p>
          购买数量:
          <numBox v-on:componentNumber='getNumber' :Max='goodsInfo.stock_quantity'></numBox>
        </p>
        <mt-button type="primary" size="small">&nbsp;&nbsp;&nbsp;立即购买&nbsp;&nbsp;&nbsp;</mt-button>
        <mt-button type="danger" size="small" @click="addToShop">加入购物车</mt-button>
      </div>
    </div>

    <!-- 商品参数区 -->
    <div class="goods-info">
      <p class="title2">商品参数</p>
      <div class="goods-content">
        <p>商品货号：{{goodsInfo.goods_no}}</p>
        <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
        <p>上架时间：{{goodsInfo.add_time|dataFormat('yyyy-mm-dd')}}</p>
      </div>
      <div class="goods-button">
        <div class="setbutton">
          <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
          <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from ".././subcomponents/shoppinginfo-numbox.vue";
import Swiper from ".././subcomponents/Swiper.vue";
export default {
  data() {
    //挂载一些私有数据
    return {
      lunbotu: [], //轮播图数组
      id: this.$route.params.id, //获取路由中的图片id
      goodsInfo: {}, //存储商品信息
      flag: false, //确定小球是否显示
      number:1,//存放加入购物车的商品数量
    };
  },
  created() {
    //data和methods已经准备好
    this.getLunbotu(); //获取轮播图数据
    // this.getGoodsInfo();
  },
  mounted() {
    this.getGoodsInfo();
  },
  methods: {
    //获取轮播图
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img， 不认识 item.src
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
        }
      });
    },

    //获取商品信息
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsInfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      this.$router.push({ path: "/home/shoppingDesc/" + id });
    },
    goComment(id) {
      this.$router.push({ path: "/home/shoppingComment/" + id });
    },
//小球动画效果
    beforeEnter: function(el) {
      el.style.transform = "translate(0,0)";
    },
    enter: function(el, done) {
      el.offsetWidth;

      //小球不准确的原因
      //不能写死最终位置，因为滚动条会发生改变，根据获取到的坐标动态设置小球的最终位置
      //得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
      //  如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()


      // 获取小球的 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
     
      done();//应用afterEnter（）
    },
    afterEnter: function(el) {
      //这句话的第一个功能是，控制小球的显示和隐藏
      //第二个功能是,直接跳过后半场动画，让flag标识符直接变为false
      //第二次点击按钮时，flag false->true
      this.flag = !this.flag;

      //vue把一个完整的动画拆分为了两部分
      //我们使用flag来表示动画的切换
      //刚开始，flag=false->  true  ->false
     // console.log("afterrnter:flag is"+this.flag)
    },

    getNumber(num){
      if(num<=0){
        this.number=1;
      }else if(num>this.goodsInfo.stock_quantity){
        this.number=this.goodsInfo.stock_quantity;
      }else{
        this.number=num;
      }
      //console.log(this.number);
    },
    addToShop(){
      this.flag=!this.flag;
      //console.log("add flag is"+this.flag)
      var info={
        //{id:null,count:null,price:null,flag:false}
        id:this.id,
        count:this.number,
        price:this.goodsInfo.sell_price,
        flag:true,
      }
      this.$store.commit('addToCar',info)
      console.log(this.$store.getters.getAllCount)
    }
  },
  components: {
    numBox: numbox,
    swiper: Swiper
  }
};
</script>

<style lang="scss" scoped>
.shoppingInfo {
  margin: 10px;
  .sw-content {
    height: 220px;
    width: 100%;
    background-color: white;
    border: 1px solid #ccc;
    .sw-body {
      width: 200px;
      height: 200px;
      margin: 10px auto;
    }
  }
  .info-content {
    margin-top: 10px;
    border: 1px solid #ccc;
    background-color: white;
    .title {
      border-bottom: 1px solid #ccc;
      font-size: 17px;
      padding: 5px 10px;
      text-align: left;
      margin: 0;
      color: black;
    }
    .info-body {
      margin: 10px;
      .price {
        .new {
          font-size: 16px;
          color: red;
          font-weight: bold;
        }
        .old {
          font-size: 14px;
          padding-right: 10px;
          text-decoration: line-through;
        }
      }
    }
  }
  .goods-info {
    margin-top: 10px;
    border: 1px solid #ccc;
    background-color: white;
    .title2 {
      border-bottom: 1px solid #ccc;
      font-size: 17px;
      padding: 5px 10px;
      text-align: left;
      margin: 0;
      color: black;
    }
    .goods-content {
      padding: 10px;
    }
    .goods-button {
      border-top: 1px solid #ccc;
      .setbutton {
        margin: 0 10px 20px 10px;
        width: 94%;

        .mint-button {
          margin-top: 20px;
        }
      }
    }
  }
  .ball {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #c7254e;
    position: absolute;
    z-index: 99;
    top: 363px;
    left: 127px;
  }
}
</style>


