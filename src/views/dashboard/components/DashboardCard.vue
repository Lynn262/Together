<template>
	<el-card class="dashboard-card" :body-style="cardBodyStyle">
		<template #header>
			<div class="header">
				<div class="left-side">
					<span>
						<slot name="title"></slot>
					</span>
					<slot name="controller"></slot>
				</div>
				<div class="right-side">
					<el-tooltip placement="top" effect="dark" :content="plusText">
						<el-button type="text">
							<el-icon>
								<Plus></Plus>
							</el-icon>
						</el-button>
					</el-tooltip>
					<el-tooltip placement="top" effect="dark" content="更多">
						<el-button type="text">
							<el-icon>
								<More></More>
							</el-icon>
						</el-button>
					</el-tooltip>
				</div>
			</div>
		</template>
		<slot name="body"></slot>
	</el-card>
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import { reactive } from "vue";
const props = defineProps({
	plusText: String,
	moreText: String,
	cardSize: String,
});
const cardBodyStyle = reactive({});
</script>

<style lang="less" scoped>
@cardMargin: 5px;
.header {
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 100%;
}

.el-button:hover {
	color: #6698ff;
	background: rgba(102, 152, 255, 0.1);
}

.el-button--text {
	padding: 8px;
}
.dashboard-card {
	margin: @cardMargin;
	box-sizing: border-box;
	height: calc(100% - @cardMargin*2);
}
.left-side > span {
	height: 32px;
	line-height: 32px;
	text-align: center;
}
</style>
