<!--  -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header :nav-img="imgsrc" :nav-name="title"></Header>
      </el-header>
      <el-container>
        <el-header height="40px">
          <DashboardController>
            <el-button type="primary" size="default" @click="">
              <el-icon>
                <EditPen />
              </el-icon>{{ editableHeaderButtonText }}
            </el-button>
            <el-button type="info" size="default" @click="">
              <el-icon>
                <Refresh />
              </el-icon>刷新界面
            </el-button>
          </DashboardController>
        </el-header>
        <el-container v-if="dashboardLayout === 'desktop'">
          <el-aside :width="dashboardSize.widthComputed * 0.6 + 'px'">homepage1</el-aside>
          <el-main>homepage2</el-main>
        </el-container>
        <el-container direction="vertical" v-else>
          <el-main>homepage1</el-main>
          <el-main>homepage2</el-main>
        </el-container>
      </el-container>
    </el-container>

  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, computed, defineProps, ComputedRef, Ref } from 'vue'
import Header from '@/components/Header.vue'
import DashboardController from '@/views/dashboard/components/DashboardController.vue';
import "@/assets/less/main.less"
import { useWindowSize } from '@vueuse/core';
import { Refresh, EditPen } from '@element-plus/icons-vue';

interface windowSizeInterface {
  heightComputed: number,
  widthComputed: number
}

const state = reactive({
  imgsrc: '/src/assets/iconfont/home-black.svg',
  title: '工作台'
})
const { imgsrc, title } = toRefs(state)
//动态获取高度和宽度
const windowHeight: Ref<number> = useWindowSize().height
const windowWidth: Ref<number> = useWindowSize().width
const dashboardSize: ComputedRef<windowSizeInterface> = computed<windowSizeInterface>(() => {
  return { heightComputed: windowHeight.value - 80, widthComputed: windowWidth.value }
})
const dashboardLayout: ComputedRef<string> = computed<string>(() => {
  if (dashboardSize.value.widthComputed < 768) {
    return "mobile"
  } else {
    return "desktop"
  }
})
const editableHeaderButtonText = ref('设置面板')

</script>
<style lang='less' scoped>
.el-header {
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 10px #ddd;
}

.el-button {
  padding: 0px 20px;
}
</style>