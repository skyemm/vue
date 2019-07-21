<template>
    <div class="cmt-container">
        <h3>评论组件</h3>
        <hr>
        <textarea placeholder="请输入要发布的内容（最多120字）" maxlength="120" v-model="msg"></textarea>

        <mt-button type="primary" size="large" @click='updatecomment'>发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户名：{{item.user_name}}&nbsp;&nbsp;&nbsp;发表时间：{{item.add_time|dataFormat('yyyy-mm-dd')}}
                </div>
                <div class="cmt-body">
                    {{item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="aadmore">加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return{
            pageIndex:1,
            comments:[],
            msg:null
        }
    },
    created(){
        this.getcomment();
    },
    methods:{
        getcomment(){
            this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
            .then(result=>{
                if(result.body.status===0){
                    // this.comments=result.body.message;
                     this.comments=this.comments.concat(result.body.message);
                }else{
                    Toast('加载失败')
                }
            })
        },
        aadmore(){
            this.pageIndex++;
            this.getcomment();
        },
        updatecomment(){
            if(this.msg.trim().length === 0){
                Toast('评论内容不能为空！')
            }else{
                //发表评论
                //参数1：请求的URL地址
                //参数2：提交给服务器的数据对象（content：this.msg）
                //参数3：定义提交时候表单中数据格式（emulateJSON：ture）
                this.$http.post("api/postcomment/"+this.id,{comment:this.msg.trim()})
                .then(result=>{
                    if(result.body.status===0){
                        this.comments.unshift({
                        content:this.msg.trim(),
                        add_time:Date.now(),
                        user_name:'匿名用户'
                    });
                    this.msg='';
                    }
                    
                })
            }
        }
    },
    props:["id"]
    
}
</script>
<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size:18px;
    }
    textarea{
        font-size: 14px;
        margin:0;
        height: 85px;
    }
    .cmt-list{
        margin: 5px 0;
       .cmt-item{
          .cmt-title{
              background-color:darkgray;
              font-size:13px;
              line-height: 35px;
          } 
          .cmt-body{
              text-indent: 2em;
              line-height: 35px;
          }
       } 
    }
}
</style>


