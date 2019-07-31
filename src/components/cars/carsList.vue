<template>
  <div class="carList">
    <div class="swith">
      <div class="swith-body">
        <li class="mui-table-view-cell">
          <span></span>
          <div class="mui-switch mui-switch-blue mui-switch-mini mui-active">
            <div class="mui-switch-handle"></div>
          </div>
        </li>
      </div>
    </div>
    <img src="" ref="imgs" />
    <div class="content">
      <div class="up">
        <h3>hhhhhhh</h3>
      </div>
      <div class="down">
        <p>￥：1234</p>
        <carNumber></carNumber>
      </div>
    </div>
  </div>
</template>

<script>
import carNumber from "../subcomponents/car-number.vue";
export default {
  data() {
    return {
      pic: []
    };
  },
  created() {
    this.getpic();
  },
  methods: {
    getpic() {
      this.$http.get("api/getthumimages/" + this.idinfo).then(result => {
        if (result.body.status === 0) {
          // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img， 不认识 item.src
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.pic = result.body.message;
        }
      });
      console.log('图片地址是'+this.pic)
    }
  },
  watch:{
    pic:function (newVal , oldVal) {
      console.log(newVal)
      this.$refs.imgs.src= newVal
      // console.log(newVal)
    }
  },
  components: {
    carNumber
  },
  props: ["idinfo"]
};
</script>

<style lang="scss" scoped>
.carList {
  height: 100px;
  width: 97%;
  margin: 5px;
  display: inline-block;
  background-color: white;
  border: 1px solid #ccc;

  .swith {
    display: inline-block;
    width: 20%;
    text-align: center;
    .swith-body {
      margin: 0 auto;
    }
  }
  img {
    width: 60px;
    height: 60px;
    margin: 10px;
  }
  img[lazy="loading"]{
		  width:40px;
		  height:300px;
		  margin:auto;
	  }
  .content {
    display: inline-block;
    margin: 5px 15px;
    .down{
        p{display: inline-block;}
        carNumber{
            display: inline-block;
        }
        
    }
  }
}
</style>


