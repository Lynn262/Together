<template>
	<div class="task-list-title" @click="collapse">
		<div class="header-icon">
			<el-icon :size="30" v-if="props.isCollapse"><ArrowRight /></el-icon>
			<el-icon :size="30" v-else><ArrowDown /></el-icon>
		</div>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowRight } from "@element-plus/icons-vue";
import { ref, Ref } from "vue";

interface Props {
	isCollapse: boolean;
	taskListId: string;
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

.task-list-title {
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
