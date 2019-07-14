<template>
  <div>
    <!-- 轮播图区域 -->
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="item in lunbotu" v-bind:key="item.img">
        <img :src="item.img" />
      </mt-swipe-item>
    </mt-swipe>

    <!-- 从九宫格到六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
         <div>
           <img src="../../images/menu1.png" alt="" style="width:60px; height: 60px;" />
          <div class="mui-media-body">新闻资讯</div>
         </div>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <img src="../../images/menu2.png"  alt="" style="width:60px; height: 60px;"/>
          <div class="mui-media-body">图片分享</div>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <img src="../../images/menu3.png" alt="" style="width:60px; height: 60px;"/>
          <div class="mui-media-body">商品购买</div>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <img src="../../images/menu4.png" alt="" style="width:60px; height: 60px;"/>
          <div class="mui-media-body">留言反馈</div>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <img src="../../images/menu5.png" alt="" style="width:60px; height: 60px;"/>
          <div class="mui-media-body">视频专区</div>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <img src="../../images/menu6.png" alt="" style="width:60px; height: 60px;"/>
          <div class="mui-media-body">联系我们</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      lunbotu: [] //保存轮播图数据
    };
  },
  created() {
    this.getlunbo();
  },
  methods: {
    getlunbo() {
      this.$http.get("http://39.106.32.91:3000/api/getlunbo").then(result => {
        if (result.body.status === 0) {
          this.lunbotu = result.body.message;
        } else {
          Toast("加载失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    // &:nth-child(1){
    //     background-color: red;
    // }
    // &:nth-child(2){
    //     background-color: brown;
    // }
    // &:nth-child(3){
    //     background-color: yellowgreen;
    // }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.mui-grid-view .mui-grid-9 {
  background-color: #ffffff;
  border: none;
  li {
    img {
      width:60px;
      height: 60px;
    }
    .mui-media-body{
        font-size: 13px;
    }
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}
</style>


