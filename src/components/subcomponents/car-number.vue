<template>
  <div class="mui-numbox" data-numbox-min="1" >
    <button class="mui-btn mui-btn-numbox-minus" type="button"  >-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change='watchChange' ref="number"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button" >+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  data(){
    return {}
  },
  mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
    this.setvaule()
  },
  methods:{
    // 数量改变了
      // console.log(this.$refs.numbox.value);
      // 每当数量值改变，则立即把最新的数量同步到 购物车的  store 中，覆盖之前的数量值
    watchChange(){
      this.$store.commit('setcount',{id:this.idcar,count:parseInt(this.$refs.number.value)})
    },
    // add(){
    //   this.$store.commit('addcount',this.idcar)
    // },
    // cut(){
    //   this.$store.commit('downcount',this.idcar)
    // },
    setvaule(){
      this.$refs.number.value=this.$store.getters.getcount(this.idcar)
     // console.log(this.$refs.number.value)
    }
  },
  
  props:['idcar'],
  
};
</script>

<style lang="scss" scoped>
</style>


