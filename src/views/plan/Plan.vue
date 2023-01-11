<!--  -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header :nav-img="imgsrc" :nav-name="title"></Header>
      </el-header>
      <el-container>

        <el-aside width="50%">
          <div class="planlist">
            <el-input v-model="searchInput" class=" search" placeholder="search something" :prefix-icon="search" />
            <el-scrollbar :height="windowHeight - 60 - 60 - 32">
              <el-card class="box-card" v-for="item in 5 ">
                <template #header>
                  <div class="card-header">
                    <span>Card name</span>
                    <div class="state">进行中</div>
                  </div>
                </template>
                <div class="describe">
                  <div class="identify">任务编号:27</div>
                  <div class="start">开始时间:2023-1-1</div>
                  <div class="deadline">截止时间:2023-1-20</div>
                </div>
              </el-card>
            </el-scrollbar>
          </div>
          <div class="addplan">
            <el-button text>+ 添加新任务</el-button>
          </div>
        </el-aside>
        <el-main>
          <div class="todo">
            <div class="text">今日任务:</div>
            <el-progress :percentage="0" />
          </div>
          <div class="today-list" >
            <div class="card" v-if="addTask" tabindex="1" @blur="change">
              <div class="text-area" tabindex="1">
                <el-input v-model="textarea2" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                  placeholder="Please input" />
              </div>
              <div class="date-select" tabindex="1">
                <el-date-picker v-model="value1" type="date" placeholder="Pick a day" size="small" />
              </div>
              <div class="btns" tabindex="1">
                <el-button>确定</el-button>
                <el-button @click="change">取消</el-button>
              </div>
            </div>
            <el-button class="add-task" v-else text @click="change">+ 添加新任务</el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script lang='ts' setup>
import { Search } from '@element-plus/icons-vue';
import { reactive, toRefs, ref } from 'vue'
import Header from '../../components/Header.vue'
import { useWindowSize } from '@vueuse/core'


const { width, height } = useWindowSize()
const state = reactive({
  imgsrc: '/src/assets/iconfont/plan-black.svg',
  title: '任务清单',
  searchInput: '',
  windowWidth: width,
  windowHeight: height,
  addTask:false,
  textarea2:''

})
const { imgsrc, title, searchInput, windowWidth, windowHeight ,addTask,textarea2} = toRefs(state)

const change =()=>{
  console.log("change");
  
  addTask.value =!addTask.value
}
</script>
<style lang='less' scoped>
.common-layout {
  height: 100%;

  .el-container {
    height: 100%;
    overflow: hidden;

    .el-aside {
      overflow: hidden;
    }

    .el-main {
      overflow: hidden;
      padding: 0;

      .todo {
        padding-left: 10px;
        border-bottom: 1px solid #efefef;

        .text {
          font-size: 20px;
          padding: 5px 0;
          color: #787878;
        }

        width: 100%;
        height: 60px;
        background-color: #fafafa;
      }

      .today-list {
        .add-task {
          width: 100%;
          height: 40px;
          font-size: 20px;
        }

        .card {
          width: 100%;
          height: 150px;
          border: 2px solid #efefef;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          .text-area{
            width: 100%;
          }
          .date-select{
            width: 100%;
          }
          .btns{
            width:100%;
          }
          justify-content: center;
        }
      }
    }
  }
}

.el-header {
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 10px #ddd;
}

.planlist {
  // height: 816px;
  width: 100%;
  background-color: #fafafa;

  .search {
    width: 100%;
    height: 60px;
    padding: 10px;
    font-size: 20px;
  }

  .box-card {
    margin: 10px;
    border-left: 5px solid #fa8888;

    .card-header {
      font-size: 20px;

      .state {
        background-color: #fa8888;
        width: 80px;
        font-size: 16px;
        color: white;
        border-radius: 5px;
        text-align: center;
      }
    }

    .describe {
      display: flex;
      flex-wrap: wrap;

      div {
        margin: 10px;
        padding: 5px;
        border-radius: 5px;
        background-color: #f5f5f5;
        color: #787878;

        &.deadline {
          background-color: #fff1f1;
          color: #ff7979;
        }
      }
    }
  }
}

.addplan {
  button {
    width: 100%;
    font-size: 20px;
  }
}
</style>