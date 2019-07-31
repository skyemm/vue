<template>
  <!-- <carsList v-for="item in carlist" :key="item.id" v-bind:idinfo="item.id"></carsList> -->
  <div class="shopcar-container" id="parent">
    <div class="goodsList" v-for="(item, i) in carlist" :key="item.id" :id="item.id">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              :value="$store.getters.getflag(item.id)"
              @change="$store.commit('changeflag',item.id)"
            ></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h3>{{item.title}}</h3>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <carNumber :idcar="item.id"></carNumber>
                <a href="#" @click="deleteGood(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="goodsAll">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <div class="left">
              <p>总计(不含运费)</p>
              <p>
                已勾选商品
                <span class="red">{{$store.getters.getselectCount}}</span>件，总价
                <span class="red">￥{{$store.getters.getselectPrice}}</span>
              </p>
            </div>
            <div class="right">
              <mt-button type="danger" size="small">去结算</mt-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import carNumber from "../subcomponents/car-number.vue";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      carlist: [],
      carContent: null
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    //获取shopcar中的商品
    getGoodsList() {
      var idArr = [];
      this.$store.state.shopCar.forEach(el => {
        idArr.push(el.id);
      });
      if (idArr.length <= 0) {
        return;
      }
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.carlist = result.body.message;
          }
        });
    },
    //删除操作
    deleteGood(id,index) {
      MessageBox.confirm("确定执行此操作?").then(action => {
        this.$store.commit("deletecar", id);
        this.carlist.splice(index, 1);
      });
    }
  },
  components: {
    carNumber
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: white;
  overflow: hidden;
  .goodsList {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
        margin: 0 5px;
      }
      .info {
        //   width: 65%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // margin: 0 5px;
        h3 {
          font-size: 16px;
        }
        p {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price {
            color: red;
            font-weight: bold;
          }
        }
      }
    }
  }
  .goodsAll {
    .mui-card-content-inner {
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          font-size: 16px;
          .red {
            color: red;
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
}
</style>



