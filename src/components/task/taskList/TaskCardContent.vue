<template>
	<div class="task-list-card" :style="{ borderLeft: `3px solid ${props.TaskCardContent.priority}` }">
		<!-- card由五个部分组成 优先级编号 任务编号 任务名称 任务状态 任务截止时间 -->
		<div class="task-id">
			<span>{{ props.TaskCardContent.id }}</span>
		</div>
		<div class="task-name">
			<span>{{ props.TaskCardContent.taskName }}</span>
		</div>
		<div class="task-status">
			<span>{{ props.TaskCardContent.taskStatus }}</span>
		</div>
		<div class="task-deadline"></div>
	</div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { TaskCardContentInterface } from "../TaskCardContentInterface";

interface Props {
	isCollapse: boolean;
	taskListId: string;
	TaskCardContent: TaskCardContentInterface;
}

// withDefaults 可以设置props的默认属性
const props = withDefaults(defineProps<Props>(), {
	isCollapse: false,
	taskListId: "",
});

const emit = defineEmits<{
	(e: "collapse-task-list", id: string): void;
}>();

const collapse = () => {
	emit("collapse-task-list", props.taskListId);
};
</script>

<style lang="less" scoped>
@task-list-height: 50px;
@title-font-size: 16px;

.task-list-card {
	border-bottom: 1px solid #eee;
	display: flex;
	height: @task-list-height;
	width: 100%;
	align-items: center;

	&:hover {
		cursor: pointer;
		background-color: #f5f5f5;
	}

	& > .task-priority {
		height: @task-list-height;
		width: 3px;
	}
}

.first-priority {
	background-color: rgb(255, 0, 0);
}
</style>
