<template>
	<div id="dashboard-header">
		<div id="button-box">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
</script>

<style scoped lang="less">
#dashboard-header {
	height: 36px;
	width: calc(100% - 4px);
	background: #fff;
	display: flex;
	justify-content: end;

	#button-box {
		display: flex;
		align-items: center;
		height: 100%;
		margin: 2 20px;
		padding: 0 5px;
	}
}
</style>
