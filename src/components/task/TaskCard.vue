<template>
	<el-card class="box-card" :style="cardStyleObjectRef" @mousedown.stop="initDrag" @mouseup.stop="destroyDrag" @mousemove.stop="dragMove">
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
import { computed, PropType, ref, reactive, Ref } from "vue";
import { statusColorComputer, stateType } from "@/utils/task/StatusColorCompute";
import TaskStatus from "@/components/task/TaskStatus.vue";
import { priorityColorComputer, priorityType } from "../../utils/task/PriorityColorCompute";
// import { TaskCardContentInterface } from "./TaskCardContentInterface";

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

type cardPositionType = "absolute" | "relative";

interface MousePositionTransform {
	x: number;
	y: number;
	press: boolean;
}

interface CardPositionTransform {
	x: number;
	y: number;
}

interface CardStyleInterface {
	"--border-left-color": String;
	position: cardPositionType;
	left: String;
	top: String;
}

//样式对象
const cardStyleObject: CardStyleInterface = {
	"--border-left-color": borderColor.value,
	position: "relative",
	left: "0px",
	top: "0px",
};
const cardStyleObjectRef = ref(cardStyleObject);

//鼠标相对于整个窗口的偏移
const mousePositionTransform: Ref<MousePositionTransform> = ref({
	x: 0,
	y: 0,
	press: false,
});
//卡片本身的偏移
const cardPositionTransform: Ref<CardPositionTransform> = ref({
	x: 0,
	y: 0,
});

const initDrag = (e: MouseEvent) => {
	let card: Element = e.currentTarget as Element;
	// console.log(card.getBoundingClientRect());
	cardStyleObjectRef.value.position = "absolute";
	// console.log(cardStyleObjectRef.value);
	mousePositionTransform.value.x = e.clientX;
	mousePositionTransform.value.y = e.clientY;
	//鼠标已经被按下
	mousePositionTransform.value.press = true;
	console.log(mousePositionTransform.value);
	//要实现拖动，首先要求子节点变为position：absolute
};

const destroyDrag = (e: MouseEvent) => {
	mousePositionTransform.value = {
		x: 0,
		y: 0,
		press: false,
	};
	cardStyleObjectRef.value.position = "relative";
	cardStyleObjectRef.value.left = "0px";
	cardStyleObjectRef.value.top = "0px";
};

const dragMove = (e: MouseEvent) => {
	if (mousePositionTransform.value.press) {
		cardPositionTransform.value.x = e.clientX - mousePositionTransform.value.x;
		cardPositionTransform.value.y = e.clientY - mousePositionTransform.value.y;
		console.log(cardPositionTransform.value.x, cardPositionTransform.value.y);
		cardStyleObjectRef.value.left = `${cardPositionTransform.value.x}px`;
		cardStyleObjectRef.value.top = `${cardPositionTransform.value.y}px`;
	}
};
</script>
<style lang="less" scoped>
.box-card {
	width: calc(100% - 20px);
	margin: 10px;
	box-sizing: border-box;
	border-left: 5px solid var(--border-left-color);

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
</style>
