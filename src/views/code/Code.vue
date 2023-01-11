<!--  -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header :nav-img="imgsrc" :nav-name="title"></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">code1</el-aside>
        <el-main>code2</el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import Header from '../../components/Header.vue'
const state=reactive({
  imgsrc:'/src/assets/iconfont/code-black.svg',
  title:'代码运行'
})
const {imgsrc,title} = toRefs(state)
</script>
<style lang='less' scoped>
.el-header{
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 10px #ddd;
}
</style>