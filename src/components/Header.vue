<!--  -->
<template>
  <div class="header">
    <div class="nav">
      <img :src="navImg" alt="">
      <span>{{ navName }}</span>
    </div>
    <div class="avater">
      Xie
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
const props = defineProps({
  navName: {
    type:String,
    default:"首页"
  },
  navImg:{
    type:String,
    //这个地方必须写根目录要不然无法显示
    default:"/src/assets/iconfont/home-black.svg"
  }

})


</script>
<style lang='less' scoped>
.header {
  width: 100%;
  display: flex;
  justify-content:space-between;
  align-items: center;
  background: #fff;

  .nav{
    display: flex;
    align-items: center;
    img{
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
    font-size: 20px;
    line-height: 20px;
  }
  .avater {

    height: 40px;
    width: 40px;
    border: 5px solid white;
    box-shadow: 0px 0px 10px #ccc;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: lightgreen;
    color: white;
  }
}
</style>