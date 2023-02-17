<template>
	<!-- 模糊背景 -->
	<el-card class="box-card-shadow" :style="{ '--border-left-color': '#494949', position: 'static', margin: cardMargin + 'px' }" v-if="isDrag">
		<template #header></template>
	</el-card>
	<!-- mousedown事件触发元素 -->
	<el-card class="box-card" :style="{ '--border-left-color': borderColor, position: 'static', margin: cardMargin + 'px' }" @mousedown="initDrag" v-if="!isDrag">
		<template #header>
			<div class="card-header">
				<span>{{ props.taskName }}</span>
				<TaskStatus :status="(props.taskStatus as stateType)"></TaskStatus>
			</div>
		</template>
		<div class="describe">
			<div class="identify">任务编号:{{ props.id }}</div>
			<div class="start" v-if="props.taskStartTime !== ''">开始时间:{{ props.taskStartTime }}</div>
			<div class="deadline" v-if="props.taskDeadline !== ''">截止时间:{{ props.taskDeadline }}</div>
		</div>
	</el-card>
	<!-- mousemove mouseup事件触发元素 -->
	<el-card class="box-card box-card-drag" :style="cardStyleObjectRef" @mousedown="initDrag" v-if="isDrag">
		<template #header>
			<div class="card-header">
				<span>{{ props.taskName }}</span>
				<TaskStatus :status="(props.taskStatus as stateType)"></TaskStatus>
			</div>
		</template>
		<div class="describe">
			<div class="identify">任务编号:{{ props.id }}</div>
			<div class="start" v-if="props.taskStartTime !== ''">开始时间:{{ props.taskStartTime }}</div>
			<div class="deadline" v-if="props.taskDeadline !== ''">截止时间:{{ props.taskDeadline }}</div>
		</div>
	</el-card>
</template>

<script lang="ts" setup>
import { computed, ref, Ref } from "vue";
import { stateType } from "@/utils/task/StatusColorCompute";
import TaskStatus from "@/components/task/TaskStatus.vue";
import { priorityColorComputer, priorityType } from "../../utils/task/PriorityColorCompute";
import { CardPositionTransform, DragCardStyleInterface, initDragUtil, MousePositionTransform } from "../../utils/dragUtils";

interface TaskCardContentInterfaceImpl {
	priority: priorityType;
	id: number;
	taskName: string;
	taskStatus: stateType;
	taskDeadline: string;
	taskStartTime?: string;
}

const props = withDefaults(defineProps<TaskCardContentInterfaceImpl>(), {
	taskName: "这是一个任务",
	taskStatus: "ready",
	id: -1,
	taskStartTime: "2023-1-1",
	taskDeadline: "2023-1-1",
	priority: "normal",
});
//! 特别注意： 现在的vue不支持按照类型导入的方式为props赋导入的接口

//根据优先级来计算
const borderColor = computed<String>(() => {
	return priorityColorComputer(props.priority as priorityType);
});

interface CardStyleInterface extends DragCardStyleInterface {
	"--border-left-color": String;
	zIndex: number;
}
const cardMargin = ref(10);

//样式对象
const cardStyleObject: CardStyleInterface = {
	"--border-left-color": borderColor.value,
	left: "0px",
	top: "0px",
	height: "0px",
	width: "0px",
	zIndex: 2006,
	margin: cardMargin.value,
};

const cardStyleObjectRef: Ref<CardStyleInterface> = ref(cardStyleObject);

const mousePositionTransform: Ref<MousePositionTransform> = ref({
	x: 0,
	y: 0,
	press: false,
});
const cardPositionTransform: Ref<CardPositionTransform> = ref({
	x: 0,
	y: 0,
});

const isDrag = ref(false);
const initDrag = (e: PointerEvent) => {
	isDrag.value = true;
	console.log(e.currentTarget);
	initDragUtil(e, cardStyleObjectRef, mousePositionTransform, cardPositionTransform, isDrag);
};
</script>
<style lang="less" scoped>
@card-height: 250px;

.box-card-shadow {
	width: 400px;
	box-sizing: border-box;
	height: @card-height;
	border-left: 5px solid var(--border-left-color);
	background-color: #5a5a5a;
}

.box-card {
	width: 400px;
	box-sizing: border-box;
	border-left: 5px solid var(--border-left-color);
	height: @card-height;

	.card-header {
		font-size: 20px;
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
.box-card-drag {
	margin: 10px;
	position: fixed;
}
</style>
