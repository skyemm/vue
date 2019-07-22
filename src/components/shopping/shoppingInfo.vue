<template>
  <div class="shoppingInfo">
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
          <numBox></numBox>
        </p>
        <mt-button type="primary" size="small">&nbsp;&nbsp;&nbsp;立即购买&nbsp;&nbsp;&nbsp;</mt-button>
        <mt-button type="danger" size="small">加入购物车</mt-button>
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
      goodsInfo:{}  //存储商品信息
    };
  },
  created() {
    //data和methods已经准备好
    this.getLunbotu(); //获取轮播图数据
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
    getGoodsInfo(){
      this.$http.get("api/goods/getinfo/" + this.id).then(result=>{
        if(result.body.status===0){
          this.goodsInfo=result.body.message[0];
        }
      })
    },
    goDesc(id){
      this.$router.push({path:'/home/shoppingDesc/'+id})
    },
    goComment(id){
      this.$router.push({path:'/home/shoppingComment/'+id})
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
}
</style>


