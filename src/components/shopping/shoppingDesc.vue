<template>
  <div class="goodsDesc-container">
      <!-- 标题 -->
    <h1 class="title">{{goodsDesc.title}}</h1>
    <!-- 副标题 -->    
    <hr />
    <!-- 内容 -->
    <div class="content" v-html="goodsDesc.content"></div>   
  </div>
</template>

<script>
import {Toast} from "mint-ui"

export default {
  data() {
    return {
      id: this.$route.params.id,
      goodsDesc:{}
    }  
  },
  created(){
      this.getinfo();
  },
   methods:{
        getinfo(){
            this.$http.get("api/goods/getdesc/"+this.id).then(result=>{
                if(result.body.status===0){
                    this.goodsDesc=result.body.message[0];
                }else{
                    Toast('加载失败')
                }
            })
        }
    },  
};
</script>

<style lang="scss">
.goodsDesc-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: chocolate;
  }
  .content {
    font-size: 12px;
    img{
      width: 100%;
    }
  }
}
</style>


