<!--  -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header :nav-img="imgsrc" :nav-name="title"></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">homepage1</el-aside>
        <el-main>homepage2</el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref,computed } from 'vue'
import Header from '@/components/Header.vue'
import "@/assets/less/main.less"
import { useStore } from 'vuex';
import { useWindowSize } from '@vueuse/core';

const store = useStore()

const state=reactive({
  imgsrc:'/src/assets/iconfont/home-black.svg',
  title:'工作台'
})
const {imgsrc,title} = toRefs(state)
const {height,width} = useWindowSize()


</script>
<style lang='less' scoped>
.el-header{
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 10px #ddd;
}
</style>