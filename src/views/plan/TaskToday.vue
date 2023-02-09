<!--  -->
<template>
	<div class="task-today" :style="{ '--border-color': color }">
		<div class="title">
			<h1>{{ name }}</h1>
			<div class="state">
				{{ state === "now" ? "进行中" : state === "ready" ? "未开始" : state === "finished" ? "已完成" : "已逾期" }}
			</div>
		</div>
		<div class="describe">
			<div class="identify">任务编号:27</div>
			<div class="deadline">截止时间:2023-1-20</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef } from "@vue/reactivity";
import { reactive, toRefs, ref } from "vue";
const props = defineProps({
	name: {
		type: String,
		default: "今日一个任务",
	},
	state: {
		type: String,
		//now 进行中 ready 未开始 expire 已逾期 finished已完成
		default: "ready",
	},
});

const color: ComputedRef<string> = computed<string>(() => {
	if (props.state === "ready") return "#f6c659";
	else if (props.state === "now") return "#73d897";
	else if (props.state === "finished") return "#95a6bf";
	return "#fa8888";
});
</script>
<style lang="less" scoped>
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
			background-color: var(--border-color);
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
</style>
