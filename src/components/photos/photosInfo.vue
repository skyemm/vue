<template>
    <div class="info-container">
        <h3 class="title">{{photoInfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoInfo.add_time|dataFormat('yyyy-mm-dd')}}</span>
            <span>点击次数：{{photoInfo.click}}次</span>
        </p>
        <hr>

        <div class="info-imge">
            <!-- <img v-for="item in photoImg" :key="item.src" :src="item.src">   -->
            <!-- <img class="preview-img" v-for="(item, index) in photoImg" :src="item.src" height="100" @click="$preview.open(index, photoImg)" :key="item.src"> -->
            <vue-preview  :slides="photoImg"  @close="handleClose" > </vue-preview >
        </div>
        <div class="info-body" v-html="photoInfo.content"></div>
        <hr>
        <comment-info :id="this.id"></comment-info>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
import {Toast} from "mint-ui"
export default {
    data(){
        return{
            id: this.$route.params.id,
            photoInfo:{},
            photoImg:[]
        }
    },
    created(){
        this.getPhotosInfo();
        this. getPhotosimg();
    },
    methods:{
        getPhotosInfo(){
            this.$http.get("api/getimageInfo/" + this.id).then(result=>{
                if(result.body.status===0){
                    this.photoInfo=result.body.message[0];
                }else{
                    Toast('加载失败！')
                }
            })
        },
        getPhotosimg(){
            // this.$http.get("api/getthumimages/" + this.id).then(result=>{
            //     if(result.body.status===0){
            //         this.photoImg=result.body.message;
            //     }
            // })
            this.$http.get("api/getthumimages/" + this.id).then(result=>{
                if(result.body.status===0){
                    result.body.message.forEach(element => {
                        //循环每个图片补全图片的宽和高
                        element.w=600;
                        element.h=400;
                        element.msrc=element.src;
                    });
                    this.photoImg=result.body.message;
                }
            })
        },
        handleClose () {
        console.log('close event')
      }
    },
    components:{
        'comment-info':comment,
    }
    
}
</script>

<style lang="scss" scoped>
.info-container{
    .title{
        font-size:15px;
        color:#26A2ff;
        text-align: center;
        margin:15px 0;
    }
    .subtitle{
        font-size: 12px;
        color:burlywood;
        display:flex;
        justify-content: space-between;
    }
    // .info-imge{
    //     background-color: white;
    //     img{   
    //     box-shadow: 0 0 9px #999;
    //     margin: 10px;
    //     width:100px;
    //     height:100px;
    //  }
    // }
    .info-body{
        font-size:13px;
        text-align:left;
        line-height: 30px;
    }
    
}
</style>


