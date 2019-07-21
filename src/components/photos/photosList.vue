<template>
  <div>
    <!-- 顶部滑动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">         
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            v-for="item in listNum"
            :key="item.id"
            @click="getListById(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 中间内容区域 -->
    <transition>
      <ul class="photos-list">
        <router-link v-for="item in listNumById" :key="item.id" :to="'/home/photosInfo/'+item.id" tag="li">
          <img :src="item.img_url" />
          <div class="info">
            <h1 class="info-title">{{item.title}}</h1>
            <div class="info-body">{{item.zhaiyao}}</div>
          </div>
        </router-link>
      </ul>
    </transition>
  </div>
</template>

<script>
//导入mui的js
import mui from "../../lib/mui/js/mui.min.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      listNum: [],
      listNumById: []
    };
  },
  methods: {
    getListNum() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
			// 手动拼接出一个最完整的 分类列表
          result.body.message.unshift({ title: "推荐", id: 0 });
          this.listNum = result.body.message;
        } else {
          Toast("加载失败");
        }
      });
    },
    getListById(cateId) {
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.listNumById = result.body.message;
        } else {
          Toast("加载失败");
        }
      });
    }
  },
  created() {
	this.getListNum();
	this.getListById(0);
  },
  mounted() {
    // 2. 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
 .photos-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    li {
      width: 100%;
      position: relative;
      background-color: #ccc;
	  text-align: center;
	  margin-bottom:10px;
      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
        box-shadow: 0 0 9px #999;
      }
	  img[lazy="loading"]{
		  width:40px;
		  height:300px;
		  margin:auto;
	  }
      .info {
        color: white;
        text-align: left;
        position: absolute;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        max-height: 85px;
        width: 100%;
        font-family: "微软雅黑";
        .info-title {
          font-size: 15px;
        }
        .info-body {
          font-size: 13px;
          text-indent: 2em;
        }
      }
    }
  }
</style>


