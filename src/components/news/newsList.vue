<template>
    <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
					<router-link :to="'/home/newsinfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis'>
                                <span>发表时间：{{item.add_time|dataFormat('yyyy-mm-dd-')}}</span>
                                <span>点击次数：{{item.click}}</span>
                            </p>
						</div>
					</router-link>
				</li>
			
			</ul>
</template>

<script>
import {Toast} from "mint-ui"

export default {
    data(){
        return {
            newsList:null
        }
    },
    created(){
        this.getList();
    },
    methods:{
        getList(){
            this.$http.get('api/getnewslist').then(result=>{
                if(result.body.status===0){
                    this.newsList=result.body.message;
                }else{
                    Toast('失败');
                }
            })
        }
    }
    
}
</script>

<style lang="scss" scoped>
.mui-table-view{
    li{
        h1{font-size: 14px;}
        .mui-ellipsis{
            font-size: 12px;
            color:cadetblue;
            display: flex;
            justify-content:space-between;
        }
    }
}
</style>


