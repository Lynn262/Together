<template>
	<el-card class="box-card" :style="cardStyleObjectRef" @mousedown="initDrag">
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
import { DragCardStyleInterface, initDragUtil } from "../../utils/dragUtils";

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

//样式对象
const cardStyleObject: CardStyleInterface = {
	"--border-left-color": borderColor.value,
	position: "relative",
	left: "0px",
	top: "0px",
	zIndex: 2006,
};

const cardStyleObjectRef: Ref<CardStyleInterface> = ref(cardStyleObject);

const initDrag = (e: PointerEvent) => {
	initDragUtil(e, cardStyleObjectRef);
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
