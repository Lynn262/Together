<template>
	<el-card class="box-card" :style="{ '--border-left-color': borderColor }">
		<template #header>
			<div class="card-header">
				<span>{{ name }}</span>
				<div class="state">
					{{
						state === "now" ? "进行中" : state === "ready" ? "未开始" : "已逾期"
					}}
				</div>
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
const props = defineProps({
	name: {
		type: String,
		default: "这是一个任务",
	},
	state: {
		type: String,
		//now 进行中 ready 未开始 expire 已逾期
		default: "ready",
	},
	id: {
		type: Number,
		default: 27,
	},
	startTime: {
		type: String,
		default: "2023-1-1",
	},
	endTime: {
		type: String,
		default: "2023-1-1",
	},
});
const borderColor = computed<String>(() => {
	if (props.state === "ready") return "#f6c659";
	else if (props.state === "now") return "#73d897";
	else if (props.state === "finished") return "#95a6bf";
	return "#fa8888";
});
</script>
<style lang="less" scoped>
.box-card {
	margin: 10px;
	border-left: 5px solid var(--border-left-color);

	.card-header {
		font-size: 20px;

		.state {
			background-color: var(--border-left-color);
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

			&.deadline {
				background-color: #fff1f1;
				color: #ff7979;
			}
		}
	}
}
</style>
