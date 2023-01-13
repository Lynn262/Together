<!--  -->
<template>
  <el-dialog v-model="dialogVisible" title="Tips" width="30%">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
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
              <Card state="now" end-time="2023-10-24"></Card>
              <Card state="ready" end-time="2023-10-24"></Card>
              <Card state="ready" end-time="2023-10-24"></Card>
              <Card state="expire" end-time="2023-10-24"></Card>
              <Card state="expire" end-time="2023-10-24"></Card>
            </el-scrollbar>
          </div>
          <div class="addplan">
            <el-button text @click="addCompanyTask">+ 添加新任务</el-button>
          </div>
        </el-aside>
        <el-main>
          <div class="todo">
            <div class="text">今日任务:</div>
            <el-progress :percentage="percent"  />
          </div>
          <div class="today-list">
            <el-scrollbar :height="windowHeight - 60 - 60 ">
              <TaskToday :name="item.name"  :state="item.state" v-for="item in TodayTaskData"></TaskToday>
            <div class="card" v-if="addTask">
              <div class="text-area">
                <el-input v-model="textarea2" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                  placeholder="Please input" />
              </div>
              <div class="date-select">
                <el-date-picker v-model="value1" type="date" placeholder="Pick a day" size="large" />
              </div>
              <div class="btns">
                <el-button type="primary">确定</el-button>
                <el-button @click="change">取消</el-button>
              </div>
            </div>
            <el-button class="add-task" v-else text @click="change">+ 添加新任务</el-button>
          </el-scrollbar>
          </div>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script lang='ts' setup>
import { Search } from '@element-plus/icons-vue';
import { reactive, toRefs, ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Card from '@/views/plan/Card.vue'
import TaskToday from '@/views/plan/TaskToday.vue'
import { useWindowSize } from '@vueuse/core'
import { flatMap } from 'lodash';
import { computed } from '@vue/reactivity';


const { width, height } = useWindowSize()
const state = reactive({
  imgsrc: '/src/assets/iconfont/plan-black.svg',
  title: '任务清单',
  searchInput: '',
  windowWidth: width,
  windowHeight: height,
  addTask: false,
  textarea2: '',
  dialogVisible: false,
  TodayTaskData:[{
    name:'第一个任务',
    state:'finished'
  },{
    name:'第2个任务',
    state:'ready'
  },{
    name:'第三个任务',
    state:'ready'
  }]

})
const { imgsrc, title, searchInput, windowWidth, windowHeight, addTask, textarea2, dialogVisible ,TodayTaskData} = toRefs(state)

const change = () => {
  console.log("change");

  addTask.value = !addTask.value
}

const addCompanyTask = () => {
  dialogVisible.value = true
}
const percent = computed(()=>{
  const finishedTask = TodayTaskData.value.filter(item => item.state==='finished')

  return (finishedTask.length/TodayTaskData.value.length*100).toFixed(0)
})
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
        height: 100%;
        background-color: #f5f5f5;
        overflow: hidden;

        .task-today {
          margin-top: 10px;
          width: 100%;
          // height: 150px;
          border: 2px solid #efefef;
          border-radius: 5px;
          padding: 10px;
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          background-color: white;

          .title {
            width: 100%;
            // height: 20px;
            padding: 10px;

            h1 {
              font-size: 20px;
              margin: 0px;
            }

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
            }
          }
        }

        .add-task {
          width: 100%;
          height: 40px;
          font-size: 20px;
        }

        .card {
          width: 100%;
          border: 2px solid #efefef;
          padding: 10px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          background-color: white;

          .text-area {
            width: 100%;
          }

          .date-select {
            margin: 15px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .btns {
            display: flex;
            align-items: center;
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

}

.addplan {
  button {
    width: 100%;
    font-size: 20px;
  }
}
</style>