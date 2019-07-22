<template>
  <div class="goods">
    <!-- 使用router-link进行跳转 -->
    <router-link
      class="goods-conttainer"
      v-for="item in goodsList"
      :key="item.id"
      :to="'/home/shoppingList/'+item.id">
      <div class="goods-img">
        <img :src="item.img_url" />
        <p class="goods-content">{{item.title}}</p>
      </div>
      <div class="goods-info">
        <p class="goods-p">
          <span>￥{{item.sell_price}}</span>
          <span class="old">{{item.market_price}}</span>
        </p>
        <p class="goods-num">
          <span>热卖中...</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link>
    <!-- <div
      class="goods-conttainer"
      v-for="item in goodsList"
      :key="item.id"
      @click="goDetail(item.id)">
      <div class="goods-img">
        <img :src="item.img_url" />
        <p class="goods-content">{{item.title}}</p>
      </div>
      <div class="goods-info">
        <p class="goods-p">
          <span>￥{{item.sell_price}}</span>
          <span class="old">{{item.market_price}}</span>
        </p>
        <p class="goods-num">
          <span>热卖中...</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div> -->
    <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
  </div>
  <!-- 在网页中有两种实现跳转的方式 -->
  <!-- 方式1：使用a标签的形式 叫做标签跳转 -->
  <!-- 方式2：使用window.location.href 的形式，叫做编程式 -->
</template>

<script>
export default {
  data() {
    return {
      pageindex: 1,
      goodsList: []
    };
  },
  created() {
    this.getGoodList();
  },
  methods: {
    getGoodList() {
      this.$http
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then(result => {
          if (result.body.status === 0) {
            this.goodsList = this.goodsList.concat(result.body.message);
          }
        });
    },
    getmore() {
      this.pageindex = this.pageindex + 1;
      this.getGoodList();
    },
    // 使用js方式实现页面跳转

    //注意一定要区分this.$route和this.$router这两个对象
    //其中：this.$route是一个路由【参数对象】，所有的路由中参数，params，query都属于它
    //其中：this.$router是一个路由【导航对象】，用它可以方便的使用js代码，实现路由的前进 后退，跳转到新URL地址
    goDetail(id){
      //1. 最简单的方式
      // this.$router.push('/home/shoppingList/'+id)

      //2.传递对象
      // this.$router.push({path:'/home/shoppingList/'+id})

      //3.传递命名的路由
      this.$router.push({name:"shoppingInfo",params:{id:id}})
    }
  }
};
</script>

<style lang="scss" scoped>
.goods {
  margin-top: 10px;
  padding: 10px;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  .goods-conttainer {
    // display: inline-block;
    width: 49%;
    background-color: white;
    box-shadow: 0 0 9px #999;
    border: 1px solid #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    .goods-img {
      img {
        width: 100%;
      }
      img[lazy="loading"] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
      .goods-content {
        margin: 10px 0;
        color: black;
        text-align: left;
      }
    }
    .goods-info {
      padding: 5px;
      background-color: rgba(0, 0, 0, 0.1);
      .goods-p {
        padding-left: 2px;
        font-size: 16px;
        font-weight: bold;
        color: red;
        .old {
          color: cadetblue;
          font-size: 13px;
          text-decoration: line-through;
          margin-left: 10px;
        }
      }
      .goods-num {
        margin: 0;
        font-size: 13px;
        color: burlywood;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>


