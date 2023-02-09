<template>
	<div class="task-list" @click="collapse">
		<div class="header-icon">
			<el-icon :size="30"><ArrowRight /></el-icon>
		</div>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";

interface Props {
	isController: boolean;
	isCollapse: boolean;
	taskListId: string;
}

// withDefaults 可以设置props的默认属性
const props = withDefaults(defineProps<Props>(), {
	isController: false,
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

.task-list {
	border-bottom: 1px solid #eee;
	display: flex;
	height: @task-list-height;
	width: 100%;
	align-items: center;
	&:hover {
		cursor: pointer;
		background-color: #f5f5f5;
	}
	& > .content {
		margin-left: @task-list-height - 20px;
		font-size: @title-font-size;
		line-height: @title-font-size;
	}
}
</style>
