<template>
	<el-card class="box-card" :style="{ '--border-left-color': borderColor }">
		<template #header>
			<div class="card-header">
				<span>{{ name }}</span>
				<TaskStatus :status="props.state"></TaskStatus>
			</div>
		</template>
		<div class="describe">
			<div class="identify">任务编号:{{ id }}</div>
			<div class="start" v-if="startTime !== ''">开始时间:{{ startTime }}</div>
			<div class="deadline" v-if="endTime !== ''">截止时间:{{ endTime }}</div>
		</div>
	</el-card>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { priorityColorComputer, stateType } from "@/utils/PriorityColorCompute";
import TaskStatus from "@/components/task/TaskStatus.vue";

interface CardProps {
	name: string;
	state: stateType;
	id: number;
	startTime: string;
	endTime: string;
}

const props = withDefaults(defineProps<CardProps>(), {
	name: "这是一个任务",
	state: "ready",
	id: -1,
	startTime: "2023-1-1",
	endTime: "2023-1-1",
});

const borderColor = computed<String>(() => {
	return priorityColorComputer(props.state);
});
</script>
<style lang="less" scoped>
.box-card {
	margin: 10px;
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
