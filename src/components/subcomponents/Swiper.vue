<template>
    <div>
      <mt-swipe :auto="3000">
          <mt-swipe-item v-for="item in lunbopr" v-bind:key="item.img">
            <img :src="item.img" alt="">
          </mt-swipe-item>
        </mt-swipe>
    </div>
    <!-- 为啥商品评论中的轮播图那么丑 -->
    <!-- 1.在首页中，它的宽高都使用了100% -->
    <!-- 2.商品详情页面中应该高度为100%，宽度为自适应 -->
</template>

<script>
export default {
    data(){
        return {
            dd:null,
        }
    },
    props:['lunbopr'],
    
}
</script>

<style lang="scss" scoped>
// .sw-content {
//     height: 220px;
//     width: 100%;
//     background-color: white;
//     border: 1px solid #ccc;
//     .sw-body {
//       width: 200px;
//       height: 200px;
//       margin: 10px auto;
//       // padding-top: 10px;
//       .mint-swipe {
//         .mint-swipe-item {
//           img {
//             width: 100%;
//             height: 100%;
//           }
//         }
//       }
//     }
//   }
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    text-align: center;

    img {
      // width: 100%;
      height: 100%;
    }
  }
}

</style>


