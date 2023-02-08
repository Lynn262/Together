<!--  -->
<template>
	<el-dialog v-model="dialogVisible" title="添加任务" width="30%">
		<el-form label-width="100px" :model="Form" style="max-width: 460px">
			<el-form-item label="任务名称">
				<el-input v-model="Form.name" />
			</el-form-item>
			<el-form-item label="开始时间">
				<el-date-picker
					v-model="Form.startTime"
					type="date"
					placeholder="选择开始时间"
					style="width: 100%"
				/>
			</el-form-item>
			<el-form-item label="结束时间">
				<el-date-picker
					v-model="Form.deadline"
					type="date"
					placeholder="选择结束时间"
					style="width: 100%"
				/>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="check">确定</el-button>
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
						<el-input
							v-model="searchInput"
							class="search"
							placeholder="search something"
							:prefix-icon="`search`"
							@keyup.enter="searchTask"
						/>
						<el-scrollbar :height="windowHeight - 60 - 60 - 32">
							<Card
								:state="item.state"
								:end-time="item.endTime"
								:start-time="item.startTime"
								:name="item.name"
								v-for="(item, index) in CardTaskData"
								:key="index"
							></Card>
						</el-scrollbar>
					</div>
					<div class="addplan">
						<el-button text @click="addCompanyTask">+ 添加新任务</el-button>
					</div>
				</el-aside>
				<el-main>
					<div class="todo">
						<div class="text">今日任务:</div>
						<el-progress :percentage="percent" />
					</div>
					<div class="today-list">
						<el-scrollbar :height="windowHeight - 60 - 60">
							<TaskToday
								v-for="(item, index) in TodayTaskData"
								:name="item.name"
								:state="item.state"
								:key="index"
							></TaskToday>
							<div class="card" v-if="addTask">
								<div class="text-area">
									<el-input
										v-model="TaskForm.name"
										:autosize="{ minRows: 2, maxRows: 4 }"
										type="textarea"
										placeholder="Please input"
									/>
								</div>
								<div class="date-select">
									<el-date-picker
										v-model="TaskForm.deadline"
										type="date"
										placeholder="Pick a day"
										size="large"
									/>
								</div>
								<div class="btns">
									<el-button type="primary">确定</el-button>
									<el-button @click="change">取消</el-button>
								</div>
							</div>
							<el-button class="add-task" v-else text @click="change">
								+ 添加新任务
							</el-button>
						</el-scrollbar>
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { reactive, toRefs, ref, onMounted, ComputedRef } from "vue";
import Header from "@/components/Header.vue";
import Card from "@/views/plan/Card.vue";
import TaskToday from "@/views/plan/TaskToday.vue";
import { useWindowSize } from "@vueuse/core";
import { flatMap } from "lodash";
import { computed } from "@vue/reactivity";
import dayjs from "dayjs";

const { width, height } = useWindowSize();
const state = reactive({
	imgsrc: "/src/assets/iconfont/plan-black.svg",
	title: "任务清单",
	searchInput: "",
	windowWidth: width,
	windowHeight: height,
	addTask: false,
	textarea2: "",
	dialogVisible: false,
	TodayTaskData: [
		{
			name: "第一个任务",
			state: "finished",
		},
		{
			name: "第2个任务",
			state: "ready",
		},
		{
			name: "第三个任务",
			state: "ready",
		},
	],
	CardTaskData: [
		{
			name: "任务1",
			state: "ready",
			startTime: "2023-1-1",
			endTime: "2023-1-1",
		},
		{
			name: "任务1",
			state: "now",
			startTime: "2023-1-1",
			endTime: "2023-1-1",
		},
		{
			name: "任务1",
			state: "ready",
			startTime: "2023-1-1",
			endTime: "2023-1-1",
		},
		{
			name: "这是一个任务",
			state: "expire",
			startTime: "2023-1-1",
			endTime: "2023-1-1",
		},
		{
			name: "任务1",
			state: "expire",
			startTime: "2023-1-1",
			endTime: "2023-1-1",
		},
	],
	Form: {
		name: "",
		startTime: "",
		deadline: "",
	},
	TaskForm: {
		name: "",
		deadline: "",
	},
});
const {
	imgsrc,
	title,
	searchInput,
	windowWidth,
	windowHeight,
	addTask,
	textarea2,
	dialogVisible,
	TodayTaskData,
	Form,
	CardTaskData,
	TaskForm,
} = toRefs(state);

const change = () => {
	console.log("change");

	addTask.value = !addTask.value;
};

const addCompanyTask = () => {
	dialogVisible.value = true;
};
const percent = computed(() => {
	const finishedTask = TodayTaskData.value.filter(
		(item) => item.state === "finished"
	);
	return parseInt(
		((finishedTask.length / TodayTaskData.value.length) * 100).toFixed(0)
	);
});

const searchTask = () => {
	//这里是查询到的任务
	const CardFilter = CardTaskData.value.filter(
		(item) => item.name.indexOf(searchInput.value) !== -1
	);
	console.log(CardFilter);
};

const check = () => {
	const before = dayjs().isBefore(dayjs(Form.value.startTime));
	const after = dayjs().isAfter(dayjs(Form.value.deadline));
	const obj = {
		name: Form.value.name,
		state: after ? "expire" : before ? "ready" : "now",
		startTime: dayjs(Form.value.startTime).format("YYYY-MM-DD"),
		endTime: dayjs(Form.value.deadline).format("YYYY-MM-DD"),
	};
	CardTaskData.value.push(obj);
	Form.value = {
		name: "",
		startTime: "",
		deadline: "",
	};
	dialogVisible.value = false;
};
</script>
<style lang="less" scoped>
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
