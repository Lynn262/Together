<template>
	<div class="task-list">
		<p></p>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
@task-list-height: 50px;

.task-list {
	border-bottom: 1px solid #eee;
	display: flex;
	height: @task-list-height;
	width: 100%;
}
</style>
