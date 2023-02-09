<template>
	<div class="status" :style="{ backgroundColor: statusColor }">
		{{ status === "now" ? "进行中" : status === "ready" ? "未开始" : "已逾期" }}
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { stateType, priorityColorComputer } from "@/utils/PriorityColorCompute";

const props = defineProps<{
	status: stateType;
}>();
const statusColor = computed(() => {
	return priorityColorComputer(props.status);
});
</script>

<style scoped lang="less">
.status {
	background-color: var(--border-left-color);
	width: 80px;
	font-size: 16px;
	color: white;
	border-radius: 5px;
	text-align: center;
}
</style>
